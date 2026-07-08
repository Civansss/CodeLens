const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  summarizeNote,
  explainCode,
  improveNote,
  chatAI,
  getChatHistory,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/summarize", summarizeNote);
router.post("/explain", explainCode);
router.post("/improve", improveNote);
router.post("/chat", auth, chatAI);
router.get("/history", auth, getChatHistory);

module.exports = router;