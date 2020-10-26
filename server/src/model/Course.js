const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseScheama = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'video'
    }
  ],
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  schemesterName: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("course", CourseScheama );