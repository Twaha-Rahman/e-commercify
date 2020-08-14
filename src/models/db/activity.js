'use strict';

const { model } = require('mongoose');

const activitySchema = require('../../schemas/db/activitySchema');

module.exports = model('Activity', activitySchema);
