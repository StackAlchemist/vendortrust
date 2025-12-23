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
      conversationText
    } = req.body;

    if (!conversationText || conversationText.trim().length < 5) {
      return res.status(400).json({
        message: "Vendor conversation text is required"
      });
    }

    /* -----------------------------
       1️⃣ Run Heuristic Analysis
    ------------------------------ */
    const heuristicResult = runHeuristics(conversationText);

    /* -----------------------------
       2️⃣ Run AI Analysis
    ------------------------------ */
    const aiResult = await analyzeTextAI(conversationText);

    /* -----------------------------
       3️⃣ Combine Scores
    ------------------------------ */
    const multiplier = getSentimentMultiplier(aiResult.label);
    const combinedScore = Math.min(
      Math.round(heuristicResult.score * multiplier),
      100
    );

    let recommendation;
    if (combinedScore >= 70) {
      recommendation = "High risk – avoid payment";
    } else if (combinedScore >= 40) {
      recommendation = "Medium risk – proceed with caution";
    } else {
      recommendation = "Low risk – relatively safe";
    }

    /* -----------------------------
       4️⃣ Find or Create Vendor
    ------------------------------ */
    let vendor = await Vendor.findOne({
      $or: [
        instagramHandle ? { instagramHandle } : null,
        phoneNumber ? { phoneNumber } : null
      ].filter(Boolean)
    });

    const analysisRecord = {
      heuristic: {
        score: heuristicResult.score,
        flags: heuristicResult.flags
      },
      ai: {
        label: aiResult.label,
        score: aiResult.score
      },
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

    /* -----------------------------
       5️⃣ Save User Search History
    ------------------------------ */
    if (req.user) {
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: {
            previousSearches: {
              vendor: vendor._id,

              snapshot: {
                name: vendor.name,
                instagramHandle: vendor.instagramHandle,
                phoneNumber: vendor.phoneNumber,

                combinedScore,
                recommendation,

                heuristic: {
                  score: heuristicResult.score,
                  flags: heuristicResult.flags
                },

                ai: {
                  label: aiResult.label,
                  score: aiResult.score
                },

                // 🔥 VERY IMPORTANT
                vendorText: conversationText
              }
            }
          }
        },
        { new: true }
      );
    }

    /* -----------------------------
       6️⃣ Response
    ------------------------------ */
    return res.status(200).json({
      vendor: {
        id: vendor._id,
        name: vendor.name,
        instagramHandle: vendor.instagramHandle,
        phoneNumber: vendor.phoneNumber,
        riskScore: vendor.riskScore
      },
      analysis: {
        heuristic: heuristicResult,
        ai: aiResult,
        combinedScore,
        recommendation
      }
    });

  } catch (error) {
    console.error("Check vendor error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
