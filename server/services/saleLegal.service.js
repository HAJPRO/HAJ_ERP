const SaleLegalCardModel = require("../models/saleLegalCard.model");
// const fileService = require("./file.service");
const XLSX = require("xlsx");
const saleLegalCardModel = require("../models/saleLegalCard.model");
const randomstring = require("randomstring");
const InProcessModel = require("../models/InProcess.model");

class SaleLegalService {
  async getModel() {
    const order_num = randomstring.generate({
      length: 7,
      charset: ['numeric']
    });
    const model = {
      customer_name: "",
      order_number: `AA${order_num}`,
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
    const {
      customer_name,
      order_number,
      pro_name,
      pro_type,
      pro_color,
      pro_width,
      grammaj,
      delivery_time,
      order_quantity,
    } = data;
    if (
      customer_name &&
      order_number &&
      pro_name &&
      pro_type &&
      pro_color &&
      pro_width &&
      grammaj &&
      delivery_time &&
      order_quantity
    ) {
      const newData = await SaleLegalCardModel.create({ ...data, author });
      return {
        status: 200,
        msg: "Sotuv karta  yaratildi !",
        newData,
      };
    } else {
      return {
        status: 400,
        msg: "Barcha qatorlarni to'ldiring !",
      };
    }
  }

  async confirm(id) {
    const dataById = await SaleLegalCardModel.findById(id).populate("author");
    const data = dataById;
    data.in_department_order = "Bo'yoq";
    data.order_status = "Bo'yoqqa yuborildi";
    data.isConfirm = "Sotuv tasdiqladi";
    const proccess_status =
    {
      department: data.author.department,
      author: data.author.username,
      is_confirm: { status: true, reason: "" },
      status: "Bo'yoqqa yuborildi",
      sent_time: new Date(),
    }
    data.process_status.push(proccess_status);
    const updatedData = await SaleLegalCardModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedData;
  };
  async AllOrderProccessById(id) {
    try {
      const itims = await saleLegalCardModel.findById(id).populate(["author", "dep_paint_data", "dep_weaving_data", "dep_provider_data"])
      return itims
    } catch (error) {
      return error.message
    }
  }
  async getAllLength(id) {
    const sale_length = (await SaleLegalCardModel.find({ author: id })).length
    const paint_length = (await SaleLegalCardModel.find({ $and: [{ $and: [{ author: id }, { order_status: "Bo'yoqqa yuborildi" }] }] })).length
    const weaving_length = (await SaleLegalCardModel.find({ $and: [{ author: id }, { order_status: "To'quvga yuborildi" }, { order_status: "To'quv bekor qildi" }] })).length
    const spinning_length = (await SaleLegalCardModel.find({ $and: [{ author: id }, { order_status: "Yigiruvga yuborildi" }, { order_status: "Yigiruv bekor qildi" }] })).length
    const provide_length = (await SaleLegalCardModel.find({ $and: [{ author: id }, { order_status: "Taminotga yuborildi" }, { order_status: "Tamin bekor qildi" }] })).length
    return { sale_length, paint_length, weaving_length, spinning_length, provide_length }
  }

  async getAll(status, user) {
    const is_status = status.status
    const user_id = user.id
    const department = user.department
    try {
      if (is_status === 0) {
        return await this.getAllInProcess(department)
      } else if (is_status === 1) {
        return await this.getAllSale(user_id)
      }
      else if (is_status === 2) {
        return await this.getAllPaint(user_id)
      } else if (is_status === 3) {
        return await this.getAllWeaving(user_id)
      } else if (is_status === 4) {
        return await this.getAllSpinning(user_id)
      } else if (is_status === 5) {
        return await this.getAllProvide(user_id)
      }
    } catch (error) {
      return error.message
    }
  }
  async getAllInProcess(department) {
    try {
      const allInProcess = await InProcessModel.aggregate([
        { $match: { department: department } },
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
  async getAllSale(user_id) {
    try {
      const all = await SaleLegalCardModel.find({ author: user_id })
      const length = all ? all.length : 0
      return { all, length };
    } catch (error) {
      return error.message
    }

  }
  async getAllPaint(user_id) {
    try {
      const all = await SaleLegalCardModel.find({ $and: [{ author: user_id }, { order_status: "Bo'yoqqa yuborildi" }] }).populate([
        "author",
        "dep_paint_data",
        "dep_provider_data",
        "dep_weaving_data",
      ]);
      const length = all ? all.length : 0
      return { all, length }
    } catch (error) {
      return error.message
    }
  }
  async getAllSpinning() {
    try {
      const allSpinning = await SaleLegalCardModel.find({ $or: [{ in_department_order: "Yigiruv" }, { order_status: "Yigiruvga yuborildi" }, { isConfirm: "Yigiruv bekor qildi" }] }).populate([
        "author",
        "dep_paint_data",
        "dep_provider_data",
        "dep_weaving_data",
      ]);;
      return allSpinning
    } catch (error) {
      return error.message
    }
  }
  async getAllWeaving() {
    try {
      const allWeaving = await SaleLegalCardModel.find({ $or: [{ in_department_order: "To'quv" }, { order_status: "To'quv yuborildi" }, { isConfirm: "To'quv bekor qildi" }] }).populate([
        "author",
        "dep_paint_data",
        "dep_provider_data",
        "dep_weaving_data",
      ]);;
      return allWeaving
    } catch (error) {
      return error.message
    }
  }
  async getAllProvide() {
    try {
      const allProvide = await SaleLegalCardModel.find({ order_status: "Taminotga yuborildi" }).populate([
        "author",
        "dep_paint_data",
        "dep_provider_data",
        "dep_weaving_data",
      ]);;
      return allProvide
    } catch (error) {
      return error.message
    }
  }

  async delete(id) {
    const data = await SaleLegalCardModel.findByIdAndDelete(id);
    return data;
  }

  async edit(data, id) {
    const updatedData = await SaleLegalCardModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedData;
  }

  async getOne(id) {
    const data = await SaleLegalCardModel.findById(id);
    return data;
  }

  // async export_excel(id) {
  //   try {
  //     const Data = await SaleLegalCardModel.findById(id);
  //     // let temp = JSON.stringify(data);
  //     const data = [
  //       { name: "samir", age: 25 },
  //       { name: "saman", age: 30 },
  //     ];
  //     const heading = [["name", "age"]];
  //     let wb = XLSX.utils.book_new(); //new workbook
  //     let ws = XLSX.utils.json_to_sheet(data);
  //     XLSX.utils.sheet_add_aoa(ws, heading);
  //     XLSX.utils.book_append_sheet(wb, ws, "sheet1");
  //     const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
  //     console.log(buffer);
  //     // XLSX.writeFile(wb, down);
  //     res.download(down);
  //     res.attachment("data.elxs");
  //     res.send(buffer);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

module.exports = new SaleLegalService();
