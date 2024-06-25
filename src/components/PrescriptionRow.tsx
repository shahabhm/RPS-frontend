import {postRequest} from "../requests";

interface Props {
    index: number,
    prescription: string,
    parentTrigger: any,
    patient_id: string
}

export const PrescriptionRow = (props: Props) => {

    const handleDelete = () => {
        console.log('delete')
        postRequest('delete_prescription', {
            prescription: props.prescription,
            patient_id: props.patient_id
        }).then(() => null).catch(error => console.error(error));
        setTimeout(() => props.parentTrigger(t => !t), 100);
    }

    return (
        <li className={'list-group-item'}>
            {props.prescription}
            <button onClick={handleDelete} type="button" className="btn-close" aria-label="Close"></button>
        </li>
    );
};