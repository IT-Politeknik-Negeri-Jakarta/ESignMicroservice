const mongoose = require('mongoose');

const createdBySchema = new mongoose.Schema({
    appId: {
        type: mongoose.SchemaTypes.ObjectId
    },
    name: String,
})

const signersSchema = new mongoose.Schema({
    govtId: String,
    signedAt: String,
    status: {
        type: String,
        enum: ['pending', 'signed'],
    },
    odr: Number
})

const documentSchema = new mongoose.Schema({
    documentName: {
        type: String,
        required: true,
    },
    documentNum: {
        type: String,
        uppercase: true
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: createdBySchema,
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    statuses: {
        type: String,
        default: 'pending',
        enum: ['pending', 'signed', 'failed', 'canceled'],
    },
    signer: [signersSchema],
    signingMode: {
        type: String,
        enum: ['multiple', 'single']
    },
    visualize: {
        type: String,
        default: 'invisible',
        enum: ['invisible', 'visible'],
    },
    visualizePageNumber: Number,
    originXY: [Number, Number],
    width: Number,
    height: Number,
    reason: String,
    pdfFile: {
        type: String,
        required: true,
    },
    signedPdfFile: String
});

module.exports = mongoose.model('Document', documentSchema);