const SaleLegalCardModel = require("../../models/saleLegalCard.model");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");
const userModel = require("../../models/user.model");

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
  async cancelReason(data, author) {
    try {
      const userData = await userModel.findById(author);
      const LegalDataById = await SaleLegalCardModel.findById(data.card_id);
      const newLegalData = LegalDataById;
      newLegalData.order_status = "Bo'yoq bekor qildi";
      newLegalData.in_department_order = "Sotuv";
      newLegalData.isConfirm = "Bo'yoq bekor qildi";
      newLegalData.process_status.push({
        department: userData.department,
        author: userData.username,
        is_confirm: { status: false, reason: data.reason },
        status: "Bo'yoq bekor qildi",
        sent_time: new Date(),
      });

      if (data.card_id) {
        const updateDataLegal = await SaleLegalCardModel.findByIdAndUpdate(
          data.card_id,
          newLegalData,
          { new: true }
        );
        return updateDataLegal
      }
    } catch (error) {
      return error.message
    }
  }
  async create(data, author) {
    const paint_process_status = {
      author: author,
      is_confirm: { status: true, reason: "" },
      sent_time: new Date()
    }
    const Data = await SaleDepPaintCardModel.create({ ...data.items, author, sale_order_id: data.card_id, paint_process_status });
    const userData = await userModel.findById(author);
    const LegalDataById = await SaleLegalCardModel.findById(data.card_id);
    const newLegalData = LegalDataById;
    newLegalData.order_status = "To'quvga yuborildi";
    newLegalData.in_department_order = "To'quv";
    newLegalData.isConfirm = "Bo'yoq tasdiqladi";
    newLegalData.process_status.push({
      department: userData.department,
      author: userData.username,
      is_confirm: { status: true, reason: "" },
      status: "To'quvga yuborildi",
      sent_time: new Date(),
    });

    if (Data._id) {
      newLegalData.dep_paint_data = Data._id;
      const updateDataLegal = await SaleLegalCardModel.findByIdAndUpdate(
        data.card_id,
        newLegalData,
        { new: true }
      );
      return
    }
    return Data;
  }

  async getAllFromSale() {
    const allPosts = await SaleLegalCardModel.find({
      order_status: "Bo'yoqqa yuborildi",
    }).populate("author");
    const allProvideItems = await SaleDepPaintCardModel.find({
      paint_status: "Taminotga yuborildi",
    }).populate("author");
    return { allPosts, allProvideItems };
  }
  async getAllForProvide() {
    const allPosts = await SaleDepPaintCardModel.find({
      paint_status: "Taminotga yuborildi",
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

module.exports = new DepPaintService();
