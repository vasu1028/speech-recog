import * as React from 'react';
import './comparevoices.css';

import Button from "@material-ui/core/Button/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GraphicEq from "@material-ui/icons/GraphicEq";

class CompareVoices extends React.Component<any, any> {

    public render() {
        const audioFiles = [
            { "username": "John", "recorded_file": "John.wav", "date": "22/07/2018" },
            { "username": "Doe", "recorded_file": "Doe.wav", "date": "20/07/2018" },
            { "username": "Mike", "recorded_file": "Mike.wav", "date": "25/07/2018" }
        ];
        const rows = audioFiles.map((audio) =>
            <TableRow key={audio.username}>
                <TableCell><input type="radio" /></TableCell>
                <TableCell>{audio.username}</TableCell>
                <TableCell>{audio.recorded_file}</TableCell>
            </TableRow>
        );
        return (
            <div>
                <div>
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
                                {rows}
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
                                {rows}
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