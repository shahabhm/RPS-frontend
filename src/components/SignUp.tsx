import {useState} from "react";

async function signup(credentials) {
    console.log('signing up: ', credentials);
    return fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export const SignUp = ({setToken}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [role, setRole] = useState(false);

    const handleSubmit = async (event) => {
        console.log(name, username, phone_number, role)
        event.preventDefault()
        const token = await signup({
            name: name,
            username: username,
            phone_number: phone_number,
            password: password,
            role: role ? 'DOCTOR' : 'CAREGIVER'
        });
        console.log('token from backend: ', token);
        setToken(token);
    };


    return (
        <div className={"card"}>
            <form onSubmit={handleSubmit} className="container mt-1">
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}
                           required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone:</label>
                    <input type="tel" className="form-control" value={phone_number}
                           onChange={e => setPhone_number(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">username:</label>
                    <input type="text" className="form-control" value={username}
                           onChange={e => setUsername(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" value={password}
                           onChange={e => setPassword(e.target.value)} required/>
                </div>
                <div>
                    <input type="checkbox" id="vehicle1" name="doctor" value={role} onChange={() => setRole(r => !r)}/>
                    <label htmlFor="vehicle1">I am a doctor</label>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
}