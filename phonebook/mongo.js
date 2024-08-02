const mongoose = require('mongoose')


if (process.argv.length < 3){
    console.log('youve forgotten one thing please check your command')
    process.exit(1)
}else{ 
    const password = process.argv[2]
    const url = `mongodb+srv://Marshy_FSD:${password}@cluster0.nweviue.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`
    

    const personSchema = mongoose.Schema({
        name: String,
        number: String
    })

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const Person = mongoose.model('Person', personSchema)
    
    if(process.argv.length === 5){    
        const person = new Person ( {
            name: process.argv[3],
            number: process.argv[4]
        })
        
        person.save().then(r => {
            console.log(`added ${person.name}, ${person.number} to phonebook`)
            mongoose.connection.close()
        })
    } else{
        Person.find({}).then((r) => {
            console.log('Phone Book:')
            r.forEach((p) => {
               console.log(
                p.name,
                p.number
            ) 
            })
            mongoose.connection.close()
        })
    }
}