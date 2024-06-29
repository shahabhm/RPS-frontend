import { useState } from 'react';
import SearchableDropdown from "./SearchableDropdown";
import DatePicker from "react-multi-date-picker"
import {postRequest} from '../requests.js'
import './RegisterPatient.css';
import { useNavigate } from "react-router-dom";


const RegisterPatient = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [city, setCity] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [conditions, setConditions] = useState([]);
    const [birthdate, setBirthdate] = useState(Date())
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        console.log(name, age, height, city, phone_number, conditions, birthdate)
        event.preventDefault();
        postRequest('register_patient', {
            name: name,
            age: age,
            height: height,
            city: city,
            phone_number: phone_number,
            conditions: conditions,
            birthdate: birthdate
        }).then((res) => {
            console.log('response from backend', res);
            navigate(`/patient/${res.id}`)
        }).catch(error => console.error(error));
    };


    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="register-patient mt-1">
                <h3>Register New Patient</h3>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age:</label>
                    <input type="number" className="form-control" value={age} onChange={e => setAge(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Height:</label>
                    <input type="number" className="form-control" value={height} onChange={e => setHeight(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">City:</label>
                    <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone:</label>
                    <input type="tel" className="form-control" value={phone_number} onChange={e => setPhone_number(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Birthdate:</label>
                    <DatePicker value={birthdate} onChange={setBirthdate} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Conditions:</label>
                    <SearchableDropdown setSelectedConditions={setConditions} endpoint={'get_condition_names'} className="form-control"/>
                </div>
                <button className="btn btn btn-success" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RegisterPatient;