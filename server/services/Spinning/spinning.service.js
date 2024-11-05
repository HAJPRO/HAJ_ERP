const SaleLegalCardModel = require("../../models/saleLegalCard.model");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");

// const fileService = require("./file.service");

class DepSpinningService {
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
  async confirm(id) {
    const dataById = await SaleLegalCardModel.findById(id).populate("author");
    const data = dataById;
    data.order_status = "Yigiruv tasdiqladi";
    data.process_status.push({
      department: data.author.department,
      author: data.author.email,
      status: "Yigiruv qabul qildi",
      sent_time: new Date(),
    });
    const updatedData = await SaleLegalCardModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedData;
  }

  async getAll() {
    const allPosts = await SaleLegalCardModel.find({
      order_status: "Yigiruvga yuborildi",
    }).populate("author");
    const allSpinningItems = await SaleLegalCardModel.find({
      order_status: "Yigiruv tasdiqladi",
    }).populate("author");

    return { allPosts, allSpinningItems };
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

module.exports = new DepSpinningService();
