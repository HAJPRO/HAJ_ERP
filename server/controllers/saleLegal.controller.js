const SaleLegalService = require("../services/saleLegal.service.js");
const XLSX = require("xlsx");

class saleLegalController {
  async getModel(req, res, next) {
    try {
      const model = await SaleLegalService.getModel();
      res.status(200).json(model);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const allSale = await SaleLegalService.getAll();
      res.status(200).json(allSale);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = await SaleLegalService.create(req.body, req.user.id);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await SaleLegalService.delete(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async confirm(req, res, next) {
    try {
      const ID = req.body.id;
      const data = await SaleLegalService.confirm(ID);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { body, params } = req;
      const data = await SaleLegalService.edit(body, params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const data = await SaleLegalService.getOne(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async export_excel(req, res, next) {
    try {
      const ID = req.body.id;
      const data = await SaleLegalService.export_excel(ID);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new saleLegalController();
