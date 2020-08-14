'use strict';

const ActivityLog = require('../models/db/activity');

async function logActivity(activityLogObj) {
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

module.exports = logActivity;
