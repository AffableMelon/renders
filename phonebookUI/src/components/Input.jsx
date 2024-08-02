
const Input = ({text, handler}) => {
    console.log(text,handler)
    return(<p><input onChange={handler} placeholder={text}></input></p>)
}

export default Input