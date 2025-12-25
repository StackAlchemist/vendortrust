import Flags from "../models/Keywords.model.js";
export const createFlag = async (req, res) => {
    try {
        const { phrase, language, category, explanation } = req.body;
    
        const submission = await Flags.create({
          phrase,
          language,
          category,
          explanation,
          submittedBy: req.user._id // Taken from Auth Middleware
        });
    
        return res.status(201).json({
          message: "Thank you! Our team will review this phrase.",
          submission
        });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ message: "This phrase is already under review." });
        }
        return res.status(500).json({ message: "Error submitting keyword" });
      }
}