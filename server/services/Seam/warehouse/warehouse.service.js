const QR = require("qrcode");
const BarCodeModel = require("../../../models/Barcode/BarCode.model");
const QRCodeModel = require("../../../models/Barcode/QRCode.model");
class DepSeamWarehouseService {
    async GenerateQRCode(item) {
        // console.log(item);
        const qr_code = {
            name: 'fdf',
            type: 'fdf',
            color_code: 'dff',
            raw_material_quantity: '565',
            unit: 'cxc'
        }
        const qr_code_data = JSON.stringify(item)
        const qrCodeBuffer = await QR.toBuffer(qr_code_data);
        const NewQRCode = new QRCodeModel({
            qrCodeImage: qrCodeBuffer
        });
        // await save(NewQRCode)
        // const QRCodeImage = QR.toDataURL(NewQRCode, {
        //     color: {
        //         black: "#000000",
        //     },
        //     width: {
        //         size: "65px"
        //     }    

        // })
        const qrCode = await QRCodeModel.create(NewQRCode);
        // const qrCodeId = qrCode._id
        // // Create new TodoSchema with QR Code reference
        // const todo = { title: item.name, completed: item.age, qrCode: qrCodeId };
        // await BarCodeModel.create(todo);
        // // Sending the QR code image along with the todo in the response
        // const todoWithQRImage = {
        //     _id: todo._id,
        //     title: todo.title,
        //     completed: todo.completed,
        //     qrCodeImage: qrCodeBuffer // Sending QR code image
        // };
        // return (todoWithQRImage); // HTTP 201 Created
        return qrCode
    }

    async getQRImage() {
        const todos = await QRCodeModel.find()

        // .populate('qrCode');
        // const todosWithQRImages = todos.map(todo => ({
        //     _id: todo._id,
        //     title: todo.title,
        //     completed: todo.completed,
        //     qrCodeImage: todo.qrCode ? todo.qrCode.BarCodeImage : null
        // }));
        // console.log(todosWithQRImages);
        // return todosWithQRImages;
        return todos

    }
};

module.exports = new DepSeamWarehouseService();