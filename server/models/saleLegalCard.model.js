const { Schema, model } = require("mongoose");

const SaleLegalCardSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    customer_name: { type: String },
    order_number: { type: String },
    pro_name: { type: String },
    pro_type: { type: String },
    pro_color: { type: String },
    pro_width: { type: Number },
    grammaj: { type: Number },
    order_quantity: { type: Number },
    delivery_time: { type: Date, default: Date.now() },
    in_department_order: { type: String, default: "Sotuv" },
    order_status: { type: String, default: "Tasdiqlanmagan" },
    process_status: { type: Array },
    state: { type: Boolean, default: true },
    dep_paint_data: {
      type: Schema.ObjectId,
      ref: "DepPaintCard",
    },
    dep_weaving_data: {
      type: Schema.ObjectId,
      ref: "DepWeavingCard",
    },
    dep_provider_data: {
      type: Schema.ObjectId,
      ref: "DepProviderCard",
    },
  },
  { timestamps: true }
);

module.exports = model("SaleCard", SaleLegalCardSchema);
