const { Schema, model } = require('mongoose');

const moodSchema = new Schema(
  {
    sticker: { type: String },
    feeling: { type: String, required: true },
    scale: { type: Number, required: true  },
    why: { type: String, required: true },
    date: { type: Date },
  },
);


const Mood = model('Mood', moodSchema);

module.exports = Mood;

