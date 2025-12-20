import Vendor from "../models/vendorModel.js";
import User from "../models/Users.js";
import { runHeuristics } from "../services/heuristicEngine.js";
import { analyzeTextAI } from "../services/aiEngine.js";
import { getSentimentMultiplier } from "../services/aiRiskMapper.js";

export async function checkVendor(req, res) {
  try {
    const {
      name,
      instagramHandle,
      phoneNumber,
      conversationText,
      userId // optional (logged-in user)
    } = req.body;

    if (!conversationText) {
      return res.status(400).json({ message: "conversationText required" });
    }

    /* 1️⃣ Heuristics */
    const heuristic = runHeuristics(conversationText);

    /* 2️⃣ AI */
    const ai = await analyzeTextAI(conversationText);

    /* 3️⃣ Combine */
    const multiplier = getSentimentMultiplier(ai.label);
    const combinedScore = Math.min(
      Math.round(heuristic.score * multiplier),
      100
    );

    const recommendation =
      combinedScore >= 70
        ? "High risk – avoid payment"
        : combinedScore >= 40
        ? "Medium risk – proceed with caution"
        : "Low risk – relatively safe";

    /* 4️⃣ Find or create vendor */
    let vendor = await Vendor.findOne({
      $or: [
        instagramHandle ? { instagramHandle } : null,
        phoneNumber ? { phoneNumber } : null
      ].filter(Boolean)
    });

    const analysisRecord = {
      heuristic,
      ai,
      combinedScore,
      recommendation
    };

    if (!vendor) {
      vendor = await Vendor.create({
        name,
        instagramHandle,
        phoneNumber,
        riskScore: combinedScore,
        lastCheckedAt: new Date(),
        analysisHistory: [analysisRecord]
      });
    } else {
      vendor.riskScore = Math.max(vendor.riskScore, combinedScore);
      vendor.lastCheckedAt = new Date();
      vendor.analysisHistory.push(analysisRecord);
      await vendor.save();
    }

    /* 5️⃣ Save to user's history (if logged in) */
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          previousSearches: {
            vendor: vendor._id,
            snapshot: {
              name: vendor.name,
              instagramHandle: vendor.instagramHandle,
              phoneNumber: vendor.phoneNumber,
              combinedScore,
              recommendation,
              heuristic,
              ai
            }
          }
        }
      });
    }

    /* 6️⃣ Response */
    return res.json({
      vendor,
      heuristic,
      ai,
      combinedScore,
      recommendation
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
