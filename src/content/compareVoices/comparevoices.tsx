import * as React from 'react';
import './comparevoices.css';
import axios from 'axios';
import App from '../../App'

import Button from "@material-ui/core/Button/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GraphicEq from "@material-ui/icons/GraphicEq";
import Radio from '@material-ui/core/Radio';

class CompareVoices extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.handleSampleVoiceChange = this.handleSampleVoiceChange.bind(this);
        this.handleUserVoiceChange = this.handleUserVoiceChange.bind(this);
        this.state = {
            selectedSampleVoice: '',
            selectedUserVoice: '',
            data: [{user:'', fileName: '', usertype: ''}]
        };
    }

    public state: ICompareVoicesForm = {
        selectedSampleVoice: '',
        selectedUserVoice: '',        
        data: [{user:'', fileName: '', usertype: ''}]     
    };

    public componentDidMount() {
        const data = new FormData();
        const settings = { headers: { 'content-type': 'multipart/form-data' } };
        data.append('username', 'Ram');
        axios.post(App.apis.getUserAudioFiles, data, settings).then((res) => {
            console.log(res)
            this.setState({
                data: res.data.result
            });
        })
    }

    public handleSampleVoiceChange(event: any) {
        this.setState({
            selectedSampleVoice: event.target.value
        });
    }

    public handleUserVoiceChange(event: any) {
        this.setState({
            selectedUserVoice: event.target.value
        });
    }

    public render() {
        const sampleVoiceFilteredRows = this.state.data.filter(ele => ele.usertype === "system")
        const sampleVoicerows = sampleVoiceFilteredRows.map((audio) =>
            <TableRow key={audio.user}>
                <TableCell>
                <Radio
                    checked={this.state.selectedSampleVoice === audio.fileName}
                    onChange={this.handleSampleVoiceChange}
                    value={audio.fileName}
                    name="radio-button-demo"
                    />
                </TableCell>
                <TableCell>{audio.user}</TableCell>
                <TableCell>{audio.fileName}</TableCell>
            </TableRow>
        );
        const userVoicerowsFilteredRows = this.state.data.filter(ele => ele.usertype === "normal")
        const userVoicerows = userVoicerowsFilteredRows.map((audio) =>
            <TableRow key={audio.user}>
                <TableCell>
                <Radio
                    checked={this.state.selectedUserVoice === audio.fileName}
                    onChange={this.handleUserVoiceChange}
                    value={audio.fileName}
                    name="radio-button-demo"
                    />
                </TableCell>
                <TableCell>{audio.user}</TableCell>
                <TableCell>{audio.fileName}</TableCell>
            </TableRow>
        );

        return (
            <div>
                <div className="height">
                    <div className="align-left align-text">
                        <h2>Sample voice records</h2>
                        <Table className="table table-striped">
                            <TableHead className="theadcolor">
                                <TableRow>
                                    <TableCell>Select</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Recorded File</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sampleVoicerows}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="align-right align-text">
                        <h2>User Voices records</h2>
                        <Table className="table table-striped">
                            <TableHead className="theadcolor">
                                <TableRow>
                                    <TableCell>Select</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Recorded File</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userVoicerows}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="align-text">
                    <Button className="margin50" variant="extendedFab" aria-label="Delete">
                        <GraphicEq />
                        Compare Voices
                    </Button>
                </div>
            </div>
        )
    }
}

export default CompareVoices;

interface ICompareVoicesForm {
    selectedSampleVoice: string;
    selectedUserVoice: string;
    data:IVoiceRecord[]
}

interface IVoiceRecord {
    user: string;
    usertype: string;
    fileName: string;
}