const { Schema, model } = require("mongoose");

const SaleDepPaintCardSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    sale_order_id: { type: Schema.ObjectId, ref: "SaleCard" },
    pus: { type: String },
    fike: { type: String },
    color_code: { type: String },
    duration_time: { type: Date, default: new Date() },
    raw_cloth_quantity: { type: Number },
    paint_status: { type: String, default: "Taminotga yuborildi" },
    process_status: { type: Array, default: "To'quvga yuborildi" },
    isConfirm: {type: Array},
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("DepPaintCard", SaleDepPaintCardSchema);
