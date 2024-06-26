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
        <div>
            <h3>{date}</h3>
            <button onClick={handleDelete} type="button" className="btn-close" aria-label="Close"></button>
            <p> {reminder} </p>
        </div>
    );
};