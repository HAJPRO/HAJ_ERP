const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);