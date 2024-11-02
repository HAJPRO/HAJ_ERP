const { Schema, model } = require("mongoose");

const SaleDepWeavingCardSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    likra: { type: String },
    polister: { type: String },
    melaks_yarn: { type: String },
    yarn_wrap: { type: String },
    duration_time: { type: Date, default: new Date() },
    weaving_status: { type: String, default: "Taminotga yuborildi" },
    process_status: { type: Array, default: "Taminotga yuborildi" },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("DepWeavingCard", SaleDepWeavingCardSchema);
