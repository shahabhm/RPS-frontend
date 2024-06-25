import {useEffect, useState} from 'react';
import PatientNotesAccordion from "./PatientNotesAccordion";
import useToken from "../useToken";

const PatientNoteForm = () => {
    const [note, setNote] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('token'));

        fetch('http://localhost:3000/get_notes?account_id=1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(json => setNotes(json))
            .catch(error => console.error(error));
    }, []);
    const handleSubmit = (event) => {
        console.log(note, selectedImage)
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3000/add_notes', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            account_id: 1,
            note: note
        }));
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
                {notes ? <PatientNotesAccordion notes={notes}/> :
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
            </ul>
        </div>
    );
};

export default PatientNoteForm;