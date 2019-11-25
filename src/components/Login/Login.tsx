import * as React from 'react';
import './_Login.scss'
import authStore from '../../stores/authStore';
import SignIn from '../Login/SignIn';
import SignUp from '../Login/SignUp';
import { observer } from 'mobx-react';
import { observable, autorun } from 'mobx';

interface LoginProps {
    history: any
}

@observer export class Login extends React.Component<LoginProps> {

    @observable signInForm: boolean = true;
    @observable isRegistered: boolean = false;


    constructor(props: any) {
        super(props);

        
    }

    handleLoginState(signin: boolean) {
        this.signInForm = signin;
    }

    render() {
        if(authStore.isLogged){
            this.props.history.push ("/");
        } 
        return (<div className="Login firstdisplay">
            <section className="info-section">
                <div className="logo">BioViz</div>
                <div className="img-div">
                    <img src="./assets/login-photo.png" alt="" width="410" />
                </div>
                <h1>¡Hola!</h1>
                <p>Bienvenido/a a la plataforma de análisis y etiquetado bioacústico <br></br>  más usada por todos los biólogos en el mundo entero. </p>
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
                    <div className="form-box" style={{
                        padding: this.signInForm
                            ? '45px 30px 45px 30px'
                            : '20px 30px 25px 30px'
                    }}>
                        {(this.signInForm)
                            ?
                            <SignIn />
                            :
                            <SignUp />
                        }
                    </div>
                </div>
            </section>
        </div>);
    }
}

export default Login;