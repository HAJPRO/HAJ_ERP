const SaleLegalCardModel = require("../../models/saleLegalCard.model.js");
const SaleDepPaintCardModel = require("../../models/saleDepPaintCard.model");
const SaleDepProvideCardModel = require("../../models/saleDepProvideCard.model.js");
const userModel = require("../../models/user.model");
const InProcessModel = require("../../models/InProcess.model.js");

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
    const user = await userModel.findById(author);
    const paint_process_status = {
      author: author,
      is_confirm: { status: true, reason: "" },
      sent_time: new Date()
    }
    const box_item = {
      pus: data.items.pus,
      fike: data.items.fike,
      color_code: data.items.color_code,
      raw_cloth_quantity: data.items.raw_cloth_quantity,
      duration_time: data.items.duration_time,
    }

    const newDataForProvide = {
      department: user.department,
      delivery_product_box: box_item,
      author: author,
      author_id: author,
      proccess_status: { confirm: true, reason: '', status: "Taminotga yuborildi" }
    }
    const provideData = await SaleDepProvideCardModel.create(newDataForProvide);
    const provide_id = provideData._id
    if (provideData) {
      const userData = await userModel.findById(author);
      const department = userData.department
      const Data = await SaleDepPaintCardModel.create({ author, sale_order_id: data.card_id, paint_process_status, provide_id });
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
        const in_process_data = {
          author: author,
          order_id: data.card_id,
          author_id: author,
          department: department
        }
        const inProcess = await InProcessModel.create(in_process_data)
      }
    }

    return provideData;
  }
  // async getAllLength(id) {
  //   const sale_length = (await SaleLegalCardModel.find({ author: id })).length
  //   const paint_length = (await SaleLegalCardModel.find({ $and: [{ $and: [{ author: id }, { order_status: "Bo'yoqqa yuborildi" }] }] })).length
  //   const weaving_length = (await SaleLegalCardModel.find({ $and: [{ author: id }, { order_status: "To'quvga yuborildi" }, { order_status: "To'quv bekor qildi" }] })).length
  //   const spinning_length = (await SaleLegalCardModel.find({ $and: [{ author: id }, { order_status: "Yigiruvga yuborildi" }, { order_status: "Yigiruv bekor qildi" }] })).length
  //   const provide_length = (await SaleLegalCardModel.find({ $and: [{ author: id }, { order_status: "Taminotga yuborildi" }, { order_status: "Tamin bekor qildi" }] })).length
  //   return { sale_length, paint_length, weaving_length, spinning_length, provide_length }
  // }

  async getAll(data) {
    const is_status = data.status.status
    const user_id = data.user.id
    const department = data.user.department
    try {
      if (is_status === 1) {
        return await this.getAllInProcess(user_id)
      } else
        if (is_status === 2) {
          return await this.AllSentToPaint()
        }
        // else if (is_status === 3) {
        //   return await this.AllSentToPaint()
        else if (is_status === 5) {
          return await this.AllSentToProvide({ id: user_id, department })
        }
    } catch (error) {
      return error.message
    }
  }
  async getAllInProcess(id) {
    try {
      // const allInProcess = await InProcessModel.find({ author: user.id }).populate('order_id')
      const allInProcess = await InProcessModel.aggregate([{ $match: { author_id: id } },
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

      ])
      return allInProcess;
    } catch (error) {
      return error.message
    }

  }

  async AllSentToPaint() {
    try {
      const all = await SaleLegalCardModel.find({ order_status: "Bo'yoqqa yuborildi" })
      return all
    } catch (error) {
      return error.message
    }
  }

  // async AllSentToWeaving() {
  //   try {
  //     const allWeaving = await SaleLegalCardModel.find({ $or: [{ in_department_order: "To'quv" }, { order_status: "To'quv yuborildi" }, { isConfirm: "To'quv bekor qildi" }] }).populate([
  //       "author",
  //       "dep_paint_data",
  //       "dep_provider_data",
  //       "dep_weaving_data",
  //     ]);;
  //     return allWeaving
  //   } catch (error) {
  //     return error.message
  //   }
  // }
  async AllSentToProvide(data) {

    try {
      const allProvide = await SaleDepProvideCardModel.aggregate([{
        $match: {
          $and: [
            { author_id: data.id },
            { department: data.department }
          ]
        }
      },


      ])
      return allProvide;
    } catch (error) {
      return error.message
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

module.exports = new DepPaintService();
