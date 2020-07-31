const { Schema } = require('mongoose');

const systemLogSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true,
      enum: ['success', 'error', 'info']
    },
    additionalData: {
      type: Schema.Types.Mixed,
      required: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = systemLogSchema;
