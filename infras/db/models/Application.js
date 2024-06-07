const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    applicationName: {
        type: String,
        required: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    clientSecret: {
        type: String,
        required: true,
    },
    origin: [String],
    createdAt: {
        type: Date,
        immutable: true,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    }
});
module.exports = mongoose.model('Application', applicationSchema);