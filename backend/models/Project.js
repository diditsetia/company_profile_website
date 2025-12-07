const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String },
    content: { type: String },
    thumbnail: { type: String },
    contentImage: { type: String },
    videoProject: { type: String },
    status: { type: String, default: "Done" },
    team: { type: String },
    client: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
