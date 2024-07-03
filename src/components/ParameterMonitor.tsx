import {useEffect, useState} from "react";
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {postRequest} from "../requests";
import {ParameterLimit} from "./ParameterLimit";

interface HeartRateData {
    parameter: number;
    created_at: string;
    account_id: string;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateChartData = function (data: HeartRateData[]) {
    return {
        labels: data.map(x => `${new Date(x.created_at).getHours()}:${new Date(x.created_at).getMinutes()}`),
        datasets: [
            {
                label: 'Heart Rate',
                data: data.map(x => x.value),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };
}

interface Props {
    patient_id: string;
    parameter: string;
    trigger: any;

}

export const ParameterMonitor = (props: Props) => {
    const [data, setData] = useState();
    const [limits, setLimits] = useState();

    const getBackgroundColor = function (heartRateData: HeartRateData[]) {
        console.log('heartRateData', heartRateData);
        const lastValue = heartRateData[heartRateData.length - 1]?.value;
        if (!lastValue) {
            return 'blue';
        }
        if (limits && (lastValue > limits.upper_limit || lastValue < limits.lower_limit)) {
            return 'red';
        }
        return 'green'
    }

    useEffect(() => {
            postRequest('get_patient_parameter', {patient_id: props.patient_id, parameter: props.parameter})
                .then(json => {
                    setLimits(json?.parameter_limits);
                    setData(json?.parameters);
                })
                .catch(error => console.error(error));
        }
        , [props.trigger]);

    const options = {}

    return (
        <div className="heart-rate-monitor">
            <h2 style={{textAlign: 'center', color: '#3f51b5'}}>{props.parameter.replace("_", " ").toLowerCase()}</h2>
            {!data ? <h2> loading</h2> : <div style={{backgroundColor: getBackgroundColor(data)}}>
                <div style={{backgroundColor: 'white', margin: 20, maxWidth: "800px"}}>
                    {data && <Line options={options} data={generateChartData(data)}></Line>}
                    <ParameterLimit patient_id={props.patient_id} parameter={props.parameter} limits={limits}/>
                </div>
            </div>}
        </div>
    );
};