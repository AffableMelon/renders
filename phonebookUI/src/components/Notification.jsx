
const Notification = ({message, type}) => {
    console.log(message,type)
    return(
        <div className={type}>{message}</div>
    )
}

export default Notification