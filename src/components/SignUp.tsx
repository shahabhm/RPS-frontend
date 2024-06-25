import { useState } from 'react';
import SearchableDropdown from "./SearchableDropdown";
import DatePicker from "react-multi-date-picker"
import {postRequest} from '../requests.js'

const SignUp = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [city, setCity] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [conditions, setConditions] = useState([]);
    const [birthdate, setBirthdate] = useState(Date())

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
            })
    };


    return (
        <form onSubmit={handleSubmit} className="container">
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
            <a>Birthdate:</a>
            <div>
                <DatePicker value={birthdate} onChange={setBirthdate}/>
            </div>
            <a> conditions: </a>

            <SearchableDropdown setSelectedConditions={setConditions} endpoint={'get_condition_names'}/>

            <button type="submit" className="btn btn-primary" style={{margin: "20px 0px"}}>Submit</button>
        </form>
    );
};

export default SignUp;