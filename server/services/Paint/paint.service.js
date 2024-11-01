const SaleLegalCardModel = require("../../models/saleLegalCard.model");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");

// const fileService = require("./file.service");

class DepPaintService {
  async getModel() {
    const model = {
      pus: "",
      fike: "",
      color_code: "",
      duration_time: "",
      raw_cloth_quantity: "",
    };

    return model;
  }
  async create(data, author) {
    const newData = await SaleDepPaintCardModel.create({ ...data, author });
    return newData;
  }

  async getAll() {
    const allPosts = await SaleLegalCardModel.find({
      order_status: "Bo'yoqqa yuborildi",
    }).populate("author");
    const allProvideItems = await SaleDepPaintCardModel.find({
      paint_status: "Taminotga yuborildi",
    }).populate("author");
    return { allPosts, allProvideItems };
  }

  async delete(id) {
    const data = await SaleDepPaintCardModel.findByIdAndDelete(id);
    return data;
  }

  async edit(data, id) {
    if (!id) {
      console.log("Id not found");
    }

    const updatedData = await SaleDepPaintCardModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
    return updatedData;
  }

  async getOne(id) {
    const data = await SaleDepPaintCardModel.findById(id);
    return data;
  }
}

module.exports = new DepPaintService();
