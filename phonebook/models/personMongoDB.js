require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((r) => {
    console.log("succseffully connected!");
  })
  .catch((err) => {
    console.log("error: " + err.message);
  });

const personSchema = mongoose.Schema({
  name: {
    minLength: 3,
    type: String,
    required: true,
  },
  number: {
    validate: {
      validator: (v) => {
        return /\d{2}-/.test(v) || /\d{3}-/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    minLength: 8,
    type: String,
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);

//so like changing the 'Person' bit changes from whre it retrieves the db
