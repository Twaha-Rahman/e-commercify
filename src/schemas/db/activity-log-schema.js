/**
 * @file activity-log-schema.js - Mongoose schema for activity-logs
 */
'use strict';

const { Schema } = require('mongoose');
const { ObjectID } = Schema.Types;

const activityLogSchema = new Schema({
  userId: {
    type: ObjectID,
    required: true
  },

  timestamp: {
    type: Date,
    required: true
  },

  linkedCompanyId: {
    type: ObjectID,
    required: true
  },

  clientBrowserInfo: {
    type: String
  },

  clientIpAddress: {
    type: String
  }
});

module.exports = activityLogSchema;
