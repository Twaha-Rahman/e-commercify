'use strict';

const { model } = require('mongoose');

const userSchema = require('../../schemas/db/userSchema');

module.exports = model('User', userSchema);
