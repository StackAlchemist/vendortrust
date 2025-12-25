import mongoose from "mongoose";

const flagSchema = new mongoose.Schema({
  phrase: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true // Prevents duplicate submissions of the same phrase
  },
  language: {
    type: String,
    enum: ["en", "pidgin", "other"],
    default: "en"
  },
  category: {
    type: String,
    enum: ["urgency", "trust-building", "payment", "fake-fees", "other"],
    required: true
  },
  explanation: {
    type: String,
    required: true,
    helpText: "Explain how the scammer used this phrase."
  },
  suggestedScore: {
    type: Number,
    min: 1,
    max: 50,
    default: 10
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Admin user who approved/rejected
  },
  reviewNotes: String
}, { timestamps: true });

// Index for fast searching by moderators
flagSchema.index({ status: 1, createdAt: -1 });

const Flags = mongoose.model("Flag", flagSchema);

export default Flags;