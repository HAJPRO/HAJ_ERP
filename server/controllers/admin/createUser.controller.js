const CreateUserService = require("../../services/Admin/createUser.service");
class createUserController {
  async createUser(req, res, next) {
    try {
      const data = await CreateUserService.CreateUser(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new createUserController();
