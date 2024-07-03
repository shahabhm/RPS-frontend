import SearchableDropdown from "./SearchableDropdown";
import React, {useState} from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {postRequest} from "../requests";

export const ParameterInput = ({patient_id, trigger}) => {

    const [parameter, setParameter] = useState(null);
    const [value, setValue] = useState(0);
    const [readingDate, setReadingDate] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        postRequest('send_parameter', {
            patient_id: patient_id,
            date: readingDate.format('MM/DD/YYYY HH:mm:ss'),
            parameter: parameter.value,
            value
        }).then(() => {
            setTimeout(() => trigger(t => t + 1), 200)
        }).catch(error => {
            console.error(error);
            setTimeout(() => trigger(t => t + 1), 200)
        });
    }


    return (
        <div>
            <h3>
                Register Parameters
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Reading Date:</label>
                    <DatePicker
                        value={readingDate}
                        onChange={setReadingDate}
                        format="MM/DD/YYYY HH:mm:ss"
                        plugins={[
                            <TimePicker position="bottom" hideSeconds={true} format={"HH:MM"}/>,
                            <DatePanel markFocused/>
                        ]}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input type="number" value={value} onChange={e => setValue(e.target.value)} className="form-control"
                           placeholder={"Parameter Value"}/>
                </div>
                <SearchableDropdown placeholder={"Select Parameter Type"} isSingle={true}
                                    endpoint={'get_parameters_names'} setSelectedConditions={setParameter}/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};