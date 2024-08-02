import { useState, useEffect } from "react";
//import axios from "axios";
import Notification from './components/Notification'
import Header from "./components/Header";
import Person from "./components/Person";
import Form from "./components/Form";
import serverSide from "./script/serverside";

const App = () => {
  const [greenMessage, setGreenMessage] = useState('');
  const [filter, setFilter] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [divClass, setDivClass] = useState(null)
  const [persons, setPersons] = useState([
    
  ]);
  const [newName, setNewName] = useState("");
  // const url = "http://localhost:3002/persons";
  const url = "http://localhost:8001/api/persons"

  useEffect(() => {
    serverSide.get(url).then((p) => {
      console.log(p);
      setPersons(p);
    });
  }, []);
  const delHandle = (id, name) => {
    if (confirm(name + " is going to be deleted")) {
      
      serverSide.remove(url, id).then((p) => {
        console.log(p);
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };
  const handleChangePerson = (name, no, id) => {
       if (confirm(name + "already exists change number instead?")) {
        console.log(name, no);
        const person = persons.find((n) => n.name === name);
        console.log(person);
        const cperson = { ...person, number: no };
        console.log(cperson);
        const idurl = `${url}/${cperson.id}`;

        serverSide.place(idurl, cperson).then((r) => {
          console.log(r);
          setPersons(
            persons.map((person) => {
              return person.name !== cperson.name ? person : r;
            }))
          setMessage('Succsess!');
          setDivClass('pass')
          setTimeout( () => {setMessage(null); setDivClass(null)} ,5000);
        }).catch(error => {
          console.log(person.name)
          setMessage(person.name + ' has already been removed')
          setDivClass('error')
          setTimeout(() => {
            setMessage(null); setDivClass(null)
          }, 5000);
          setPersons(persons.filter(p => p.name !== newName))
        })
               }
     
    }
    const filteredPpl = persons
          .filter((p) => {
            if (filter.length === 0) {
              console.log(p);
              return p;
            } else {
              console.log(p);
              return p.name.includes(filter);
            }
          })
  const handleNewPerson = (e) => {
    e.preventDefault();
    const addName = {
      name: newName,
      number: phone,
      // id: persons.length
    };

    persons.some((person) => {
      return person.name === newName;
    })
      ? handleChangePerson(newName, phone)
      : serverSide
          .post(url, addName)
          .then((p) => setPersons(persons.concat(p)))
          .catch(error => {
          setMessage(error.response.data.error)
          setDivClass('error')
          setTimeout(() => {
            setMessage(null); setDivClass(null)
          }, 5000)
          });
   
  };

  const filterHandler = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
    console.log(filter);
  };
  const texts = ["name", "number"];
  const newNameHanlder = (e) => {
    setNewName(e.target.value);
  };
  const newPhoneHandler = (e) => {
    setPhone(e.target.value);
  };
  const hanlders = [newNameHanlder, newPhoneHandler];
  return (
  <div>
  <div className="notifs" >
    hello
  {/* <Notification type={divClass} message={greenMessage} /> */}
  <Notification type={divClass} message={message} />
  </div>
    <div className="container"> 
      <div className="form_container">  
        <Header title="Phone Book" />
        <Form
          onSubHandler={(e) => e.preventDefault()}
          text="filter"
          onCHandler={filterHandler}
       />
        <Form
          button="yes"
          onSubHandler={handleNewPerson}
          text={texts}
          NameChange={newNameHanlder}
          NumberChange={newPhoneHandler}
          submit="Add"
        />
      </div>
      <div className="contacts">
        <Header title="Number" />

        {console.log()}
        <div className="details">

          {

          filteredPpl.length === 0 ? <p>no person found</p>:
          filteredPpl.map((p) => {
            console.log(p);
            if(p === null){
              return(<p> no such entry</p>)
            }
            return (
              <Person
                key={p.name}
                text={p.name}
                number={p.number}
                deleteHandler={() => delHandle(p.id, p.name)}
              />
            );
          })}
        </div>
        
        
      </div>
    </div> 
      
  </div>
  );
};

export default App;
{/** 
      <form onSubmit= {handleNewPerson}>
        <div>
         <p> name: <input onChange={ (e) => {
            setNewName(e.target.value) 
          }} /> </p>
          <p>number: <input onChange={ (e) => {
            setPhone(e.target.value)
          }} /> </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      */}
      
   {/* </div> */}
   
   /*
    persons.some((element) => {
      return element.name === newName;
    })
      ? alert(newName + " already exists")
      : serverSide
          .post(url, addName)
          .then((p) => setPersons(persons.concat(p)));
          */
    /*
        axios
        .post('http://localhost:3002/persons', addName)
        .then(e => {setPersons(persons.concat(e.data))})
        */
       
        // axios.put(url + '/' +cperson.id , cperson).then(r => {
      //     console.log(r)
      //   setPersons(persons.map(person => {
      //     return (person.name !== name ? person:r.data)
      //   }))
      // })
   /*axios.delete(url + '/' + id).then(r => {
      console.log(r.data);
      serverSide.get(url).then(p => {
        setPersons(p)
      }) 
    }) */   
      //  { name: 'Arto Hellas', id: 0 }
    //  { name: 'Arto Hellas', number: '040-123456', id: 1 },
    //  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    //  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    //  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }