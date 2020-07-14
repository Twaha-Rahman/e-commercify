'use strict';

const ActivityLog = require('../models/db/activity-log');

async function activityLogger(activityLogObj) {
  try {
    const activityLogDocument = new ActivityLog(activityLogObj);
    await activityLogDocument.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = activityLogger;
