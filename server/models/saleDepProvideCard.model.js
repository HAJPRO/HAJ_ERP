const { Schema, model } = require("mongoose");

const SaleDepProviderCardSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    order_id: { type: Schema.ObjectId, ref: "SaleCard" },
    status: { type: String, default: "Jarayonda" },
    proccess_status: { type: Array },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("DepProviderCard", SaleDepProviderCardSchema);
