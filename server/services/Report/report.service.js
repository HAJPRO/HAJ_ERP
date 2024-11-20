
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");


class ReportService {



    async generate(id) {
        const data = await SaleDepPaintCardModel.findByIdAndDelete(id);
        return data;
    }



    async get(id) {
        const data = await SaleDepPaintCardModel.findById(id);
        return data;
    }
}

module.exports = new ReportService();
