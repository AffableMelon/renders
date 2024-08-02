import Input from './Input'

const Form = (p) => {
    console.log(p)
    if ( p.button === 'yes'){
        return (
            <div className={p.submit}>
                <form onSubmit={p.onSubHandler}>
                    {p.text.map((element, i) => {
                        return (<Input key={i} text = {element} handler={ element === 'name' ? p.NameChange:p.NumberChange} />)
                    })}
                    <button type="submit">
                        {p.submit}
                    </button>
                </form>
            </div>
        )
    }
    return (
        <form onSubmit={p.onSubHandler}>
            <Input text = {p.text} handler={p.onCHandler} />
            {/* {p.text} <input onChange={p.onCHandler}>  */}
            {/* </input> */}
        </form>
    )
}

export default Form