function Message() {
    const name = ""
    if (name) return <h1> {name} </h1>;
    else return <h1> hello stranger </h1>;
}

export default Message;