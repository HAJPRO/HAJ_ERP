const { Schema, model } = require("mongoose");

const SaleDepPaintCardSchema = new Schema(
  {
    departmen: { type: String, default: "Bo'yoq" },
    author: { type: Schema.ObjectId, ref: "User" },
    sale_order_id: { type: Schema.ObjectId, ref: "SaleCard" },
    provide_id : { type: Schema.ObjectId, ref: "DepProvideCard" },
    status_provide: { type: String, default: "Taminotga yuborildi" },
    status_weaving: { type: String, default: "To'quvga yuborildi" },
    paint_process_status: { type: Array },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = model("DepPaintCard", SaleDepPaintCardSchema);
