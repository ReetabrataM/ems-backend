const crypto =
require("crypto");

const Order =
require("../models/Order");

const Merchandise =
require("../models/Merchandise");

const Cart =
require("../models/Cart");

exports.verifyPayment =
async(req,res)=>{

 try{

 const {

 razorpay_order_id,

 razorpay_payment_id,

 razorpay_signature

 } = req.body;

 const generatedSignature =
 crypto
 .createHmac(
  "sha256",
  process.env.RAZORPAY_SECRET
 )
 .update(
 razorpay_order_id
 +
 "|"
 +
 razorpay_payment_id
 )
 .digest("hex");

 if(
 generatedSignature !==
 razorpay_signature
 ){
  return res.status(400)
  .json({
   message:
   "Invalid Payment"
  });
 }

 const order =
 await Order.findOne({
  razorpayOrderId:
  razorpay_order_id
 });

 order.paymentStatus =
 "paid";

 order.razorpayPaymentId =
 razorpay_payment_id;

 order.razorpaySignature =
 razorpay_signature;

 await order.save();

 for(
 const item of order.items
 ){

  await Merchandise
  .findByIdAndUpdate(
   item.product,
   {
    $inc:{
     stock:
     -item.quantity
    }
   }
  );

 }

 await Cart.findOneAndUpdate(
 {
 userId:
 order.userId
 },
 {
 items:[]
 }
 );

 res.json({
  success:true
 });

 }catch(error){

  res.status(500)
  .json(error);

 }

};