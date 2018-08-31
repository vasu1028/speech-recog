import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './myRecordings.css';
import axios from 'axios';
import App from '../../App'

import Button from "@material-ui/core/Button/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import GraphicEq from "@material-ui/icons/GraphicEq";

class MyRecordings extends React.Component<any, IState> {

    public state: IState;

    constructor(props: any) {
        super(props);
        this.state = {
            myVoicesData: [{ user: '', fileName: '', usertype: '', date: '', time: '', duration_milliseconds: 0 }]
        };
    }

    public componentDidMount() {        
        const data = new FormData();
        const settings = { headers: { 'content-type': 'multipart/form-data' } };
        data.append('username', 'Surya');
        axios.post(App.apis.getMyUserAudioFiles, data, settings).then((res) => {
            this.setState({
                myVoicesData: res.data.result
            });
        })
    }

    public render() {
        const sampleVoicerows = this.state.myVoicesData.map((audio) =>
            <TableRow key={audio.user}>
                <TableCell>{audio.user}</TableCell>
                <TableCell>{audio.date} {audio.time}</TableCell>
                <TableCell>{audio.duration_milliseconds}</TableCell>
                <TableCell>{audio.fileName}</TableCell>
                <TableCell>Play button</TableCell>
            </TableRow>
        );

        return (
            <div>
                <div className="height">
                    <div className="align-text">
                        <div>
                            <h2 className="align-left">My recordings</h2>
                            <Button className="align-right voicesButton">
                                <NavLink
                                    to='/voices'
                                    className="item"
                                    activeClassName="active"
                                    replace={false}
                                    >
                                    Demo Voices
                                </NavLink>
                            </Button>
                        </div>
                        <Table className="table table-striped">
                            <TableHead className="theadcolor">
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Date and Time</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Recorded File</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sampleVoicerows}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyRecordings;

interface IState {
    myVoicesData: IVoiceRecord[]
}

interface IVoiceRecord {
    user: string;
    usertype: string;
    fileName: string;
    date: string;
    time: string;
    duration_milliseconds: number
}