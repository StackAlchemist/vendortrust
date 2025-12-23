import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    heuristic: {
      score: Number,
      flags: [String]
    },
    ai: {
      label: String,
      score: Number
    },
    combinedScore: Number,
    recommendation: String,
    checkedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const vendorSchema = new mongoose.Schema(
  {
    name: String,
    instagramHandle: String,
    phoneNumber: String,

    reportsCount: {
      type: Number,
      default: 0
    },

    riskScore: {
      type: Number,
      default: 0
    },

    phoneAnalysis: {
      raw: String,
      normalized: String,
      isValidNG: Boolean,
      score: Number,
      flags: [String]
    },
    
    flaggedKeywords: [String],
    
    lastConversationText: String,
    

    lastCheckedAt: Date,

    /* 🔥 NEW */
    analysisHistory: [analysisSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
