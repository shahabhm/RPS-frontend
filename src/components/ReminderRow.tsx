import {postRequest} from "../requests";

interface Props {
    id: number,
    reminder: string,
    date: string,
    parentTrigger: any
}

export const ReminderRow = ({id, reminder, date, parentTrigger}: Props) => {

    const handleDelete = () => {
        console.log('delete')
        postRequest('delete_reminder', {
            id: id
        }).then(() => null).catch(error => console.error(error));
        setTimeout(() => parentTrigger(t => !t), 100);
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h3 className="mb-1">{new Date(date).toUTCString()}</h3>
                <p className="mb-0">{reminder}</p>
            </div>
            <button onClick={handleDelete} type="button" className="btn-close" aria-label="Close"></button>
        </li>
    );
};