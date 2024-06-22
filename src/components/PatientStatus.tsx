import './PatientStatus.css'

interface Props {
    status: string,
    lastUpdated: string
}

const emoji_picker = function (emoji_name: string) {
    if (emoji_name === 'happy') {
        return '😊';
    }
    if (emoji_name === 'sad') {
        return '😢';
    }
}

const color_picker = function (patient_status : string) {
    if  (patient_status === 'happy') {
        return 'green'
    }
    else if (patient_status === 'sad') {
        return 'red'
    }
    else
    {
        return 'blue';
    }
}

export const PatientStatus = (props: Props) => {
    return (

        <div className= "patient-status-box" style={{backgroundColor: color_picker(props.status)}}>
            <div className= "emoji">
                {emoji_picker(props.status)}
            </div>
            <div>
                <h4>
                    Facial Expression: {props.status}
                </h4>
                <h5>
                    last updated: {props.lastUpdated}
                </h5>
            </div>
        </div>
    );
};