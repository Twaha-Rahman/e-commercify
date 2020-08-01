/**
 * @file activity-log-schema.js - Mongoose schema for activity-logs
 */

const { Schema } = require('mongoose');
const { ObjectID } = Schema.Types;

const activityLogSchema = new Schema(
  {
    userId: {
      type: ObjectID,
      required: true
    },

    linkedCompanyId: {
      type: ObjectID,
      required: true
    },

    clientBrowserInfo: {
      type: String,
      required: false
    },

    clientIpAddress: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = activityLogSchema;
