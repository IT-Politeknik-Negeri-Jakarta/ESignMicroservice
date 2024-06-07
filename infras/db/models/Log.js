const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    documentId: mongoose.SchemaTypes.ObjectId,
    govtId: String,
    appId: mongoose.SchemaTypes.ObjectId,
    appUserId: String,
    eventType: {
        type: String,
        enum: ['attempt', 'passphrase_failed', 'success', 'general_failure'],
    },
    eventMessage: String,
    timestamp: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model('Log', logSchema);