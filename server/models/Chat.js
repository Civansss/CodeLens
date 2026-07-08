const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversation: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Conversation",
  required: true,
},

    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);