const DepPaintService = require("../../services/Paint/paint.service.js");
const DepProvideService = require("../../services/Provide/provide.service");
const SaleLegalCardModel = require("../../models/saleLegalCard.model.js");
const userModel = require("../../models/user.model.js");

class DepProvideController {
  async getModel(req, res, next) {
    try {
      const model = await DepProvideService.getModel();
      res.status(200).json(model);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const allSale = await DepProvideService.getAll();
      res.status(200).json(allSale);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userData = await userModel.findById(req.user.id);
      const proccess_status =
      {
        department: userData.department,
        author: userData.username,
        status: "Yigiruvga yuborildi",
        sent_time: new Date(),
        confirm: [{ author: userData.author, reason: "", isConfirm:true }],
      }

      const data = await DepProvideService.create(
        req.body.items,
        req.user.id,
        proccess_status
      );
      const LegalDataById = await SaleLegalCardModel.findById(req.body.id);
      const newLegalData = LegalDataById;
      newLegalData.order_status = "Yigiruvga yuborildi";
      newLegalData.process_status.push({
        department: userData.department,
        author: userData.email,
        status: "Yigiruvga yuborildi",
        sent_time: new Date(),
      });
      if (data._id) {
        newLegalData.dep_provider_data = data._id;
        const updateDataLegal = await SaleLegalCardModel.findByIdAndUpdate(
          req.body.id,
          newLegalData,
          { new: true }
        );
      }

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await DepPaintService.delete(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { body, params } = req;
      const data = await DepPaintService.edit(body, params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const data = await DepPaintService.getOne(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepProvideController();
