import Accordion from 'react-bootstrap/Accordion';

interface Note {
    id: number;
    note: string;
    created_at: string;

}

interface Props {
    notes: Note[];
}

function PatientNotesAccordion(props: Props) {
    console.log(props)
    return (
        <Accordion>
            {
                props.notes.map(note => <Accordion.Item eventKey={`${note.id}`}>
                    <Accordion.Header>note {note.created_at}</Accordion.Header>
                    <Accordion.Body>
                        <p>{note.note}</p>
                    </Accordion.Body>
                </Accordion.Item>)
            }
        </Accordion>
    );
}

export default PatientNotesAccordion;