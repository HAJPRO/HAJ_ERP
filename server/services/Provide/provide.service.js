const SaleLegalCardModel = require("../../models/saleLegalCard.model");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");
const SaleDepProvideCardModel = require("../../models/saleDepProvideCard.model");

// const fileService = require("./file.service");

class DepProvideService {
  async getModel() {
    const model = {
      yarn_quantity: "",
      color_quantity: "",
      acid_quantity: "",
      corbamite_quantity: "",
      duration_time: "",
    };

    return model;
  }
  async create(data, author, proccess_status) {
    const newData = await SaleDepProvideCardModel.create({
      ...data,
      author,
    });
    if (await newData) {
      const id = newData._id
      const result = await SaleDepProvideCardModel.findOne(id)
      const newItems = result
      const proccess = newItems.proccess_status
      const newProccess = proccess.push(proccess_status)
      console.log(newItems);
      // if (id) {
      //   const updateDataLegal = await SaleDepProvideCardModel.findByIdAndUpdate(
      //     id,
      //     items,
      //     { new: true }
      //   );
      // }


    }


    return newData
  }

  async getAll() {
    const allPosts = await SaleLegalCardModel.find({
      order_status: "Taminotga yuborildi",
    }).populate("author");
    return allPosts;
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

module.exports = new DepProvideService();
