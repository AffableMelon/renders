require("dotenv").config();
const xps = require("express");
const Pers = require("./models/personMongoDB");
const morgan = require("morgan");
const cros = require("cors");
const { default: mongoose } = require("mongoose");
const app = xps();
const PORT = process.env.PORT || process.env.LOCAL_PORT;
// const mongoose = require('mongoose')
// const url = process.env.MONGO_URI;

// console.log(url)

// Person()
//tokens MORGAN
morgan.token("body", (req, rep) => {
  return JSON.stringify(req.body);
});

app.use(cros());
app.use(xps.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// const personSchema = mongoose.Schema({
//     name: String,
//     number: String
// })

// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// const Person = mongoose.model('Person', personSchema)

// let persons = [
//     {
//       "id": "1",
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": "2",
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": "3",
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": "4",
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]

// const generateID = (max, min) => {
//     if (max === 0){
//         return(0)
//     }
//     return(Math.random() * (max - min) + min)

// }

const getInfo = () => {
  const length = persons.length;
  const date = new Date();

  return [date.toString(), length];
};

app.get("/", (req, rep) => {
  rep.send("<h1>Hello world</h1>");
});

app.get("/api/persons", (req, rep) => {
  // rep.json(persons)
  Pers.find({}).then((r) => {
    rep.json(r);
  });
});
// mongoose.connection.close()

app.get("/api/info", (req, rep) => {
  // [date, length] = getInfo()
  // console.log(Pers.forEach(p => p))
  Pers.find().then((r) => {
    r.length;
    rep.send(
      `<div> <p>phonebook has entries for ${
        r.length
      } people</p> <br/> <p>${new Date().toString()}</p></div>`
    );
  });
  // console.log(count)
});

app.get("/api/persons/:id", (req, rep) => {
  Pers.findById(req.params.id)
    .then((person) => {
      if (person) {
        rep.json(person);
      } else {
        rep.status(404);
      }
    })
    .catch((err) => {
      console.log(err);
      rep.status(500).end();
    });
  // const id = req.params.id
  // const person = persons.find(p => p.id === id)

  // if(person){
  //     rep.json(person)
  // }else{
  //     rep.status(404).end()
  // }
});

app.delete("/api/persons/:id", (req, rep) => {
  const id = req.params.id;
  // persons = persons.filter(person => { return(person.id !== id)})
  Pers.findByIdAndDelete(id)
    .then((res) => rep.status(204).end())
    .catch((error) => {
      console.log(err);
      rep.status(500).end();
    });
  // console.log(persons)

  rep.status(204).end();
});

app.post("/api/persons/", (req, rep) => {
  const addPerson = req.body;
  person = new Pers({
    name: addPerson.name,
    number: addPerson.number,
  });

  person
    .save()
    .then((r) => {
      // console.log(`added ${person.name}, ${person.number} to the database`)
      // mongoose.connection.close()
      rep.json(person);
    })
    .catch((err) => {
      console.log(err.message);
      rep.status(400).json({ error: err.message });
    });
  // if ((addPerson.name) && (addPerson.number) ){

  //     // if(!(persons.find(p => p.name === person.name))){
  //     //     const id = generateID(persons.length, 1)
  //     //     person['id'] = id + 1
  //     //     // console.log(person)
  //     //     persons = persons.concat(person)
  //     //     console.log(persons)
  //     //     return(rep.json(person))
  //     // }
  //     // return(rep.status(400).json(
  //     //     {
  //     //         'error': 'Name already exists'
  //     //     }
  //     // ))

  // }else{
  //     return(
  //         rep.status(400).json({
  //             'error': "name/number canot be empty"
  //         })
  //     )
  // }
});

app.put("/api/persons/:id", (req, rep) => {
  const id = req.params.id;
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Pers.findByIdAndUpdate(id, person, { new: true })
    .then((res) => {
      rep.json(res);
    })
    .catch((err) => {
      console.log(err);
      rep.status(500).end();
    });
});

app.listen(PORT);
console.log(`server is running on port ${PORT}`);
