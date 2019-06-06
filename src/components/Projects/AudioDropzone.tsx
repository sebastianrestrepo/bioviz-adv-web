import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dropzone from 'react-dropzone';
import authStore from '../../stores/authStore';
import { auth } from 'firebase';
import { withRouter } from 'react-router';

class AudioDropzone extends Component {

    @observable audioFile: any = null;
    @observable audioFileName: string = '';

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="audio-dropzone">
                <Dropzone onDrop={acceptedFiles => {
                    //this.file = acceptedFiles[0];
                    console.log(acceptedFiles[0]);

                    var reader = new FileReader();

                    reader.onload = (e: any) => {
                        this.audioFile = e.target.result;
                        console.log(this.audioFile);
                    }

                    reader.readAsDataURL(acceptedFiles[0]);
                }}>
                    {({ getRootProps, getInputProps }) => (
                        <section className="audio-drop-section">
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="add-audio-dropzone" style={{
                                    display: this.audioFile
                                        ? 'none'
                                        : 'flex'
                                }}>
                                    <img src="./assets/audio-drop-arrow.png" alt="" />
                                    <p>.MP3 O .WAV</p>
                                </div>
                            </div>
                        </section>
                    )}

                </Dropzone>

                {this.audioFile && <div className="user-img-div">
                    <img className="user-img" src={this.audioFile} width="140" style={{ borderRadius: '100px' }} />
                    <p onClick={() => {
                        //authStore.setProfilePhoto(this.file);
                        //this.history.push("/home");
                    }}>¡Foto de perfil, lista!</p>
                    {/*<input type="text" onInput={(e: any) => this.fileName = e.target.value} />*/}
                    {/*<button className="subir-img-btn" >Subir Foto</button>*/}
                </div>}
            </div>
        );
    }

}

export default observer(AudioDropzone);