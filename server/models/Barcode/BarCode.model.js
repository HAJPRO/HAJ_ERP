const { model, Schema, mongoose } = require('mongoose');

// Define TodoSchema Schema
const BarCodeSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    administration: Object,
    load: Array,
    completed: Boolean,
    qrCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QRCodeModel'
    }
}, { timestamps: true });

module.exports = model('BarCode', BarCodeSchema);
