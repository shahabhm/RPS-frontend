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
    ChartData
} from 'chart.js';

interface HeartRateData {
    heart_rate: number;
    created_at: string;
    account_id: string;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateChartData = function (data: HeartRateData[]) {
    return {
        labels: data.map(x => new Date(x.created_at).getMinutes()),
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
    heartRate: number[];

}

const getBackgroundColor = function (heartRateData: HeartRateData[]){
    const lastHeartRate = heartRateData[heartRateData.length - 1].heart_rate;
    if (lastHeartRate < 60) {
        return 'red';
    }
    if (lastHeartRate > 100) {
        return 'red';
    }
    return 'green';
}

export const HeartRateMonitor = () => {
    const [data, setData] = useState();

    useEffect(() => {
        fetch('http://localhost:3000/get_heart_rates')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);

    const options = {}

    return (
        <div style={{backgroundColor: data ? getBackgroundColor(data) : "yellow"}}>
            <div style={{backgroundColor: 'white', margin: 20}}>
                {data && <Line options={options} data={generateChartData(data)}></Line>}
            </div>
        </div>
    );
};