const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String },
    content: { type: String },
    thumbnail: { type: String },
    contentImage: { type: String },
    status: { type: String, default: "Active" },
    author: { type: String },
  },
  { timestamps: true } // ⬅ otomatis buat createdAt & updatedAt
);

module.exports = mongoose.model("Article", articleSchema);
