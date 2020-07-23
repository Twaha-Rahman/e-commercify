'use strict';

const { model } = require('mongoose');

const systemLogSchema = require('../../schemas/db/system-log-schema');

module.exports = model('SystemLog', systemLogSchema);
