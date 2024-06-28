import {Link} from "react-router-dom";
import SignUp from './components/SignUp';
import PatientNoteForm from './components/PatientNoteForm';
import {Route, Routes} from "react-router-dom";
import PatientNameList from "./components/PatientNameList";
import {Login} from "./components/Login";
import useToken from './useToken.js';
import {PatientPage} from "./components/PatientPage";
import {send} from "./push.js"
import {useEffect, useState} from "react";
import {SignupLogin} from "./components/SignupLogin";

const App = () => {
    const {token, setToken} = useToken();
    const [trigger, setTrigger] = useState(false);
    console.log('token at app', token);
        useEffect(() => {
        console.log('send');
        // push notification
        send();
    }, [trigger]);
    if (!token) {
        return <Login setToken={setToken}/>
    }

    return <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <div className="" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/SignUp">register patient</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/PatientNoteForm">patient notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/PatientsList">list of patients</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Routes>
            <Route path="/" element={<PatientNameList/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/PatientNoteForm" element={<PatientNoteForm/>}/>
            <Route path="/PatientsList" element={<PatientNameList/>}/>
            <Route path="/patient/:id" element={<PatientPage/>}/>
        </Routes>
    </div>
};

export default App;