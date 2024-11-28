const mongoose = require("mongoose")
const SaleLegalCardModel = require("../../models/saleLegalCard.model");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");
const SaleDepWeavingCardModel = require("../../models/saleDepWeavingCard.model");
const userModel = require("../../models/user.model");
const SaleDepProvideCardModel = require("../../models/saleDepProvideCard.model");
const InProcessModel = require("../../models/InProcess.model");

// const fileService = require("./file.service");
class DepWeavingService {
  async getModel() {
    const model = {
      likra: "",
      polister: "",
      melaks_yarn: "",
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
    const user = await userModel.findById(author);
    const weaving_process_status = {
      author: author,
      is_confirm: { status: true, reason: "" },
      sent_time: new Date(),
    };
    const box_item = {
      likra: data.items.likra,
      polister: data.items.polister,
      melaks_yarn: data.items.melaks_yarn,
      yarn_wrap: data.items.yarn_wrap,
      duration_time: data.items.duration_time,
    }

    const newDataForProvide = {
      department: user.department,
      delivery_product_box: box_item,
      author: author,
      proccess_status: {
        confirm: true,
        reason: "",
        status: "Taminotga yuborildi",
      },
    };
    const provideData = await SaleDepProvideCardModel.create(newDataForProvide);
    const provide_id = provideData._id;
    if (provideData) {
      const userData = await userModel.findById(author);
      const department = userData.department;
      const Data = await SaleDepWeavingCardModel.create({
        author,
        sale_order_id: data.order_id,
        weaving_process_status,
        provide_id,
      });
      const LegalDataById = await SaleLegalCardModel.findById(data.order_id);
      const newLegalData = LegalDataById;
      newLegalData.order_status = "Yigiruvga yuborildi";
      newLegalData.in_department_order = "Yigiruv";
      newLegalData.isConfirm = "To'quv tasdiqladi";
      newLegalData.process_status.push({
        department: userData.department,
        author: userData.username,
        is_confirm: { status: true, reason: "" },
        status: "Yigiruvga yuborildi",
        sent_time: new Date(),
      });

      if (Data._id) {
        newLegalData.dep_weaving_data = Data._id;
        const updateDataLegal = await SaleLegalCardModel.findByIdAndUpdate(
          data.card_id,
          newLegalData,
          { new: true }
        );
        const in_process_data = {
          author: author,
          order_id: data.card_id,
          department: department,
        };
        const inProcess = await InProcessModel.create(in_process_data);
      }
    }

    return provideData;
  }

  async getAll(data) {
    const is_status = data.status.is_active;
    const user_id = data.user.id;
    const department = data.user.department;
    try {
      if (is_status === 1) {
        return this.getAllInProcess(user_id);
      }
      if (is_status === 2) {
        return this.AllSentToWeaving();
      }
      if (is_status === 4) {
        return this.AllSentToSpinning({ id: user_id, department });
      }
      if (is_status === 5) {
        return this.AllSentToProvide({ id: user_id, department });
      }
    } catch (error) {
      return error.message;
    }
  }
  async getAllInProcess(id) {
    try {
      const allInProcess = await InProcessModel.aggregate([
        { $match: { author_id: id } },
        {
          $lookup: {
            from: "salecards",
            localField: "order_id",
            foreignField: "_id",
            as: "in_process_detail",
          },
        },
        {
          $project: {
            status: 1,
            in_process_detail: {
              $cond: {
                if: { $isArray: "$in_process_detail" },
                then: { $arrayElemAt: ["$in_process_detail", 0] },
                else: null,
              },
            },
          },
        },
      ]);
      return allInProcess;
    } catch (error) {
      return error.message;
    }
  }

  async AllSentToWeaving() {
    try {
      const allInProcess = await InProcessModel.aggregate([
        { $match: { department: "Bo'yoq" } },
        {
          $lookup: {
            from: "salecards",
            localField: "order_id",
            foreignField: "_id",
            as: "in_process_detail",
          },
        },
        {
          $project: {
            status: 1,
            in_process_detail: {
              $cond: {
                if: { $isArray: "$in_process_detail" },
                then: { $arrayElemAt: ["$in_process_detail", 0] },
                else: null,
              },
            },
          },
        },
      ]);
      return allInProcess;
    } catch (error) {
      return error.message;
    }
  }
  // async AllSentToWeaving(id) {
  //   try {
  //     const allInProcess = await SaleDepPaintCardModel.aggregate([
  //       { $match: { author_id: id } },
  //       {
  //         $lookup: {
  //           from: "salecards",
  //           localField: "sale_order_id",
  //           foreignField: "_id",
  //           as: "in_process_detail",
  //         },
  //       },
  //       {
  //         $project: {
  //           status_weaving: 1,
  //           in_process_detail: {
  //             $cond: {
  //               if: { $isArray: "$in_process_detail" },
  //               then: { $arrayElemAt: ["$in_process_detail", 0] },
  //               else: null,
  //             },
  //           },
  //         },
  //       },
  //     ]);
  //     return allInProcess;
  //   } catch (error) {
  //     return error.message;
  //   }
  // }

  async AllSentToProvide(data) {
    try {
      const allProvide = await SaleDepWeavingCardModel.aggregate([
        {
          $match: {
            $and: [{ author_id: data.id }, { department: data.department }],
          },
        },
      ]);
      return allProvide;
    } catch (error) {
      return error.message;
    }
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
    let ID = new mongoose.Types.ObjectId(id);
    try {
      const allInProcess = await InProcessModel.aggregate([
        { $match: { _id: ID } },
        {
          $lookup: {
            from: "salecards",
            localField: "order_id",
            foreignField: "_id",
            as: "in_process_detail",
          },
        },
        {
          $project: {
            status: 1,
            in_process_detail: {
              $cond: {
                if: { $isArray: "$in_process_detail" },
                then: { $arrayElemAt: ["$in_process_detail", 0] },
                else: null,
              },
            },
          },
        },
      ]);
      return allInProcess;
    } catch (error) {
      return error.message;
    }
  }
  async getOneFromInProcess(payload) {
    const data = await InProcessModel.findById(payload.id);
    const reportArray = data.order_report_at_progress;
    return reportArray;
  }
}

module.exports = new DepWeavingService();
