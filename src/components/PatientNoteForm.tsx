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
    const [noteTitle, setNoteTitle] = useState('')
    useEffect(() => {
        postRequest('get_notes', {patient_id: props.patient_id}).then(json => setNotes(json)).catch(error => console.error(error));
    }, [props.patient_id, trigger]);
    const handleSubmit = (event) => {
        event.preventDefault();
        postRequest('add_notes', {
            patient_id: props.patient_id,
            note_title: noteTitle,
            note: note
        });
        setTimeout(() => setTrigger(t => !t), 200);
    };

    return (
        <div className="container mt-5" style={{maxWidth: "800px"}}>
            <h2 style={{textAlign: 'center', color: '#3f51b5'}}>Patient Notes</h2>
            <ul>
                {notes ? <Accordion>
                        {
                            notes.map((note, index) => <PatientNotesAccordion note={note.note} id={note.id} key={index}
                                                                              created_at={note.created_at} index={index}
                                                                              setParentTrigger={setTrigger}
                                                                              sender_name={note.sender_name}
                                                                              title={note.note_title}/>)
                        }
                    </Accordion> :
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
            </ul>
            <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h2 style={{ textAlign: 'center', color: '#3f51b5' }}>Patient Notes</h2>
                    <input type="text" className="form-control" value={noteTitle}
                           onChange={e => setNoteTitle(e.target.value)} placeholder={"Enter subject"} required/>
                    <input type="text" className="form-control" value={note} onChange={e => setNote(e.target.value)}
                           placeholder={"Enter note"} required/>
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
                        <button onClick={() => setSelectedImage(null)} className="btn btn-danger">Remove</button>
                    </div>
                )}
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
};

export default PatientNoteForm;