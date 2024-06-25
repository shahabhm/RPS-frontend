import Select from 'react-select';
import {useEffect, useState} from "react";

interface Props {
    setSelectedConditions: any;
}

const SearchableDropdown = (props: Props) => {

    const [options, setOptions] = useState([
        {value: 'item1', label: 'کیست مویی'},
        {value: 'item2', label: 'اسکیزوفرنی'},
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/get_condition_names')
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
            isMulti
            onChange={handleChange}
        />
    );
};

export default SearchableDropdown;