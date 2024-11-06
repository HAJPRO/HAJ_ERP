const UserModel = require("../../models/user.model");
const bcrypt = require("bcrypt");

class CreateUserService {
  async CreateUser(data) {
    try {
      const { username, department, password, role } = data;
      const hashPassword = await bcrypt.hash(password, 10);
      let obj = {
        username,
        password: hashPassword,
        department,
        role,
      };
      const isExists = await UserModel.findOne({ username });
      if (isExists) {
        return {
          success: false,
          msg: "Username name already exists",
        };
      } else if (role && role == 1) {
        return { success: false, msg: "You can't ceate Admin !" };
      } else if (role) {
        const data = await UserModel.create(obj);
        return {
          success: true,
          msg: "User created Successfully !",
          data,
        };
      }
    } catch (err) {
      return err;
    }
  }
}

module.exports = new CreateUserService();
