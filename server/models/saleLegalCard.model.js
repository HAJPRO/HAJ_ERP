const { Schema, model } = require("mongoose");

const SaleLegalCardSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User", required: true },
    customer_name: { type: String, required: true },
    order_number: { type: String, required: true },
    pro_name: { type: String, required: true },
    pro_type: { type: String, required: true },
    pro_color: { type: String, required: true },
    pro_width: { type: Number, required: true },
    grammaj: { type: Number, required: true },
    order_quantity: { type: Number, required: true },
    delivery_time: { type: Date, default: Date.now(), required: true },
    in_department_order: { type: String, default: "Sotuv" },
    order_status: { type: String, default: "Tasdiqlanmagan" },
    process_status: { type: Array },
    state: { type: Boolean, default: true },
    isConfirm: { type: Array },
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
