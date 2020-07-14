'use strict';

const { model } = require('mongoose');

const activityLogSchema = require('../../schemas/db/activity-log-schema');

module.exports = model('activity-logs', activityLogSchema);
