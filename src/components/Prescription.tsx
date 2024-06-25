import {useEffect, useState} from "react";
import SearchableDropdown from "./SearchableDropdown";
import {postRequest} from "../requests";

interface Props {
    patient_id: string;
}

export const Prescription = (props: Props) => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [newPrescriptions, setNewPrescriptions] = useState([]);
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        postRequest('get_prescriptions', {patient_id: props.patient_id}).then(json => setPrescriptions(json)).catch(error => console.error(error));
    }, [props.patient_id, trigger]);
    const handleSubmit = (event) => {
        event.preventDefault();
        postRequest('add_prescription', {
            patient_id: props.patient_id,
            prescriptions: newPrescriptions
        });
        setTimeout(() => setTrigger(!trigger), 100);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="container">
                <SearchableDropdown setSelectedConditions={setNewPrescriptions} endpoint={'get_meds_names'}/>

                <button type="submit" className="btn btn-primary" style={{margin: "20px 0px"}}>Submit</button>
            </form>
            <div>
                <h2>Prescriptions</h2>
                <div>
                    {prescriptions ? prescriptions.map((entry, index) => <div key={index}>{entry.prescription}</div>) :
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                </div>
            </div>
        </div>
    );
};