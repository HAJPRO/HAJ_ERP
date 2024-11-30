const { Schema, model } = require("mongoose");

const InProcessWeavingSchema = new Schema(
    {
        department: { type: String, required: true },
        author: { type: Schema.ObjectId, ref: "User" },
        order_id: { type: Schema.ObjectId, ref: "SaleCard" },
        order_report_at_progress: { type: Array },
        status: { type: String, required: true, default: "Jarayonda" },
        state: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = model("InProcessWeavingModel", InProcessWeavingSchema);
