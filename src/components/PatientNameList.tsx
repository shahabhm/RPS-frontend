import {useEffect, useState} from "react";
import {postRequest} from "../requests";
import {Link} from "react-router-dom";

const PatientNameList = () => {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
            postRequest('get_patients_list', {})
                .then(json => setPatients(json))
                .catch(error => console.error(error));
        }
        , []);

    return (
        <div>
            <h1> List of Patients</h1>
            {patients.map((patient, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                    <img src={patient.avatar} alt={patient.name}
                         style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                    <div className="ml-3">
                        <h5>
                            <Link to={`/patient/${patient.id}`}>{patient.name}</Link>
                        </h5>
                        <p>age: {patient.age}, height: {patient.height}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PatientNameList;