const SaleLegalCardModel = require("../models/saleLegalCard.model");
// const fileService = require("./file.service");
const XLSX = require("xlsx");

class SaleLegalService {
  async getModel() {
    const model = {
      customer_name: "",
      order_number: "",
      pro_name: "",
      pro_type: "",
      pro_color: "",
      pro_width: "",
      grammaj: "",
      order_quantity: "",
      delivery_time: "",
    };

    return model;
  }
  async create(data, author) {
    const newData = await SaleLegalCardModel.create({ ...data, author });
    return newData;
  }

  async confirm(id) {
    const dataById = await SaleLegalCardModel.findById(id).populate("author");
    const data = dataById;
    data.order_status = "Bo'yoqqa yuborildi";
    data.process_status.push({
      department: data.author.department,
      author: data.author.email,
      status: "Bo'yoqqa yuborildi",
      sent_time: new Date(),
    });
    const updatedData = await SaleLegalCardModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedData;
  }

  async getAll() {
    const allPosts = await SaleLegalCardModel.find().populate("author");
    const dep_paint_data = await SaleLegalCardModel.find().populate(
      "dep_paint_data"
    );
    const painting_length = await SaleLegalCardModel.find({
      order_status: "Bo'yoqqa yuborildi",
    });
    const provide_length = await SaleLegalCardModel.find({
      order_status: "Taminotga yuborildi",
    });
    return { allPosts, painting_length, provide_length };
  }

  async delete(id) {
    const data = await SaleLegalCardModel.findByIdAndDelete(id);
    return data;
  }

  async edit(data, id) {
    if (!id) {
      console.log("Id not found");
    }

    const updatedData = await SaleLegalCardModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedData;
  }

  async getOne(id) {
    const data = await SaleLegalCardModel.findById(id);
    return data;
  }

  async export_excel(id) {
    try {
      const data = await SaleLegalCardModel.findById(id);
      // let temp = JSON.stringify(data);
      let ws = XLSX.utils.json_to_sheet(data);
      let wb = XLSX.utils.book_new(); //new workbook
      XLSX.utils.book_append_sheet(wb, ws, "sheet1");
      let down = __dirname + "/public/sale_card.xlsx";
      XLSX.writeFile(wb, down);
      res.download(down);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new SaleLegalService();