'use strict';

const ActivityLog = require('../models/db/activity-log');

async function activityLogger(activityLogObj) {
  let isSaved;
  try {
    const activityLogDocument = new ActivityLog(activityLogObj);
    await activityLogDocument.save();
    isSaved = true;
  } catch (error) {
    isSaved = false;
  }

  return isSaved;
}

module.exports = activityLogger;
