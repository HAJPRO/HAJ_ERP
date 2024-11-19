const SaleLegalCardModel = require("../../models/saleLegalCard.model");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");
const SaleDepWeavingCardModel = require("../../models/saleDepWeavingCard.model");
const SaleDepSpinningCardModel = require("../../models/saleDepWeavingCard.model");
const SaleDepProvideCardModel = require("../../models/saleDepProvideCard.model");

// const fileService = require("./file.service");

class DepProvideService {
  // async cancelReason(data, author) {
  //   try {
  //     const userData = await userModel.findById(author);
  //     const LegalDataById = await SaleDepPaintCardModel.findById(data.card_id);
  //     const newLegalData = LegalDataById;
  //     newLegalData.order_status = "To'quv bekor qildi";
  //     newLegalData.in_department_order = "Bo'yoq";
  //     newLegalData.isConfirm = "To'quv bekor qildi";
  //     newLegalData.process_status.push({
  //       department: userData.department,
  //       author: userData.username,
  //       is_confirm: { status: false, reason: data.reason },
  //       status: "To'quv bekor qilindi",
  //       sent_time: new Date(),
  //     });

  //     if (data.card_id) {
  //       const updateDataLegal = await SaleLegalCardModel.findByIdAndUpdate(
  //         data.card_id,
  //         newLegalData,
  //         { new: true }
  //       );
  //       return updateDataLegal
  //     }
  //   } catch (error) {
  //     return error.message
  //   }
  // }
  // async create(data, author) {
  //   const weaving_process_status = {
  //     author: author,
  //     is_confirm: { status: true, reason: "" },
  //     sent_time: new Date()
  //   }
  //   const newData = await SaleDepWeavingCardModel.create({ ...data.items, author, weaving_process_status });
  //   const userData = await userModel.findById(author);
  //   const LegalDataById = await SaleLegalCardModel.findById(data.card_id);
  //   const newLegalData = LegalDataById;
  //   newLegalData.order_status = "Yigiruvga yuborildi";
  //   newLegalData.isConfirm = "To'quv tasdiqladi";
  //   newLegalData.in_department_order = "Yigiruv";
  //   newLegalData.process_status.push({
  //     department: userData.department,
  //     author: userData.username,
  //     is_confim: { status: true, reason: "" },
  //     status: "Yigiruvga yuborildi",
  //     sent_time: new Date(),
  //   });
  //   if (data.card_id) {
  //     newLegalData.dep_weaving_data = data.card_id;
  //     const updateDataLegal = await SaleLegalCardModel.findByIdAndUpdate(
  //       data.card_id,
  //       newLegalData,
  //       { new: true }
  //     );
  //   }


  //   return newData;
  // }
  async getAllLength() {
    try {
      const Provide = await this.getAllProvide();
      const provide_length = Provide ? Provide.length : 0;
      const Paint = await this.getAllPaint();
      const paint_length = Paint ? Paint.length : 0;
      const Weaving = await this.getAllWeaving();
      const weaving_length = Weaving ? Weaving.length : 0;
      const Spinning = await this.getAllSpinning();
      const spinning_length = Spinning ? Spinning.length : 0;
      const allLength = {
        provide_length,
        paint_length,
        weaving_length,
        spinning_length,
      };
      return allLength;
    } catch (error) {
      return error.message;
    }
  }
  async getAll(num) {
    try {
      if (num === 1) {
        return await this.getAllProvide();
      }
      if (num === 2) {
        return await this.getAllPaint();
      }
      if (num === 3) {
        return await this.getAllWeaving();
      }
      if (num === 4) {
        return await this.getAllSpinning();
      }
    } catch (error) {
      return error.message;
    }
  }
  async getAllProvide() {
    const allPosts = await SaleDepProvideCardModel.find({
      $or: [
        { status: "Jarayonda" },
        { status: "Yetkazib berildi" },
        { status: "Bekor qilindi" },
      ],
    }).populate(["author", "delivery_product_box_id"]);

    return allPosts;
  }
  async getAllPaint() {
    const allPosts = await SaleDepPaintCardModel.find().populate(["author"]);
    return allPosts;
  }
  async getAllWeaving() {
    const allPosts = await SaleDepWeavingCardModel.find().populate(["author"]);
    return allPosts;
  }
  async getAllSpinning() {
    const allPosts = await SaleDepSpinningCardModel.find().populate(["author"]);
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
