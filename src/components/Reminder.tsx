import React, {useEffect, useState} from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {postRequest} from "../requests";
import {ReminderRow} from "./ReminderRow";

interface Props {
    patient_id: string;
}

export const Reminder = ({patient_id}: Props) => {
    const [reminderDate, setReminderDate] = useState();
    const [reminderText, setReminderText] = useState('');
    const [reminders, setReminders] = useState([]);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        postRequest('get_reminders', {patient_id}).then(json => setReminders(json)).catch(error => console.error(error));
    }, [patient_id, trigger]);

    const textChangeHandler = (event) => {
        setReminderText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postRequest('add_reminder', {
            patient_id: patient_id,
            date: reminderDate.format('MM/DD/YYYY HH:mm:ss'),
            reminderText
        }).then(() => {
            setTimeout(() => setTrigger(t => !t), 100)
        }).catch(error => console.error(error));
    }

    return (
        <div className="container mt-5" style={{maxWidth: "800px"}}>
            <div className="mt-5">
                <h4>Reminders:</h4>
                {reminders ?
                    <ul className="list-group" style={{listStyleType: "none"}}>{
                        reminders.map((entry, index) => <li><ReminderRow className={"list-group-item"}
                                                                         reminder={entry.reminder}
                                                                         parentTrigger={setTrigger}
                                                                         key={index}
                                                                         date={entry.date}
                                                                         id={entry.id}/></li>)
                    }</ul>
                    :
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Reminder Date:</label>
                    <DatePicker
                        value={reminderDate}
                        onChange={setReminderDate}
                        format="MM/DD/YYYY HH:mm:ss"
                        plugins={[
                            <TimePicker position="bottom" hideSeconds={true} format={"HH:MM"}/>,
                            <DatePanel markFocused/>
                        ]}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input type="text" value={reminderText} onChange={textChangeHandler} className="form-control"
                           placeholder={"Reminder Text"}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};