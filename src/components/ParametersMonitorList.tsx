import {ParameterMonitor} from "./ParameterMonitor";
import {postRequest} from "../requests";
import {useEffect, useState} from "react";

export const ParametersMonitorList = ({patient_id}) => {
    const [parameters, setParameters] = useState();


    useEffect(() => {
        postRequest('get_patient_parameters', {patient_id}).then(
            json => {
                setParameters(json.parameters);
                console.log(json)
            }
        ).catch(error => console.error(error));
    }, [patient_id]);


    return (
        <div>
            <h3>Patient's parameters</h3>
            <div>{parameters?.map((parameter) => (
                <div>
                    <ParameterMonitor patient_id={patient_id} parameter={parameter}/>
                </div>
            ))}</div>
        </div>
    );
};