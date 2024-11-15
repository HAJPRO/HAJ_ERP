const SaleLegalCardModel = require("../models/saleLegalCard.model");
// const fileService = require("./file.service");
const XLSX = require("xlsx");
const excelJs = require("exceljs");
const saleLegalCardModel = require("../models/saleLegalCard.model");

class SaleLegalService {
  async getModel() {
    const model = {
      customer_name: "",
      order_number: "",
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
  async getAllLength() {
    try {
      const Sale = await this.getAllSale()
      const sale_length = Sale ? Sale.length : 0
      const Paint = await this.getAllPaint()
      const paint_length = Paint ? Paint.length : 0
      const Weaving = await this.getAllWeaving()
      const weaving_length = Weaving ? Weaving.length : 0
      const Spinning = await this.getAllSpinning()
      const spinning_length = Spinning ? Spinning.length : 0
      const Provide = await this.getAllProvide()
      const provide_length = Provide ? Provide.length : 0
      const allLength = { sale_length, paint_length, weaving_length, spinning_length, provide_length }
      return allLength
    } catch (error) {
      return error.message
    }
  }
  async getAll(status) {
    try {
      if (status === 1) {
        return await this.getAllSale()
      }
      else if (status === 2) {
        return await this.getAllPaint()
      } else if (status === 3) {
        return await this.getAllWeaving()
      } else if (status === 4) {
        return await this.getAllSpinning()
      } else if (status === 5) {
        return await this.getAllProvide()
      }
    } catch (error) {
      return error.message
    }
  }

  async getAllSale() {
    try {
      const allSale = await SaleLegalCardModel.find({ $or: [{ in_department_order: 'Sotuv' }, { in_department_order: "Bo'yoq" }, { in_department_order: "To'quv" }, { in_department_order: "Yigiruv" }] })
      return allSale;
    } catch (error) {
      return error.message
    }

  }
  async getAllPaint() {
    try {
      const allPaint = await SaleLegalCardModel.find({ $or: [{ in_department_order: "Bo'yoq" }, { order_status: "Bo'yoqqa yuborildi" }, { isConfirm: "Bo'yoq bekor qildi" }] }).populate([
        "author",
        "dep_paint_data",
        "dep_provider_data",
        "dep_weaving_data",
      ]);

      return allPaint
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
