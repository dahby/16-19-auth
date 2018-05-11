'use strict';

import mongoose from 'mongoose';

const pdfSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: () => new Date(),
  },
  key: {
    type: String,
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('pdf', pdfSchema);
