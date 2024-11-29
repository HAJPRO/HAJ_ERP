const { Schema, model } = require("mongoose");

const SaleDepWeavingCardSchema = new Schema(
  {
    departmen: { type: String, default: "To'quv" },
    author: { type: Schema.ObjectId, ref: "User" },
    sale_order_id: { type: Schema.ObjectId, ref: "SaleCard" },
    provide_id: { type: Schema.ObjectId, ref: "DepProvideCard" },
    weaving_process_status: { type: Array },
    status_provide: { type: String, default: "Taminotga yuborildi" },
    status_spinning: { type: String, default: "Yigiruvga yuborildi yuborildi" },
    weaving_process_status: { type: Array },
    state: { type: Boolean, default: true },


  },
  { timestamps: true }
);

module.exports = model("DepWeavingCard", SaleDepWeavingCardSchema);
