import * as React from 'react';
import './dashboard.css';
import axios from 'axios';

class DashboardPage extends React.Component<any, any> {
    public componentDidMount() {
        this.getFilesData();
    }

    public render() {
        return (
            <div>
                <div className="section-1">
                    <h3>Latest Compared Voice</h3>
                    <div id="chartContainer" style={{height: 450 + "px", width: 100 + "%"}}/>
                </div>
                <div className="section-2">
                    <div className="dash-side-section">
                        <h3>Favourite</h3>
                        <div className="sideContent">
                            <li>Aud-001.wav</li>
                            <li>Aud-002.wav</li>
                            <li>Aud-003.wav</li>
                        </div>
                    </div>
                    <div className="dash-side-section">
                        <h3>Most Recent</h3>
                        <div className="sideContent">
                            <li>Aud-001.wav</li>
                            <li>Aud-002.wav</li>
                            <li>Aud-003.wav</li>
                        </div>
                    </div>
                    <div className="dash-side-section">
                        <h3>Most Listened</h3>
                        <div className="sideContent">
                            <li>Aud-001.wav</li>
                            <li>Aud-002.wav</li>
                            <li>Aud-003.wav</li>
                        </div>
                    </div>
                </div>
            </div>
        
        );
    }

    public getFilesData() {
        const formData = new FormData();
        formData.append('fileName1', "C:/Users/rshriramoji/Desktop/FI/2018-19/speech-recog/flaskMiddleWare/uploads/Recording1.wav")
        formData.append('fileName2', "C:/Users/rshriramoji/Desktop/FI/2018-19/speech-recog/flaskMiddleWare/uploads/Recording2.wav")
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        try {
            axios.post('http://127.0.0.1:5000/getFileData', formData, config).then((res)=> {
                const chart = new CanvasJS.Chart("chartContainer", {
                    title: {
                        text: "Voice Comparison"
                    },
                    axisX: {
                        title: "Frequency"
                    },
                    axisY: {
                        title: "Power"
                    },
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        cursor: "pointer",
                        verticalAlign: "top",
                        horizontalAlign: "center",
                        dockInsidePlotArea: false
                    },
                    data: [{
                        type: "line",
                        name: "User 1",
                        showInLegend: true,
                        markerSize: 0,
                        dataPoints: res.data.fileData1
                    },{
                        type: "line",
                        name: "User 2",
                        showInLegend: true,
                        markerSize: 0,
                        dataPoints: res.data.fileData2
                    }]
                });
                chart.render();
            }, error => {
                console.log(error);
            })
        } catch(e) {
            console.log(e);
        }

        // this.state.data1 = [
        //     { x: 0.12, y: 209 },
        //     { x: 0.3, y: 495 },
        //     { x: 1.04, y: 419 },
        //     { x: 1.12, y: 309 },
        //     { x: 1.3, y: 215 },
        //     { x: 1.34, y: 219 },
        //     { x: 1.36, y: 309 },
        //     { x: 1.53, y: 115 },
        //     { x: 1.84, y: 419 }
        // ];
        // this.state.data2 = [
        //     { x: 0.11, y: 529 },
        //     { x: 0.52, y: 539 },
        //     { x: 1.1, y: 519 },
        //     { x: 1.12, y: 359 },
        //     { x: 1.3, y: 112 },
        //     { x: 1.34, y: 299 },
        //     { x: 1.36, y: 359 },
        //     { x: 1.53, y: 215 },
        //     { x: 1.84, y: 119 }
        // ];
       
    }
}

export default DashboardPage;