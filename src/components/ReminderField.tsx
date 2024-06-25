import {useState} from 'react';
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePicker from "react-multi-date-picker";

const ReminderField = () => {
    const [dateTime, setDateTime] = useState(null);
    const [note, setNote] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({note, dateTime});

    };

    const handleDateTimeChange = (newDateTime) => {
        console.log('day changed', dateTime)
        setDateTime(newDateTime);
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label className="form-label">Notes:</label>
                    <input type="text" className="form-control" value={note} onChange={e => setNote(e.target.value)}
                           required/>
                </div>
                <DatePicker
                    // disableDayPicker
                    value = {dateTime}
                    onChange={handleDateTimeChange}
                    format = "YYYY-MM-DD HH:mm A"
                    plugins={[<TimePicker hideSeconds position={"bottom"}/> ]}
                />
                <button type="submit" className="btn btn-primary" style={{margin: "20px 0px"}}>Submit</button>
            </form>

        </div>
    );
};

export default ReminderField;