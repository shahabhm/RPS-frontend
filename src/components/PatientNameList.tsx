import {useEffect, useState} from "react";
import {postRequest} from "../requests";
import {Link} from "react-router-dom";

const PatientNameList = () => {

    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchVal, setSearchVal] = useState("");

    function handleSearchClick(event) {
        setSearchVal(event.target.value)
        const searchValue = event.target.value;
        if (searchValue === "") {
            setFilteredPatients(patients);
            return;
        }
        const filterBySearch = patients.filter((patient) => {
            if (patient.name.toLowerCase()
                .includes(searchValue.toLowerCase())) {
                return patient;
            }
        })
        setFilteredPatients(filterBySearch);
    }

    useEffect(() => {
            postRequest('get_patients_list', {})
                .then(json => {
                    setPatients(json);
                    setFilteredPatients(json);
                })
                .catch(error => console.error(error));
        }
        , []);

    return (
        <div style={{margin: '0 auto', maxWidth: '800px'}}>
            <h1 style={{textAlign: 'center', color: '#3f51b5'}}> List of Patients</h1>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                <input type="text" value={searchVal} onChange={handleSearchClick} placeholder="Search patients"
                       style={{marginRight: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc'}}/>
                <button style={{
                    padding: '10px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#3f51b5',
                    color: '#fff'
                }}>Search
                </button>
            </div>
            <ul className={"list-group"}>
                {filteredPatients.map((patient, index) => (
                    <li key={index} className="list-group-item d-flex align-items-center mb-3"
                        style={{borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.15)'}}>
                        <img src={patient.avatar ? patient.avatar : 'public/vite.svg'} alt={patient.name}
                             style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                        <div className="ml-3">
                            <h5>
                                <Link to={`/patient/${patient.id}`}
                                      style={{textDecoration: 'none', color: '#3f51b5'}}>{patient.name}</Link>
                            </h5>
                            <p>age: {patient.age}, height: {patient.height}</p>
                            <p>conditions: {patient.conditions.map((condition) => condition.condition).join(", ")}</p>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default PatientNameList;