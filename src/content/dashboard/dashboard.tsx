import * as React from 'react';
import { Chart } from "react-google-charts";

import './dashboard.css';
import axios from 'axios';

interface IState {
    fileData: any
}
class DashboardPage extends React.Component<any, IState> {
    public state: IState;
    constructor(props: any) {
        super(props);
        this.state = {
            fileData: []
        }
    }
    public render() {
        const options = {
            title: "Voice Comparison",
            hAxis: { title: "Frequency"},
            vAxis: { title: "Volume"},
            legend: "none"
        };
      
        this.getFilesData();
        return (
            <div className={"my-pretty-chart-container"}>
                <Chart
                    chartType='LineChart'
                    data={this.state.fileData}
                    options={options}
                    width='100%'
                    height='400px'
                    legendToggle={true}
                    />
            </div>
        )
    }

    public getFilesData() {
        const formData = new FormData();
        formData.append('filename', "C:/Users/rshriramoji/Desktop/FI/2018-19/speech-recog/flaskMiddleWare/uploads/Recording.wav");
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        try {
            const result = [["Frequency", "Volume"],[0,0]];
            axios.post('http://127.0.0.1:5000/getFileData', formData, config).then((res)=> {
                console.log(res);
                for(let i=0;i<res.data.xValues.length;i++){
                    const coPoints = [];
                    coPoints.push(res.data.xValues[i]);
                    coPoints.push(res.data.yValues[i]);
                    result.push(coPoints);
                }
                this.setState({'fileData': result});
            }, error => {
                console.log(error);
            })
        } catch(e) {
            console.log(e);
        }
        // return [
        //     ["Frequency", "Volume"],
        //     [2, 12],[4, 5.5],
        //     [5, 14],
        //     [6, 5],
        //     [7, 3.5],
        //     [7.8, 7],[8, 12],
        //     [9, 5.5],
        //     [11, 14],
        //     [14, 5],
        //     [115.3, 3.5],
        // ];
    }
}

export default DashboardPage;