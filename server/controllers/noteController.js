const Note = require("../models/Note");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      notes,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateNote = async (req, res) => {
  try {
    const { title, content, summary } = req.body;

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    if (summary !== undefined) {
      note.summary = summary;
    }

    await note.save();

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
};