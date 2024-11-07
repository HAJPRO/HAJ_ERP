const SaleLegalCardModel = require("../models/saleLegalCard.model");
// const fileService = require("./file.service");
const XLSX = require("xlsx");
const excelJs = require("exceljs");

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
    data.order_status = "Bo'yoqqa yuborildi";
    const proccess_status =
    {
      department: data.author.department,
      author: data.author.username,
      status: "Bo'yoqqa yuborildi",
      sent_time: new Date(),
      confirm: [{ author: data.author.username, reason: "", isConfirm: true }],
    }
    data.process_status.push(proccess_status);
    const updatedData = await SaleLegalCardModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedData;
  }

  async getAll(order_num) {
    if ((order_num = !" ")) {
      const allPosts = await SaleLegalCardModel.find({}).populate([
        "author",
        "dep_paint_data",
        "dep_provider_data",
        "dep_weaving_data",
      ]);
      res.json({ allPosts });
    } else {
      const allPosts = await SaleLegalCardModel.find().populate([
        "author",
        "dep_paint_data",
        "dep_provider_data",
        "dep_weaving_data",
      ]);
      return { allPosts };
    }
    const dep_paint_data = await SaleLegalCardModel.find().populate(
      "dep_paint_data"
    );
    const painting_length = await SaleLegalCardModel.find({
      order_status: "Bo'yoqqa yuborildi",
    });
    const provide_length = await SaleLegalCardModel.find({
      order_status: "Taminotga yuborildi",
    });
    return { allPosts, painting_length, provide_length };
  }

  async delete(id) {
    const data = await SaleLegalCardModel.findByIdAndDelete(id);
    return data;
  }

  async edit(data, id) {
    if (!id) {
      console.log("Id not found");
    }

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
