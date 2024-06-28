import {SignUp} from "./SignUp";
import {useState} from "react";
import {Login} from "./Login";

export const SignupLogin = ({setToken, setTrigger}) => {
    const [login, setLogin] = useState(false);

    return (
        <>
            {
                login ? <button onClick={() => setLogin(false)}>Sign Up</button> :
                    <button onClick={() => setLogin(true)}>Login</button>
            }
            {
                login ? <Login setToken={setToken} setTrigger={setTrigger}/> :
                    <SignUp setToken={setToken} setTrigger={setTrigger}/>
            }
            <div>
            </div>
        </>
    );
};