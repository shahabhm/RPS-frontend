import {useParams} from "react-router-dom";
import {HeartRateMonitor} from "./HeartRateMonitor";
import {PatientOverview} from "./PatientOverview";
import PatientNoteForm from "./PatientNoteForm";
import {Prescription} from "./Prescription";
import {Reminder} from "./Reminder";
import "./PatientPage.css"

export const PatientPage = () => {

    const {id} = useParams();
    const patient_id = id;

    return (
        <div className="patient-page">
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}>
                <div>
                    <HeartRateMonitor patient_id={patient_id}/>
                </div>
                <div>
                    <PatientOverview patient_id={patient_id}/>
                    <hr/>
                    <PatientNoteForm patient_id={patient_id}/>
                    <hr/>
                    <Prescription patient_id={patient_id}/>
                    <hr/>
                    <Reminder patient_id={patient_id}/>
                </div>
            </div>
        </div>
    );
};