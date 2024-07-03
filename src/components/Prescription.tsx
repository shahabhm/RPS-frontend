import {useEffect, useState} from "react";
import SearchableDropdown from "./SearchableDropdown";
import {postRequest} from "../requests";
import {PrescriptionRow} from "./PrescriptionRow";

interface Props {
    patient_id: string;
}

export const Prescription = (props: Props) => {
    const isDoctor = JSON.parse(sessionStorage.getItem('role')) === "DOCTOR";

    const [prescriptions, setPrescriptions] = useState([]);
    const [newPrescriptions, setNewPrescriptions] = useState([]);
    const [dosage, setDosage] = useState('');
    const [amount, setAmount] = useState('');
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        postRequest('get_prescriptions', {patient_id: props.patient_id}).then(json => setPrescriptions(json)).catch(error => console.error(error));
    }, [props.patient_id, trigger]);
    const handleSubmit = (event) => {
        event.preventDefault();
        postRequest('add_prescription', {
            patient_id: props.patient_id,
            prescriptions: newPrescriptions,
            dosage: dosage,
            amount: amount
        });
        setAmount('');
        setDosage('');
        setNewPrescriptions(_ => []);
        setTimeout(() => setTrigger(!trigger), 100);
    };

    return (
        <div style={{margin: '0 auto', maxWidth: '800px'}}>
            <div>
                <h2>Prescriptions</h2>
                <div>
                    {prescriptions ?
                        <ul className="list-group" style={{listStyleType: "none"}}>{
                            prescriptions.map((entry, index) => <li><PrescriptionRow patient_id={props.patient_id}
                                                                                     prescription={entry.prescription}
                                                                                     parentTrigger={setTrigger}
                                                                                     index={index}
                            />
                            </li>)
                        }</ul>
                        :
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                </div>
            </div>
            {
                isDoctor && <form onSubmit={handleSubmit}>
                    <SearchableDropdown isSingle={true} setSelectedConditions={setNewPrescriptions}
                                        endpoint={'get_meds_names'}/>
                    <input placeholder="enter dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} type="text"
                           className="form-control" required/>
                    <input placeholder="enter amount" value={amount} onChange={(e) => setAmount(e.target.value)}
                           type="number" className="form-control" required/>
                    <button type="submit" className="btn btn-primary" style={{margin: "20px 0px"}}>Submit</button>
                </form>
            }
        </div>
    );
};