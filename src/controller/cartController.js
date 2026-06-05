const Cart =
require("../models/Cart");

exports.getCart =
async(req,res)=>{

 let cart =
 await Cart.findOne({
  userId:req.user.id
 })
 .populate(
 "items.product"
 );

 if(!cart){

 cart =
 await Cart.create({
  userId:req.user.id,
  items:[]
 });

 }

 res.json(cart);

};

exports.addToCart =
async(req,res)=>{

 const {
 productId
 } = req.body;

 let cart =
 await Cart.findOne({
 userId:req.user.id
 });

 if(!cart){

 cart =
 await Cart.create({
 userId:req.user.id,
 items:[]
 });

 }

 const exists =
 cart.items.find(
 item=>
 item.product.toString()
 ===
 productId
 );

 if(exists){

 exists.quantity++;

 }else{

 cart.items.push({
 product:productId,
 quantity:1
 });

 }

 await cart.save();

 res.json(cart);

};