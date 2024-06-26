import Accordion from 'react-bootstrap/Accordion';
import {postRequest} from "../requests";

interface Props {
    id: number;
    note: string;
    created_at: string;
    setParentTrigger: any;
    index: number;
}

function PatientNotesAccordion(props: Props) {

    const handleDelete = () => {
        postRequest('delete_notes', {
            id: props.id
        }).then(() => null).catch(error => console.error(error));
        setTimeout(() => props.setParentTrigger(t => !t), 100);
    }

    return (
        <Accordion.Item key={props.index} eventKey={`${props.id}`}>
            <Accordion.Header>note {props.created_at}
                <button onClick={handleDelete} type="button" className="btn-close btn-danger" aria-label="Close"></button>
            </Accordion.Header>
            <Accordion.Body>
                <p>{props.note}</p>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default PatientNotesAccordion;