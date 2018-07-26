import * as React from 'react';
import { Chart } from "react-google-charts";

import './dashboard.css';

class Dashboard extends React.Component<any, any> {
    public render() {
        const options = {
            title: "Voice Comparison",
            hAxis: { title: "Time", viewWindow: { min: 0, max: 15 } },
            vAxis: { title: "Volume", viewWindow: { min: 0, max: 15 } },
            legend: "none"
        };
        const data = [
            ["Time", "Volume"],
            [8, 12],
            [4, 5.5],
            [11, 14],
            [4, 5],
            [3, 3.5],
            [6.5, 7]
        ];
        return (
            <div className={"my-pretty-chart-container"}>
                <Chart
                    chartType='LineChart'
                    data={data}
                    options={options}
                    width='100%'
                    height='400px'
                    legendToggle={true}
                    />
            </div>
        )
    }
}

export default Dashboard;