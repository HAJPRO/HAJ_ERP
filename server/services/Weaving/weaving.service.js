const SaleLegalCardModel = require("../../models/saleLegalCard.model");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");
const SaleDepWeavingCardModel = require("../../models/saleDepWeavingCard.model");
const userModel = require("../../models/user.model");


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
  async cancelReason(data, author) {
    try {
      const userData = await userModel.findById(author);
      const LegalDataById = await SaleLegalCardModel.findById(data.card_id);
      const newLegalData = LegalDataById;
      newLegalData.order_status = "To'quv bekor qildi";
      newLegalData.in_department_order = "Bo'yoq";
      newLegalData.isConfirm = "To'quv bekor qildi";
      newLegalData.process_status.push({
        department: userData.department,
        author: userData.username,
        is_confirm: { status: false, reason: data.reason },
        status: "To'quv bekor qilindi",
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
    const weaving_process_status = {
      author: author,
      is_confirm: { status: true, reason: "" },
      sent_time: new Date()
    }
    const newData = await SaleDepWeavingCardModel.create({ ...data.items, author, weaving_process_status });
    const userData = await userModel.findById(author);
    const LegalDataById = await SaleLegalCardModel.findById(data.card_id);
    const newLegalData = LegalDataById;
    newLegalData.order_status = "Yigiruvga yuborildi";
    newLegalData.isConfirm = "To'quv tasdiqladi";
    newLegalData.in_department_order = "Yigiruv";
    newLegalData.process_status.push({
      department: userData.department,
      author: userData.username,
      is_confim: { status: true, reason: "" },
      status: "Yigiruvga yuborildi",
      sent_time: new Date(),
    });
    if (data.card_id) {
      newLegalData.dep_weaving_data = data.card_id;
      const updateDataLegal = await SaleLegalCardModel.findByIdAndUpdate(
        data.card_id,
        newLegalData,
        { new: true }
      );
    }


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
