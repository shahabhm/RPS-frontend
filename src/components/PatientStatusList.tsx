import {useEffect, useState} from "react";
import {PatientStatus} from "./PatientStatus";
import './PatientStatusList.css'

export const PatientStatusList = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/get_patient_status_list')
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);

    return (
        <ul className="list-group" style={{maxHeight: '120px'}}>
            {data ? data.map((x, index) => {
                return <PatientStatus key={index} status={x.status} lastUpdated={x.lastUpdated}/>
            }) : <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
        </ul>
    );
};