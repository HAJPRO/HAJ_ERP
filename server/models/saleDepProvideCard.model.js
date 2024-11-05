const { Schema, model } = require("mongoose");

const SaleDepProviderCardSchema = new Schema(
  {
    author_provider: { type: Schema.ObjectId, ref: "User" },
    yarn_quantity: { type: Number },
    color_quantity: { type: Number },
    corbamide_quantity: { type: Number },
    acid_quantity: { type: Number },
    duration_time: { type: Date, default: new Date() },
    provider_status: { type: String, default: "Yigiruvga yubordi" },
    process_status: { type: Array, default: "Yigiruvga yubordi" },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("DepProviderCard", SaleDepProviderCardSchema);
