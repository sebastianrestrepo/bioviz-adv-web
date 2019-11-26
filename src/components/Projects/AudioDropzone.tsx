import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Dropzone from 'react-dropzone';
import projectsStore from '../../stores/projectsStore';

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
                                    <img src="./assets/audio-drop-arrow.png" alt="" />
                                    <p>.MP3 O .WAV</p>
                                </div>
                            </div>
                        </section>
                    )}

                </Dropzone>

                {this.audioFile && <div className="user-audio-div">
                    <h3>Perfecto, se han subido 6 audios.</h3>
                    <span>
                        <ul>
                            <li> <img src="./assets/create-projects/file.png" height="20px" alt="" /> 1_AnchicayaLaLocaCarretera_2019-06-18_06-34.mp3</li>
                            <li> <img src="./assets/create-projects/file.png" height="20px" alt="" />2_AnchicayaLaLocaCarretera_2019-06-18_06-34.mp3</li>
                            <li> <img src="./assets/create-projects/file.png" height="20px" alt="" />3_AnchicayaLaLocaCarretera_2019-06-18_06-34.mp3</li>
                            <li> <img src="./assets/create-projects/file.png" height="20px" alt="" />4_AnchicayaLaLocaCarretera_2019-06-18_06-34.mp3</li>
                            <li> <img src="./assets/create-projects/file.png" height="20px" alt="" />5_AnchicayaLaLocaCarretera_2019-06-18_06-34.mp3</li>
                            <li> <img src="./assets/create-projects/file.png" height="20px" alt="" />6_AnchicayaLaLocaCarretera_2019-06-18_06-34.mp3</li>
                        </ul>
                    </span>
                </div>}
            </div>
        );
    }

}

export default observer(AudioDropzone);