import axios from 'axios';
import App from './App';
import './index.css'

import * as React from 'react';

class Uploader extends React.Component {

  public innerHtml: { __html: string } = { __html: '' }
  
  
  public state: any = {
    file: FileList,
    timeStamp: ''
  };

  constructor(props: FileList) {
    super(props);
    this.state = {
      file: '',
      timeStamp: new Date()
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  

  public onFormSubmit(e: any){
    e.preventDefault() // Stop form submit
    if (this.state.file) {
      this.fileUpload(this.state.file).then((response: any) => {
        this.setState({ file: '', timeStamp: new Date() }); // to reset the upload file input
        return 'File Uploaded'
      })
    }
  }

  public onChange(e: any) {
    this.setState({file: e.target.files[0]})
  }

  public fileUpload(file: any){
    const formData = new FormData();
    formData.append('file', file)
    // TODO: Set user, usertype dynamically
    formData.append('username', 'Ram')
    formData.append('usertype', 'normal')
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(App.apis.upload, formData, config).then((res) => {
      // document.getElementById('fileInput').value = '';
      return 'upload success'
    })
  }

  public render() {
    return (
      <div className="index">
          <form onSubmit={ this.onFormSubmit }>
            <h1>File Upload</h1>
            <input id="fileInput" type="file" onChange={ this.onChange } key={ this.state.timeStamp }/>
            <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default Uploader;
