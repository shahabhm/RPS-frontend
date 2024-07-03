import {Link} from "react-router-dom";
import RegisterPatient from './components/RegisterPatient';
import {Route, Routes} from "react-router-dom";
import PatientNameList from "./components/PatientNameList";
import useToken from './useToken.js';
import {PatientPage} from "./components/PatientPage";
import {useEffect, useState} from "react";
import {SignupLogin} from "./components/SignupLogin";
import "./App.css";
import SimpleMap from "./components/SimpleMap";

const App = () => {
    const {token, setToken} = useToken();
    const [trigger, setTrigger] = useState(false);
    console.log('token at app', token);
    if (!token) {
        return <SignupLogin setToken={setToken} setTrigger={setTrigger}/>
    }

    return <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{position: "sticky", top: 0}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">RPS</a>
                <div className="" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/register_patient">register patient</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/patient_list">list of patients</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/map">map</Link>
                        </li>
                    </ul>
                </div>
                <div className="avatar">
                    <img src="public/vite.svg" alt="Avatar"/>
                    <span>{JSON.parse(sessionStorage.getItem('name')) || "Account"}</span>
                </div>
            </div>
        </nav>
        <Routes>
            <Route path="/" element={<PatientNameList/>}/>
            <Route path="/register_patient" element={<RegisterPatient/>}/>
            <Route path="/patient_list" element={<PatientNameList/>}/>
            <Route path="/patient/:id" element={<PatientPage/>}/>
            <Route path="/login" element={<SignupLogin setToken={setToken}/>}/>
            <Route path="/map" element={<SimpleMap/>}/>
        </Routes>
    </div>
};

export default App;