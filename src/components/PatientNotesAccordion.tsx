import Accordion from 'react-bootstrap/Accordion';
import {postRequest} from "../requests";

interface Props {
    id: number;
    sender_name: string;
    title: string;
    note: string;
    created_at: string;
    setParentTrigger: any;
    index: number;
    image: string;
}

function PatientNotesAccordion(props: Props) {

    const isDoctor = JSON.parse(sessionStorage.getItem('role')) === "DOCTOR";

    const handleDelete = () => {
        postRequest('delete_notes', {
            id: props.id
        }).then(() => null).catch(error => console.error(error));
        setTimeout(() => props.setParentTrigger(t => !t), 100);
    }

    return (
        <Accordion.Item key={props.index} eventKey={`${props.id}`} className="mb-2">
            <Accordion.Header className="d-flex justify-content-between align-items-center">
                <div style={{flex: "1"}}>
                    <span style={{fontWeight: "bold"}}>{props.sender_name}: </span>
                    <span>{props.title}</span>
                </div>
                <span>{new Date(props.created_at).toUTCString()}</span>
                {isDoctor && <button onClick={handleDelete} type="button" className="btn-close btn-danger"
                                     aria-label="Close"></button>}
            </Accordion.Header>
            <Accordion.Body className="bg-light">
                <p className="mb-0">{props.note}</p>
                {props.image && <img src={`http://localhost:3000/uploads/${props.image}`}
                                     style={{maxWidth: "500px", marginTop: "10px"}} alt="note_image"/>}
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default PatientNotesAccordion;