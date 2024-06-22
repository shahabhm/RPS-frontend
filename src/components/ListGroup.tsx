import {useState} from "react";
interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void;
}
export const ListGroup = (props: Props) => {
    // const cities = ["A", "B", "C", "D", "E", "F"];
    const [selectedIndex, setSelectedIndex] = useState(-1)
    return (
        <>
            <h1>{props.heading}</h1>
            <ul className="list-group">
                {props.items.map((city, index) => (<li onClick={() => {
                    setSelectedIndex(index);
                    props.onSelectItem(city)
                }} className={
                    selectedIndex === index? "list-group-item active": "list-group-item"
                } key={city}>{city}</li>))}
            </ul>
        </>
    );
};