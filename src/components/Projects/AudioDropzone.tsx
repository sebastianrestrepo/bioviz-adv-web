import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dropzone from 'react-dropzone';
import authStore from '../../stores/authStore';
import projectsStore from '../../stores/projectsStore';
import { auth } from 'firebase';
import { withRouter } from 'react-router';

//import WaveSurfer from 'wavesurfer.js'
import WaveSurfer from 'react-wavesurfer';

require('wavesurfer.js');

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
                        projectsStore.setAudioName(acceptedFiles[0].name);
                        console.log('THIS IS THE AUDIO FILE', acceptedFiles[0].name);
                    }

                    reader.readAsDataURL(acceptedFiles[0]);
                }}>
                    {({ getRootProps, getInputProps }) => (
                        <section className="audio-drop-section" style={{
                            display: this.audioFile
                                ? 'none'
                                : 'flex'
                        }}>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="add-audio-dropzone">
                                    {/* <WaveSurfer
                                        audioFile={this.audioFile}
                                        /*pos={this.state.pos}
                                        onPosChange={this.handlePosChange}
                                        playing={this.state.playing}
                                   />*/}
                                    <img src="./assets/audio-drop-arrow.png" alt="" />
                                    <p>.MP3 O .WAV</p>
                                </div>
                            </div>
                        </section>
                    )}

                </Dropzone>

                {this.audioFile && <div className="user-audio-div">
                    {/*<img className="user-img" src={this.audioFile} width="140" style={{ borderRadius: '100px' }} />*/}
                    <h3>Perfecto, has seleccionado un audio.</h3>
                    <div className="upload-audio-btn" onClick={() => {
                        projectsStore.uploadAudioFile(this.audioFile);
                        //this.history.push("/home");
                    }}>¡Subir audio!</div>
                    {/*<input type="text" onInput={(e: any) => this.fileName = e.target.value} />*/}
                    {/*<button className="subir-img-btn" >Subir Foto</button>*/}
                </div>}
            </div>
        );
    }

}

export default observer(AudioDropzone);