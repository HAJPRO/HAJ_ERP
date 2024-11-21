const QR = require("qrcode");
const BarCodeModel = require("../../../models/Barcode/BarCode.model");
const QRCodeModel = require("../../../models/Barcode/QRCode.model");
class DepSeamWarehouseService {
    async GenerateQRCode(item) {
        // console.log(item);
        var segs = [
            { data: 'ABCDEFG', mode: 'alphanumeric' },
            { data: '0123456', mode: 'numeric' }
        ]
        // const qr_code_data = JSON.stringify(segs)
        // const code = QR.toDataURL(qr_code_data, { color: "#36d887" }, async function (err, url) {

        //     const NewQRCode = {
        //         qrCodeImage: url
        //     };
        //     const qrCode = await QRCodeModel.create(NewQRCode)
        //     return qrCode
        // })


        const qr_code_data = JSON.stringify(segs)
        const qrCodeBuffer = await QR.toBuffer(qr_code_data, { color: "#36d887" });
        const NewQRCode = {
            qrCodeImage: qrCodeBuffer
        };
        const qrCode = await QRCodeModel.create(NewQRCode)
        if(qrCode._id){
          const bar_data = await  BarCodeModel.create()  
        }
        return qrCode
    }

    async getQRImage() {
        const todos = await QRCodeModel.find()
        console.log(todos);
        return todos

    }
};

module.exports = new DepSeamWarehouseService();