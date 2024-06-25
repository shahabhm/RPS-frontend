import {useEffect, useState} from "react";
import {postRequest} from "../requests";

interface Props {
    patient_id: string;
}

export const PatientOverview = (props: Props) => {
    const [data, setData] = useState();


    useEffect(() => {
            postRequest('get_patient_overview', {patient_id: props.patient_id})
                .then(json => setData(json))
                .catch(error => console.error(error));
        }
        , []);
    return (
        <div>
            <h2>Patient Overview</h2>
            <div>
                {data ? <table>
                        <tr>
                            <th>Name</th>
                            <td>{data.patient.name}</td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>{data.patient.height}</td>
                        </tr>
                        <tr>
                            <th>Age</th>
                            <td>{data.patient.age}</td>
                        </tr>
                        <tr>
                            <th>conditions</th>
                            <td>{data.conditions.map(entry => entry.condition)}</td>
                        </tr>
                    </table> :
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
            </div>
        </div>
    );
}