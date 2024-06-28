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
        <div style={{ margin: '0 auto', maxWidth: '800px' }}>
            <h2 style={{ textAlign: 'center', color: '#3f51b5' }}>Patient Overview</h2>
            <div>
                {data ? <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
                        <tr style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                            <th>Name</th>
                            <td>{data.patient.name}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                            <th>Height</th>
                            <td>{data.patient.height}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                            <th>Age</th>
                            <td>{data.patient.age}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                            <th>conditions</th>
                            <td>{data.conditions.map(entry => entry.condition).join(", ")}</td>
                        </tr>
                    </table> :
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
            </div>
        </div>
    );
}