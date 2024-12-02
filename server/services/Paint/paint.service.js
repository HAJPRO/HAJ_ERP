const mongoose = require("mongoose")
const SaleLegalCardModel = require("../../models/saleLegalCard.model.js");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");
const SaleDepProvideCardModel = require("../../models/saleDepProvideCard.model.js");
const userModel = require("../../models/user.model");
const InProcessPaintModel = require("../../models/Paint/InProcess.model.js");
const InProcessWeavingtModel = require("../../models/Weaving/InProcess.model.js");
const SaleDepWeavingCardModel = require("../../models/saleDepWeavingCard.model.js");

// const fileService = require("./file.service");

class DepPaintService {
  async getModel() {
    const ModelForProvide = {
      pus: "",
      fike: "",
      color_code: "",
      duration_time: "",
    };
    const ModelForWeaving = {
      weaving_cloth_quantity: "",
      weaving_delivery_time: ""
    };

    return { ModelForProvide, ModelForWeaving };
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
        return updateDataLegal;
      }
    } catch (error) {
      return error.message;
    }
  }
  async create(data, author) {
    try {
      if (data.items.ModelForProvide && data.items.ModelForWeaving) {
        const user = await userModel.findById(author);
        const box_item = {
          pus: data.items.ModelForProvide.pus,
          fike: data.items.ModelForProvide.fike,
          color_code: data.items.ModelForProvide.color_code,
          duration_time: data.items.ModelForProvide.duration_time,
        };
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
          const paint_process_status = {
            author: author,
            is_confirm: { status: true, reason: "" },
            sent_time: new Date(),
          };
          const in_process_data = {
            author: author,
            order_id: data.card_id,
            department: user.department,
          };
          const inProcess = await InProcessPaintModel.create(in_process_data);
          const Data = await SaleDepPaintCardModel.create({
            in_process_id: inProcess._id,
            author,
            sale_order_id: data.card_id,
            paint_process_status,
            provide_id,
            weaving_cloth_quantity: data.items.ModelForWeaving.weaving_cloth_quantity,
            weaving_delivery_time: data.items.ModelForWeaving.weaving_delivery_time,
          });
          const LegalDataById = await SaleLegalCardModel.findById(data.card_id);
          const newLegalData = LegalDataById;
          newLegalData.order_status = "To'quvga yuborildi";
          newLegalData.in_department_order = "To'quv";
          newLegalData.isConfirm = "Bo'yoq tasdiqladi";
          newLegalData.process_status.push({
            department: user.department,
            author: user.username,
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

          }
        }
      }

      return provideData;


    } catch (error) {
      return error.message
    }
  }
  async getAllLength(data) {
    const user_id = data.user.id;
    const department = data.user.department;
    const process_length = await this.getAllInProcess(user_id).then((data) => data.length)
    const sale_length = await this.AllSentToPaint().then((data) => data.length)
    const weaving_length = await this.AllSentToWeaving(user_id).then((data) => data.length)
    const provide_length = await this.AllSentToProvide({ id: user_id, department }).then((data) => data.length)
    return { process_length, sale_length, weaving_length, provide_length }
  }

  async getAll(data) {
    const is_status = data.status.status;
    const user_id = data.user.id;
    const department = data.user.department;
    try {
      const all_length = await this.getAllLength(data)
      if (is_status === 1) {
        const items = await this.getAllInProcess(user_id);
        return { items, all_length }
      } if (is_status === 2) {
        const items = await this.AllSentToPaint();
        return { items, all_length }
      }
      if (is_status === 3) {
        const items = await this.AllSentToWeaving(user_id);
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
    let ID = new mongoose.Types.ObjectId(id);
    try {
      const allInProcess = await SaleDepPaintCardModel.aggregate([
        { $match: { author: ID } },
        {
          $lookup: {
            from: "salecards",
            localField: "sale_order_id",
            foreignField: "_id",
            as: "sale_order",
          },
        },

        {
          $project: {
            status: 1,
            weaving_cloth_quantity: 1,
            weaving_delivery_time: 1,
            status_inprocess: 1,
            sale_order: {
              $cond: {
                if: { $isArray: "$sale_order" },
                then: { $arrayElemAt: ["$sale_order", 0] },
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

  async AllSentToPaint() {
    try {
      const all = await SaleLegalCardModel.find({
        order_status: "Bo'yoqqa yuborildi",
      });
      return all;
    } catch (error) {
      return error.message;
    }
  }
  async AllSentToWeaving(id) {
    let ID = new mongoose.Types.ObjectId(id);
    try {
      const allInProcess = await SaleDepPaintCardModel.aggregate([
        { $match: { author: ID } },
        {
          $lookup: {
            from: "salecards",
            localField: "sale_order_id",
            foreignField: "_id",
            as: "sale_order",
          },
        },

        {
          $project: {
            status: 1,
            weaving_cloth_quantity: 1,
            weaving_delivery_time: 1,
            status_weaving: 1,
            sale_order: {
              $cond: {
                if: { $isArray: "$sale_order" },
                then: { $arrayElemAt: ["$sale_order", 0] },
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
    let ID = new mongoose.Types.ObjectId(data.id);
    try {
      const allProvide = await SaleDepProvideCardModel.aggregate([
        {
          $match: {
            $and: [{ author: ID }, { department: data.department }],
          },
        },
      ]);
      return allProvide;
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
  async getOneFromInProcess(payload) {
    console.log(payload);
    const data = await SaleDepPaintCardModel.findById(payload.id);
    if (data.sale_order_id) {
      const item = await SaleDepWeavingCardModel.aggregate([{ $match: { order_id: data.order_id } }, {
        $lookup: {
          from: "salecards",
          localField: "sale_order_id",
          foreignField: "_id",
          as: "in_process_detail",
        },
      },
      {
        $project: {
          order_report_at_progress: 1,
          weaving_cloth_quantity: 1,
          in_process_detail: {
            $cond: {
              if: { $isArray: "$in_process_detail" },
              then: { $arrayElemAt: ["$in_process_detail", 0] },
              else: null,
            },
          },
        },
      },]);
      console.log(item);
      return { report: item[0].order_report_at_progress, customer_name: item[0].in_process_detail.customer_name, order_number: item[0].in_process_detail.order_number, weaving_cloth_quantity: item[0].weaving_cloth_quantity };
    }


  }
  async addDayReportInProcess(data) {
    let order_report_at_progress = []
    order_report_at_progress.push(data.items)
    const ID = data.id;
    const newData = await InProcessPaintModel.findByIdAndUpdate(ID, { order_report_at_progress }, { new: true });
    return newData;
  }
}

module.exports = new DepPaintService();
