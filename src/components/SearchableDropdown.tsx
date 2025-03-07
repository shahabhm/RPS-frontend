import Select from 'react-select';
import {useEffect, useState} from "react";

interface Props {
    endpoint: string;
    setSelectedConditions: any;
    isSingle: boolean;
    placeholder: string;
}

const SearchableDropdown = (props: Props) => {

    const [options, setOptions] = useState([
        {value: 'item1', label: 'کیست مویی'},
        {value: 'item2', label: 'اسکیزوفرنی'},
    ]);

    useEffect(() => {
        fetch(`http://localhost:3000/${props.endpoint}`)
            .then(response => {
                // console.log(response.json())
                return response.json()
            })
            .then(json => setOptions(json))
            .catch(error => console.error(error));
    }, []);

    const handleChange = (selectedOptions) => {
        console.log(selectedOptions);
        props.setSelectedConditions(selectedOptions);
    };

    return (
        <Select
            options={options}
            isMulti={!props.isSingle}
            onChange={handleChange}
            placeholder={props.placeholder || "Select"}
        />
    );
};

export default SearchableDropdown;