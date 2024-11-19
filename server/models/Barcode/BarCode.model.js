const { model, Schema, mongoose } = require('mongoose');

// Define TodoSchema Schema
const BarCodeSchema = new Schema({
    title: String,
    completed: Boolean,
    qrCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QRCodeModel'
    }
}, { timestamps: true });

module.exports = model('BarCode', BarCodeSchema);
