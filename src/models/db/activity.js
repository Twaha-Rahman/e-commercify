'use strict';

const { model } = require('mongoose');

const activitySchema = require('../../schemas/db/activity-log-schema');

module.exports = model('Activity', activitySchema);
