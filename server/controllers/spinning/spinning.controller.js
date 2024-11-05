const DepSpinningService = require("../../services/Spinning/spinning.service.js");
const SaleLegalCardModel = require("../../models/saleLegalCard.model.js");
const UserModel = require("../../models/user.model.js");
class DepSpinningController {
  async getModel(req, res, next) {
    try {
      const model = await DepSpinningService.getModel();
      res.status(200).json(model);
    } catch (error) {
      next(error);
    }
  }
  async confirm(req, res, next) {
    try {
      const ID = req.body.id;
      const data = await DepSpinningService.confirm(ID);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const allSale = await DepSpinningService.getAll();

      res.status(200).json(allSale);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userData = await UserModel.findById(req.user.id);
      const data = await DepSpinningService.create(req.body.items, req.user.id);
      const LegalDataById = await SaleLegalCardModel.findById(req.body.id);
      const newLegalData = LegalDataById;
      newLegalData.order_status = "To'quvga yuborildi";
      newLegalData.in_department_order = "To'quv";
      newLegalData.process_status.push({
        department: userData.department,
        author: userData.email,
        status: "To'quvga yuborildi",
        sent_time: new Date(),
      });
      if (data._id) {
        newLegalData.dep_paint_data = data._id;
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
      const data = await DepSpinningService.delete(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { body, params } = req;
      const data = await DepSpinningService.edit(body, params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const data = await DepSpinningService.getOne(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepSpinningController();
