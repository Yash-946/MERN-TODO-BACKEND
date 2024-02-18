// require('dotenv').config()
const mongoose = require("mongoose");


// console.log( typeof(process.env.MONGODB_URL));
mongoose.connect(
  "mongodb+srv://yashagrawal946:Pl7Yx4tT3SDAJBmI@cluster0.rnew19r.mongodb.net/Todos"
);

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: [{
      type: mongoose.Types.ObjectId,
      ref: "User",
    }],
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: "List",
    },
  ],
});

const User = mongoose.model("User", userSchema);
const List = mongoose.model("List", listSchema);

module.exports = {
  List,
  User,
};
