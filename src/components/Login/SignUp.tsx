import React, { Component } from 'react';
import { withRouter } from 'react-router';
import store from '../../stores/store';
import { observer } from 'mobx-react';

interface formRegisterProps {

}

const SignUp = observer(withRouter((formRegisterProps) => {

    return (<form className="sign-up" onSubmit={(e: any) => {
        e.preventDefault();
        if (store.isLogged) {
            formRegisterProps.history.push("/home");
        } else {

        }
    }}>
        <div className="form-imput">
            <label>Nombres y Apellidos*</label>
            <input type="text" id="name" name="name" />
        </div>
        <div className="form-imput">
            <label>Correo Electrónico*</label>
            <input type="text" id="mail" name="mail" required
                onChange={(e: any) => {
                    store.credentials.email = e.target.value;
                }} />
        </div>
        <div className="form-imput">
            <label>Contraseña*</label>
            <input type="password" id="password" name="password" required
                onChange={(e: any) => {
                    store.credentials.password = e.target.value;
                }} />
        </div>
        <button className="sign-up-btn" onClick={() => {
            store.register(store.credentials.email, store.credentials.password);
        }}>Registrarse</button>
        <p>¿Ya tienes una cuenta? <a>Inicia Sesión</a></p>
    </form>
    );
}));

export default SignUp;