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
                                <p>Agrega una foto de perfil</p>
                            </div>
                        </section>
                    )}
                </Dropzone>

                {this.file && <div>
                    <img src={this.file} style={{ width: '100%' }} />
                    <input type="text" onInput={(e: any) => this.fileName = e.target.value} />
                    <button onClick={() => {
                        authStore.uploadProfilePhoto(this.fileName + '.jpg', this.file);
                        authStore.updateUserStatus();
                        //this.history.push("/home");
                    }}>Subir imagen</button>
                </div>}
            </div>
        );
    }

}

export default observer(ImgDropzone);