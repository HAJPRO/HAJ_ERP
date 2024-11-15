const SaleLegalCardModel = require("../../models/saleLegalCard.model.js");
const SaleDepSpinningCardModel = require("../../models/SaleDepSpinningCardModel.model.js");
const userModel = require("../../models/user.model.js");
// const fileService = require("./file.service");

class DepSpinningService {
  async getModel() {
    const model = {
      begunok: "",
      latun: "",
    };

    return model;
  }
  async cancelReason(data, author) {
    try {
      const userData = await userModel.findById(author);
      const LegalDataById = await SaleLegalCardModel.findById(data.card_id);
      const newLegalData = LegalDataById;
      newLegalData.order_status = "Yigiruv bekor qildi";
      newLegalData.in_department_order = "To'quv";
      newLegalData.isConfirm = "Yigiruv bekor qildi";
      newLegalData.process_status.push({
        department: userData.department,
        author: userData.username,
        is_confirm: { status: false, reason: data.reason },
        status: "Yigiruv bekor qildi",
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
    const spinning_process_status = {
      author: author,
      is_confirm: { status: true, reason: "" },
      sent_time: new Date()
    }
    const newData = await SaleDepSpinningCardModel.create({ ...data.items, author, spinning_process_status });
    const userData = await userModel.findById(author);
    const LegalDataById = await SaleLegalCardModel.findById(data.card_id);
    const newLegalData = LegalDataById;
    newLegalData.order_status = "Yigiruvda jarayonda";
    newLegalData.isConfirm = "Yigiruv tasdiqladi";
    newLegalData.in_department_order = "Yigiruv"
    newLegalData.process_status.push({
      department: userData.department,
      author: userData.username,
      is_confim: { status: true, reason: "" },
      status: "Yigiruvda jarayonda",
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
      order_status: "Yigiruvga yuborildi",
    }).populate("author");
    return allPosts;
  }

  async delete(id) {
    const data = await SaleDepSpinningCardModel.findByIdAndDelete(id);
    return data;
  }

  async edit(data, id) {
    if (!id) {
      console.log("Id not found");
    }

    const updatedData = await SaleDepSpinningCardModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
    return updatedData;
  }

  async getOne(id) {
    const data = await SaleDepSpinningCardModel.findById(id);
    return data;
  }

}

module.exports = new DepSpinningService();
