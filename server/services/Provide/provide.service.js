const SaleLegalCardModel = require("../../models/saleLegalCard.model");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");
const SaleDepWeavingCardModel = require("../../models/saleDepWeavingCard.model");
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
    // const process_length = await this.getAllInProcess().then((data) => data.length)
    const paint_length = await this.getAllPaint().then((data) => data.length)
    // const weaving_length = await this.getAllWeaving().then((data) => data.length)
    // const spinning_length = await this.getAllSpinning().then((data) => data.length)
    // return { process_length, weaving_length, paint_length, spinning_length }
  }
  async getAll(data) {
    const is_status = data.status;
    // const user_id = new mongoose.Types.ObjectId(data.user.id);
    // const department = data.user.department;

    try {
      const all_length = await this.getAllLength()
      if (is_status === 1) {
        const items = await this.getAllInProcess();
        return { items, all_length }
      }
      if (is_status == 2) {
        const items = await this.getAllPaint();
        console.log(items);
        return { items, all_length }
      }

      if (is_status == 3) {
        const items = await this.getAllWeaving();
        return { items, all_length }
      }
      if (is_status == 4) {
        const items = await this.getAllSpinning();
        return { items, all_length }
      }
    } catch (error) {
      return error.message;
    }
  }
  async getAllInProcess() {
    try {
      // const allInProcess = await SaleDepProvideCardModel.aggregate([
      //   { $match: { author: id } },
      //   {
      //     $lookup: {
      //       from: "salecards",
      //       localField: "sale_order_id",
      //       foreignField: "_id",
      //       as: "sale_order",
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "depweavingcards",
      //       localField: "weaving_id",
      //       foreignField: "_id",
      //       as: "more",
      //     },
      //   },
      //   {
      //     $project: {
      //       status_inprocess: 1,
      //       more: {
      //         $cond: {
      //           if: { $isArray: "$more" },
      //           then: { $arrayElemAt: ["$more", 0] },
      //           else: null,
      //         },
      //       },
      //       sale_order: {
      //         $cond: {
      //           if: { $isArray: "$sale_order" },
      //           then: { $arrayElemAt: ["$sale_order", 0] },
      //           else: null,
      //         },
      //       },
      //     },
      //   },
      // ]);
      // return allInProcess;
    } catch (error) {
      return error.message;
    }
  }
  async getAllPaint() {
    try {
      const allPaint = await SaleDepProvideCardModel.aggregate([
        {
          $match: {
            $and: [{ status: "Tasdiqlanmagan" }, { department: "Bo'yoq" }]
          },
        },
      ]);
      return allPaint;
    } catch (error) {
      return error.message;
    }
  }
  async getAllWeaving() {
    try {
      const allWeaving = await SaleDepProvideCardModel.aggregate([
        {
          $match: {
            $and: [{ status: "Tasdiqlanmagan" }, { department: "To'quv" }]
          },
        },
      ]);

      return allWeaving;
    } catch (error) {
      return error.message;
    }
  }

  async getAllSpinning() {
    try {
      const allSpinning = await SaleDepProvideCardModel.aggregate([
        {
          $match: {
            $and: [{ status: "Tasdiqlanmagan" }, { department: "Yigiruv" }],
          },
        },
      ]);
      return allSpinning;
    } catch (error) {
      return error.message;
    }
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
