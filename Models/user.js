// One to One Relationship in Mongoose
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

const userSchema = new Schema({
  username: String,
  addresses: [
    {
      _id: false,
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  let user1 = new User({
    username: "siddhant",
    addresses: [
      {
        location: "201b mahatama nagar",
        city: "Nashik",
      },
      {
        location: "101a kandiwali",
        city: "Mumbai",
      },
    ],
  });

  user1.addresses.push({
    location: "301 Ram indu park",
    city: "Pune",
  });

  let result = await user1.save();
  console.log(result);
};

addUsers();
