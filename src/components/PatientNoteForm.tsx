import {useEffect, useState} from 'react';
import PatientNotesAccordion from "./PatientNotesAccordion";
import {postRequest} from "../requests";
import Accordion from "react-bootstrap/Accordion";

interface Props {
    patient_id: string;
}

const PatientNoteForm = (props: Props) => {
    const [note, setNote] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [notes, setNotes] = useState(null);
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        postRequest('get_notes', {patient_id: props.patient_id}).then(json => setNotes(json)).catch(error => console.error(error));
    }, [props.patient_id, trigger]);
    const handleSubmit = (event) => {
        event.preventDefault();
        postRequest('add_notes', {
            patient_id: props.patient_id,
            note: note
        });
        // sleep for 100 ms
        setTimeout(() => setTrigger(!trigger), 100);
        setTrigger(t => !t);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label className="form-label">Notes:</label>
                    <input type="text" className="form-control" value={note} onChange={e => setNote(e.target.value)}
                           required/>
                </div>

                <input
                    type="file"
                    name="myImage"
                    // Event handler to capture file selection and update the state
                    onChange={(event) => {
                        console.log(event.target.files[0]); // Log the selected file
                        setSelectedImage(event.target.files[0]); // Update the state with the selected file
                    }}
                /> {/* Conditionally render the selected image if it exists */}
                {selectedImage && (
                    <div>
                        {/* Display the selected image */}
                        <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br/> <br/>
                        {/* Button to remove the selected image */}
                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                )}
                <button type="submit" className="btn btn-primary" style={{margin: "20px 0px"}}>Submit</button>
            </form>
            <div className={"mb-3"}>your notes:</div>
            <ul>
                {notes ? <Accordion>
                        {
                            notes.map((note, index) => <PatientNotesAccordion note={note.note} id={note.id}
                                                                              created_at={note.created_at} index={index}
                                                                              setParentTrigger={setTrigger}/>)
                        }
                    </Accordion> :
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
            </ul>
        </div>
    );
};

export default PatientNoteForm;