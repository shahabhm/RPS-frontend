import {Login} from "./Login";
import {SignUp} from "./SignUp";
import {useState} from "react";

export const SignupLogin = ({setToken, setTrigger}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [role, setRole] = useState(false);

    async function signIn(credentials, endpoint) {
        console.log('signing up: ', credentials);
        return fetch(`http://localhost:3000/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    const handleSubmitLogin = async e => {
        e.preventDefault();
        const token = await signIn({
            username,
            password
        }, 'login');
        console.log('token from backend: ', token);
        setToken(token);
        setTrigger(t => !t);
    }

    const handleSubmitSignup = async (event) => {
        console.log(name, username, phone_number, role)
        event.preventDefault()
        const token = await signIn({
            name: name,
            username: username,
            phone_number: phone_number,
            password: password,
            role: role ? 'DOCTOR' : 'CAREGIVER'
        }, 'signup');
        console.log('token from backend: ', token);
        setToken(token);
        setTrigger(t => !t);
    };


    const [login, setLogin] = useState(false);

    return (
        <>
            {
                login ? <Login setUsername={setUsername} setPassword={setPassword}/> :
                    <SignUp password={password} setPassword={setPassword} name={name} setName={setName}
                            username={username} setUsername={setUsername} phone_number={phone_number}
                            setPhone_number={setPhone_number} role={role} setRole={setRole}/>
            }
            {
                login ? <button onClick={handleSubmitLogin}>Login</button> :
                    <button onClick={handleSubmitSignup}>Sign Up</button>
            }
            {
                login ? <button onClick={() => setLogin(false)}>create new account</button> :
                    <button onClick={() => setLogin(true)}>already have an account</button>
            }
            <div>
            </div>
        </>
    );
};