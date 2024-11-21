const QR = require("qrcode");
const BarCodeModel = require("../../../models/Barcode/BarCode.model");
const QRCodeModel = require("../../../models/Barcode/QRCode.model");
class DepSeamWarehouseService {
    async GenerateQRCode(item) {
        try {
            const qr_code_data = JSON.stringify(item.load)
            const qrCodeBuffer = await QR.toBuffer(qr_code_data, { color: "#36d887" });
            const NewQRCode = {
                qrCodeImage: qrCodeBuffer
            };
            const qr_Code = await QRCodeModel.create(NewQRCode)
            if (qr_Code._id) {
                const newBarData = {
                    author: item.author,
                    administration: item.responsibles,
                    load: item.load,
                    qrCode: qr_Code._id,
                    completed: true
                }
                await BarCodeModel.create(newBarData)

            }

            return qr_Code._id
        } catch (error) {
            console.log(error.message);
        }

        // const qr_code_data = JSON.stringify(segs)
        // const code = QR.toDataURL(qr_code_data, { color: "#36d887" }, async function (err, url) {

        //     const NewQRCode = {
        //         qrCodeImage: url
        //     };file:///C:/Users/Admin/Desktop/BillOfLoad.pdf
        //     const qrCode = await QRCodeModel.create(NewQRCode)
        //     return qrCode
        // })

    }

    async getQRImage(item) {
        const data = await QRCodeModel.findById({ _id: item.id })
        if (data) {
            return data
        } else return
    }
};

module.exports = new DepSeamWarehouseService();