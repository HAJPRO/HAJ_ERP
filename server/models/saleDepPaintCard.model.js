const { Schema, model } = require("mongoose");

const SaleDepPaintCardSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    provider_data: { type: Schema.ObjectId, ref: "DepProviderCard" },
    pus: { type: String },
    fike: { type: String },
    color_code: { type: String },
    duration_time: { type: Date, default: Date.now() },
    raw_cloth_quantity: { type: Number },
    paint_status: { type: String, default: "Taminotga yuborildi" },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("DepPaintCard", SaleDepPaintCardSchema);
