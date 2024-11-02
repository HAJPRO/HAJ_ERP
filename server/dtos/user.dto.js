module.exports = class UserDto {
  email;
  department;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.department = model.department;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
};
