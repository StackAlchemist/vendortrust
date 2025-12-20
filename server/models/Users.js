import mongoose from "mongoose";
import bcrypt from "bcrypt";

const searchSchema = new mongoose.Schema(
    {
      vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
      },
  
      snapshot: {
        name: String,
        instagramHandle: String,
        phoneNumber: String,
  
        combinedScore: Number,
        recommendation: String,
  
        heuristic: {
          score: Number,
          flags: [String]
        },
  
        ai: {
          label: String,
          score: Number
        }
      },
  
      searchedAt: {
        type: Date,
        default: Date.now
      }
    },
    { _id: false }
  );
  
  const userSchema = new mongoose.Schema(
    {
      name: String,
      email: {
        type: String,
        unique: true
      },
      password: String,
  
      /* 🔥 NEW */
      previousSearches: [searchSchema]
    },
    { timestamps: true }
  );

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
