import {useParams} from "react-router-dom";
import {HeartRateMonitor} from "./HeartRateMonitor";
import {PatientOverview} from "./PatientOverview";
import PatientNoteForm from "./PatientNoteForm";
import {Prescription} from "./Prescription";

export const PatientPage = () => {

    const {id} = useParams();
    const patient_id = id;

    return (
        <div>
            <h2>Patient heart rate monitor</h2>
            <HeartRateMonitor patient_id={patient_id}/>
            <PatientOverview patient_id={patient_id}/>
            <PatientNoteForm patient_id={patient_id}/>
            <Prescription patient_id={patient_id}/>
        </div>
    );
};