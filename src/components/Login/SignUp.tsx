import React, { Component } from 'react';
import { withRouter } from 'react-router';
import authStore from '../../stores/authStore';
import { observer } from 'mobx-react';
import ImgDropzone from '../Login/ImgDropzone'

interface formRegisterProps {

}

const SignUp = observer(withRouter((formRegisterProps) => {

    return (<form className="sign-up" onSubmit={(e: any) => {
        e.preventDefault();
        if (authStore.isLogged) {
            formRegisterProps.history.push("/home");
        } else {

        }
    }}>
        <ImgDropzone />
        <div className="form-imput">
            <label>Nombres y Apellidos*</label>
            <input type="text" id="name" name="name" onChange={(e: any) => {
                authStore.credentials.name = e.target.value;
            }} />
        </div>
        <div className="form-imput">
            <label>Correo Electrónico*</label>
            <input type="text" id="mail" name="mail" required
                onChange={(e: any) => {
                    authStore.credentials.email = e.target.value;
                }} />
        </div>
        <div className="form-imput">
            <label>Contraseña*</label>
            <input type="password" id="password" name="password" required
                onChange={(e: any) => {
                    authStore.credentials.password = e.target.value;
                }} />
        </div>
        <button className="sign-up-btn" onClick={() => {
            authStore.register(authStore.credentials.name, authStore.credentials.email, authStore.credentials.password);
            formRegisterProps.history.push("/home");
        }}>Registrarse</button>
        <p>¿Ya tienes una cuenta? <a>Inicia Sesión</a></p>
    </form>
    );
}));

export default SignUp;