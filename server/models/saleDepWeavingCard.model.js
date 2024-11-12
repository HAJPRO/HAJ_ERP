const { Schema, model } = require("mongoose");

const SaleDepWeavingCardSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    sale_order_id: { type: Schema.ObjectId, ref: "SaleCard" },
    likra: { type: String },
    polister: { type: String },
    melaks_yarn: { type: String },
    yarn_wrap: { type: String },
    duration_time: { type: Date, default: new Date() },
    status: { type: String, default: "Taminotga yuborildi" },
    weaving_process_status: { type: Array },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("DepWeavingCard", SaleDepWeavingCardSchema);
