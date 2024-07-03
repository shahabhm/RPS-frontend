import {useParams} from "react-router-dom";
import {ParameterMonitor} from "./ParameterMonitor";
import {PatientOverview} from "./PatientOverview";
import PatientNoteForm from "./PatientNoteForm";
import {Prescription} from "./Prescription";
import {Reminder} from "./Reminder";
import "./PatientPage.css"
import {ParameterInput} from "./ParameterInput";
import {useState} from "react";
import {ParametersMonitorList} from "./ParametersMonitorList";

export const PatientPage = () => {

    const {id} = useParams();
    const patient_id = id;
    const [parametersTrigger, setParametersTrigger] = useState(1);

    return (
        <div className="patient-page">
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}>
                <div>
                    <ParametersMonitorList patient_id={patient_id} trigger={parametersTrigger}/>
                    <hr/>
                    <ParameterInput trigger={setParametersTrigger} patient_id={patient_id}/>
                </div>
                <div>
                    <PatientOverview patient_id={patient_id}/>
                    <hr/>
                    <PatientNoteForm patient_id={patient_id}/>
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