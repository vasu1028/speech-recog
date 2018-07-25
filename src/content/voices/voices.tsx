import * as React from 'react';

import './voices.css';

class Voices extends React.Component<any, any> {

    public render() {
        const audioFiles = [
            { "username": "John", "recorded_file": "John.wav", "date": "22/07/2018" },
            { "username": "Doe", "recorded_file": "Doe.wav", "date": "20/07/2018" },
            { "username": "Mike", "recorded_file": "Mike.wav", "date": "25/07/2018" }
        ];
        const rows = audioFiles.map((audio) =>
            <tr key={audio.username}>
                <td>{audio.username}</td>
                <td>{audio.recorded_file}</td>
                <td>{audio.date}</td>
            </tr>
        );
        return (
            <table className="table table-striped">
                <thead className="theadcolor">
                    <tr>
                        <th>Username</th>
                        <th>Recorded File</th>
                        <th>Recorded Date</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

export default Voices;