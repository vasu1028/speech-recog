import axios from 'axios';
import App from './App';
import './index.css'

import * as React from 'react';


class Uploader extends React.Component {

  public innerHtml: { __html: string } = { __html: '' }
  
  
  public state: any = {
    file: FileList
  };

  constructor(props: FileList) {
    super(props);
    this.state = {
      file: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  

  public onFormSubmit(e: any){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response: any)=>{
      this.setState({ file: '' });
      return 'File Uploaded';
    })
  }

  public onChange(e: any) {
    this.setState({file: e.target.files[0]})
  }

  public fileUpload(file: any){
    const formData = new FormData();
    formData.append('file', file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(App.uploadUrl, formData, config).then((res) => {
      return 'upload success'
    })
  }

  public render() {
    return (
      <div className="index">
          <form onSubmit={ this.onFormSubmit }>
            <h1>File Upload</h1>
            <input value={ this.state.file } type="file" onChange={ this.onChange } />
            <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default Uploader;
