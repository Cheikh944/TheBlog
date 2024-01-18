const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imagePres: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
