import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dropzone from 'react-dropzone';
import authStore from '../../stores/authStore';
import { auth } from 'firebase';

class ImgDropzone extends Component {

    @observable file: any = null;
    @observable fileName: string = '';

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="img-dropzone">
                <Dropzone onDrop={acceptedFiles => {
                    //this.file = acceptedFiles[0];
                    console.log(acceptedFiles[0]);

                    var reader = new FileReader();

                    reader.onload = (e: any) => {
                        this.file = e.target.result;
                        console.log(this.file);
                    }

                    reader.readAsDataURL(acceptedFiles[0]);
                }}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="add-img-btn" style={{
                                    display: this.file
                                        ? 'none'
                                        : 'flex'
                                }}>
                                    <img src="./assets/add-profile-ph-btn.png" alt="" />
                                    <p>Agrega una foto de perfil</p>
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>

                {this.file && <div className="user-img-div">
                    <img className="user-img" src={this.file} width="140" style={{ borderRadius: '100px' }} />
                    <p onClick={() => {
                        authStore.setProfilePhoto(this.file);
                        //this.history.push("/home");
                    }}>¡Foto de perfil, lista!</p>
                    {/*<input type="text" onInput={(e: any) => this.fileName = e.target.value} />*/}
                    {/*<button className="subir-img-btn" >Subir Foto</button>*/}
                </div>}
            </div>
        );
    }

}

export default observer(ImgDropzone);