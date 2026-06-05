const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  items:[
    {
      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Merchandise"
      },

      quantity:Number,

      price:Number
    }
  ],

  totalAmount:{
    type:Number,
    required:true
  },

  razorpayOrderId:String,

  razorpayPaymentId:String,

  razorpaySignature:String,

  paymentStatus:{
    type:String,
    enum:[
      "pending",
      "paid",
      "failed"
    ],
    default:"pending"
  }
},
{
  timestamps:true
}
);

module.exports =
mongoose.model(
  "Order",
  orderSchema
);