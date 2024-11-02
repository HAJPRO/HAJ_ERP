const SaleLegalCardModel = require("../../models/saleLegalCard.model");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");
const SaleDepWeavingCardModel = require("../../models/saleDepWeavingCard.model");

// const fileService = require("./file.service");

class DepWeavingService {
  async getModel() {
    const model = {
      likra: "",
      polister: "",
      melaks: "",
      yarn_wrap: "",
      duration_time: "",
    };

    return model;
  }
  async create(data, author) {
    const newData = await SaleDepWeavingCardModel.create({ ...data, author });
    return newData;
  }

  async getAll() {
    const allPosts = await SaleLegalCardModel.find({
      order_status: "Taminotga yuborildi",
    }).populate("author");
    return allPosts;
  }

  async delete(id) {
    const data = await SaleDepWeavingCardModel.findByIdAndDelete(id);
    return data;
  }

  async edit(data, id) {
    if (!id) {
      console.log("Id not found");
    }

    const updatedData = await SaleDepWeavingCardModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
    return updatedData;
  }

  async getOne(id) {
    const data = await SaleDepWeavingCardModel.findById(id);
    return data;
  }
}

module.exports = new DepWeavingService();
