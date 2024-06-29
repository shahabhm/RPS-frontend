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

interface HeartRateData {
    heart_rate: number;
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
                data: data.map(x => x.heart_rate),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };
}

interface Props {
    patient_id: string;

}

const getBackgroundColor = function (heartRateData: HeartRateData[]) {
    console.log('heartRateData', heartRateData);
    const lastHeartRate = heartRateData[heartRateData.length - 1]?.heart_rate;
    if (lastHeartRate < 60) {
        return 'red';
    }
    if (lastHeartRate > 100) {
        return 'red';
    }
    if (lastHeartRate){
        return 'green';
    }
    return 'blue'
}

export const HeartRateMonitor = (props: Props) => {
    const [data, setData] = useState();


    useEffect(() => {
            postRequest('get_heart_rates', {patient_id: props.patient_id})
                .then(json => setData(json))
                .catch(error => console.error(error));
        }
        , []);

    const options = {}

    return (
        <div className="heart-rate-monitor">
            <h2 style={{ textAlign: 'center', color: '#3f51b5' }}>Patient Heart rate monitor</h2>
            {!data ? <h2> loading</h2> : <div style={{backgroundColor: getBackgroundColor(data)}}>
                <div style={{backgroundColor: 'white', margin: 20, maxWidth: "400px"}}>
                    {data && <Line options={options} data={generateChartData(data)}></Line>}
                </div>
            </div>}
        </div>
    );
};