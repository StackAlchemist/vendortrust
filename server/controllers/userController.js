import User from "../models/Users.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// POST /api/users/signup
export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/users/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export async function getSearchHistory(req, res) {
  try {
    const userId = req.user.id; // from auth middleware

    const user = await User.findById(userId)
      .select("previousSearches")
      .populate("previousSearches.vendor", "name instagramHandle phoneNumber");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Sort newest first
    const history = user.previousSearches
      .sort((a, b) => new Date(b.searchedAt) - new Date(a.searchedAt))
      .map((item) => ({
        id: item._id,
        searchedAt: item.searchedAt,
        vendor: {
          id: item.vendor?._id,
          name: item.vendor?.name,
          instagramHandle: item.vendor?.instagramHandle,
          phoneNumber: item.vendor?.phoneNumber,
        },
        combinedScore: item.snapshot.combinedScore,
        recommendation: item.snapshot.recommendation,
        heuristic: {
          score: item.snapshot.heuristic?.score || 0,
          flags: item.snapshot.heuristic?.flags || [],
        },
        ai: {
          label: item.snapshot.ai?.label || "Unknown",
          score: item.snapshot.ai?.score || 0,
        },
        phoneAnalysis: item.snapshot.phoneAnalysis || null,
        bankAnalysis: item.snapshot.bankAnalysis || null,
        conversationText: item.snapshot.conversationText || null,
      }));

    res.json({
      count: history.length,
      history,
    });
  } catch (err) {
    console.error("Get history error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
