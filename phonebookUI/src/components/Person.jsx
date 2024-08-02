

const Person = ({text, number, deleteHandler}) => {
    console.log(text)

    return(
        <div className="person">
            <span className="name">{text}</span>
            <span className="number">{number}</span>
            <button className= 'del' onClick={deleteHandler}>Delete</button>
        </div>
    ) //<p>{text} {number} <button onClick={deleteHandler}>delete</button></p>
}

export default Person