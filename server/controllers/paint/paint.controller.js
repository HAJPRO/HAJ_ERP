const DepPaintService = require("../../services/Paint/paint.service.js");

class DepPaintController {
  async getModel(req, res, next) {
    try {
      const model = await DepPaintService.getModel();
      res.status(200).json(model);
    } catch (error) {
      next(error);
    }
  }

  async PaintConfirmedOrders(req, res, next) {
    try {
      const all = await DepPaintService.PaintConfirmedOrders(req.body);
      res.status(200).json(all);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = await DepPaintService.create(req.body, req.user.id);
      res.status(201).json({ msg: "Muvaffaqiyatli tasdiqlandi !", data });
    } catch (error) {
      next(error);
    }
  }
  async cencelReason(req, res, next) {
    try {
      const data = await DepPaintService.cancelReason(req.body, req.user.id);
      res.status(200).json({ msg: "Muvaffaqiyatli yuborildi !", data });
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
  async GenerateQRCode(req, res, next) {
    try {

      const qr = await DepPaintService.GenerateQRCode(req.body)
      return qr
    }
    catch (error) {
      next(error);
    }
  }
  async getQRImage(req, res, next) {
    try {
      const data = await DepPaintService.getQRImage()
      return data
    }
    catch (error) {
      next(error);
    }
  }
}


module.exports = new DepPaintController();
