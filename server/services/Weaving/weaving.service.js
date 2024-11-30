const mongoose = require("mongoose")
const SaleLegalCardModel = require("../../models/saleLegalCard.model");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");
const SaleDepWeavingCardModel = require("../../models/saleDepWeavingCard.model");
const userModel = require("../../models/user.model");
const SaleDepProvideCardModel = require("../../models/saleDepProvideCard.model");
const InProcessPaintModel = require("../../models/Paint/InProcess.model");
const InProcessWeavingModel = require("../../models/Weaving/InProcess.model");


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
    try {
      const user = await userModel.findById(author);
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

      if (provideData) {
        const provide_id = provideData._id;
        const weaving_process_status = {
          author: author,
          is_confirm: { status: true, reason: "" },
          sent_time: new Date(),
        };

        const Data = await SaleDepWeavingCardModel.create({
          author: author,
          sale_order_id: data.order_id,
          weaving_process_status: weaving_process_status,
          provide_id: provide_id,
        });
        const LegalDataById = await SaleLegalCardModel.findById(data.order_id);
        const newLegalData = LegalDataById;
        newLegalData.order_status = "Yigiruvga yuborildi";
        newLegalData.in_department_order = "Yigiruv";
        newLegalData.isConfirm = "To'quv tasdiqladi";
        newLegalData.process_status.push({
          department: user.department,
          author: user.username,
          is_confirm: { status: true, reason: "" },
          status: "Yigiruvga yuborildi",
          sent_time: new Date(),
        });

        if (Data._id) {
          newLegalData.dep_paint_data = Data._id;
          const updateDataLegal = await SaleLegalCardModel.findByIdAndUpdate(
            data.order_id,
            newLegalData,
            { new: true }
          );
          const in_process_data = {
            author: author,
            order_id: data.order_id,
            department: user.department,
          };

          const inProcess = await InProcessWeavingModel.create(in_process_data);
          if (inProcess) {
            const updateInPaintProcessStatus = await InProcessPaintModel.findByIdAndUpdate(
              data.paint_process_id,
              { status: "To'quv tasdiqladi" },
              { new: true }
            );
          }

        }
      }

      return provideData;


    } catch (error) {
      return error.message
    }
  }
  async getAllLength(data) {
    const user_id = new mongoose.Types.ObjectId(data.user.id);
    const department = data.user.department;
    const process_length = await this.getAllInProcess(user_id).then((data) => data.length)
    const paint_length = await this.AllSentFromPaint().then((data) => data.length)
    const spinning_length = await this.AllSentToSpinning(user_id).then((data) => data.length)
    const provide_length = await this.AllSentToProvide({ id: user_id, department }).then((data) => data.length)
    return { process_length, paint_length, spinning_length, provide_length }
  }
  async getAll(data) {
    const is_status = data.status.is_active;
    const user_id = new mongoose.Types.ObjectId(data.user.id);
    const department = data.user.department;
    try {
      const all_length = await this.getAllLength(data)
      if (is_status === 1) {
        const items = await this.getAllInProcess(user_id);
        return { items, all_length }
      }
      if (is_status === 2) {
        const items = await this.AllSentFromPaint();
        return { items, all_length }
      }
      if (is_status === 4) {
        const items = await this.AllSentToSpinning(user_id);
        return { items, all_length }
      }
      if (is_status === 5) {
        const items = await this.AllSentToProvide({ id: user_id, department });
        return { items, all_length }
      }
    } catch (error) {
      return error.message;
    }
  }
  async getAllInProcess(id) {
    try {
      const allInProcess = await InProcessWeavingModel.aggregate([
        { $match: { author: id } },
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

  async AllSentFromPaint() {
    try {
      const allInProcess = await InProcessPaintModel.aggregate([
        { $match: { status: "Jarayonda" } },
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
  async AllSentToSpinning(id) {
    try {
      const allInProcess = await SaleDepWeavingCardModel.aggregate([
        { $match: { author: id } },
        {
          $lookup: {
            from: "salecards",
            localField: "sale_order_id",
            foreignField: "_id",
            as: "in_process_detail",
          },
        },
        {
          $project: {
            status_spinning: 1,
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

  async AllSentToProvide(data) {
    try {
      const allProvide = await SaleDepProvideCardModel.aggregate([
        {
          $match: {
            $and: [{ author: data.id }, { department: data.department }],
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
      const allInProcess = await InProcessPaintModel.aggregate([
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
    const data = await InProcessWeavingModel.findById(payload.id);
    const reportArray = data.order_report_at_progress;
    return { reportArray, order_id: data.order_id };
  }

  async addDayReportInProcess(data) {
    let order_report_at_progress = []
    order_report_at_progress.push(data.items)
    const ID = data.id;
    const newData = await InProcessWeavingModel.findByIdAndUpdate(ID, { order_report_at_progress }, { new: true });
    return newData;
  }
}

module.exports = new DepWeavingService();
