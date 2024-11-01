const { Schema, model } = require("mongoose");

const SaleDepProviderCardSchema = new Schema(
  {
    author_provider: { type: Schema.ObjectId, ref: "User" },
    thread_quantity: { type: Number },
    color_quantity: { type: Number },
    corbamide_quantity: { type: Number },
    acid_quantity: { type: Number },
    provider_status: { type: String, default: "Ko'rib chiqilmoqda" },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("DepProviderCard", SaleDepProviderCardSchema);
