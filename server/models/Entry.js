const { Schema, model } = require('mongoose');

const entrySchema = new Schema(
  {
    description: { type: String, required: true },
    date: { type: Date },
  },
);


const Entry = model('Entry', entrySchema);

module.exports = Entry;