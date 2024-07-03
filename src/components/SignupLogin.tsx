import './SignupLogin.css';
import {Login} from "./Login";
import {SignUp} from "./SignUp";
import {useState} from "react";
import Toast from 'react-bootstrap/Toast'

export const SignupLogin = ({setToken, setTrigger}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [role, setRole] = useState(false);
    const [showA, setShowA] = useState(false);

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
        if (!token || token.error) {
            setShowA(s => !s);
        } else {
            setToken(token);
            setTrigger(t => !t);
        }
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
        <div>
            <Toast bg={"danger"} show={showA} onClose={() => {
                s => !s
            }}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Error</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>username or password is wrong</Toast.Body>
            </Toast>
            <div className="container">
                <div className="signup-login">
                    {
                        login ? <Login setUsername={setUsername} setPassword={setPassword} username={username}
                                       password={password}/> :
                            <SignUp password={password} setPassword={setPassword} name={name} setName={setName}
                                    username={username} setUsername={setUsername} phone_number={phone_number}
                                    setPhone_number={setPhone_number} role={role} setRole={setRole}/>
                    }
                    <div>
                        {
                            login ? <button className="btn btn btn-success" onClick={handleSubmitLogin}>Login</button> :
                                <button className="btn btn btn-success" onClick={handleSubmitSignup}>Sign Up</button>
                        }
                    </div>
                    <div>
                        {
                            login ? <a className="link" onClick={() => setLogin(false)}>create new account</a> :
                                <a className="link" onClick={() => setLogin(true)}>already have an account? login</a>
                        }
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
};