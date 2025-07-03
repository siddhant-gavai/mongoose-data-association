// One to Many Relationship in Mongoose
const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/dataAssociation");
}

const orderSchema = new Schema({
  item: String,
  price: Number,
});
const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
  ],
});

const order = mongoose.model("order", orderSchema);
const customer = mongoose.model("customer", customerSchema);

const addcustomer = async () => {
  let cust1 = new customer({
    name: "Yash",
  });

  let order1 = await order.findOne({ item: "idali" });
  let order2 = await order.findOne({ item: "vada pav" });
  let order3 = await order.findOne({ item: "pav bhaji" });

  cust1.orders.push(order1);
  cust1.orders.push(order2);
  cust1.orders.push(order3);

  let result = await cust1.save();
  console.log(result);
};
addcustomer();

// const addOrders = async (orderData) => {
//   let res = await order.insertMany([
//     {
//       item: "idali",
//       price: 25,
//     },
//     {
//       item: "vada pav",
//       price: 15,
//     },
//     {
//       item: "pav bhaji",
//       price: 30,
//     },
//   ]);

//   console.log(res);
// };

// addOrders();
