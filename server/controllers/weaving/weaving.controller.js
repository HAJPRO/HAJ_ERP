const DepWeavingService = require("../../services/Weaving/weaving.service.js");
const SaleLegalCardModel = require("../../models/saleLegalCard.model.js");
const UserModel = require("../../models/user.model.js");

class DepWeavingController {
  async getModel(req, res, next) {
    try {
      const model = await DepWeavingService.getModel();
      res.status(200).json(model);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const allSale = await DepWeavingService.getAll();
      res.status(200).json(allSale);
    } catch (error) {
      next(error);
    }
  }
  async cencelReason(req, res, next) {
    try {
      const data = await DepWeavingService.cancelReason(req.body, req.user.id);
      res.status(200).json({ msg: "Muvaffaqiyatli yuborildi !", data });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const data = await DepWeavingService.create(req.body, req.user.id);
      res.status(201).json({ msg: "Muvaffaqiyatli yuborildi !", data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await DepWeavingService.delete(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { body, params } = req;
      const data = await DepWeavingService.edit(body, params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const data = await DepWeavingService.getOne(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepWeavingController();
