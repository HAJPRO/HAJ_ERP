const { Schema, model } = require("mongoose");

const SaleDepSpinningCardSchema = new Schema(
    {
        author: { type: Schema.ObjectId, ref: "User" },
        sale_order_id: { type: Schema.ObjectId, ref: "SaleCard" },
        latun: { type: Number },
        begunok: { type: Number },
        duration_time: { type: Date, default: new Date() },
        status: { type: String, default: "Taminotga yuborildi" },
        spinning_process_status: { type: Array },
        state: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = model("DepSpinningCard", SaleDepSpinningCardSchema);
