import React, { Component } from 'react';
import { withRouter } from 'react-router';
import authStore from '../../stores/authStore';
import SignIn from '../Login/SignIn';
import SignUp from '../Login/SignUp';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

interface LoginProps {
    history : any
}

class Login extends React.Component<LoginProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
        if(authStore.isLogged){
            props.history.push ("/home");
}
    }

    handleLoginState(signin: boolean) {
        this.signInForm = signin;
    }

    render() {
        return (<div className="Login">
            <section className="info-section">
                <div className="logo">BioViz</div>
                <div className="img-div">
                    <img src="./assets/login-photo.png" alt="" width="340" />
                </div>
                <h1>¡Hola!</h1>
                <p>Bienvenido/a a la plataforma de análisis bioacústico más usada <br></br> por todos los biólogos en el mundo entero. </p>
                <p className="statement">Organiza, etiqueta y comparte.</p>
            </section>
            <section className="login-section">

                <div className="login-box">
                    <div className="login-options-btns">
                        <button className="login-btn" id="sign-in-state" onClick={() => { this.handleLoginState(true); console.log('sign in state', this.signInForm); }}
                            style={{
                                borderBottom: this.signInForm ? '3px solid #35E285' : '0px solid #35E285'
                            }}>
                            Iniciar Sesión
                                </button>
                        <button className="login-btn" id="sign-up-state" onClick={() => { this.handleLoginState(false); console.log('sign up state', this.signInForm); }}
                            style={{
                                borderBottom: this.signInForm ? '0px solid #35E285' : '3px solid #35E285'
                            }}>
                            Registrarse
                                </button>
                    </div>
                    <div className="form-box">
                        {(this.signInForm)
                            ?
                            < SignIn />
                            :
                            < SignUp />
                        }
                    </div>
                </div>
            </section>
        </div>);
    }
}

export default observer(Login);