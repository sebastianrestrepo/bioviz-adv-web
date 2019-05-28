import React, { Component } from 'react';
import { withRouter } from 'react-router';
import store from '../../stores/store';
import { observer } from 'mobx-react';

interface formLoginProps {

}

const SignIn = observer(withRouter((formLoginProps) => {

    return (<form className="sign-in"
        onSubmit={(event: any) => {
            event.preventDefault();
            store.login(store.credentials.email, store.credentials.password);
            if (store.isLogged) {
                console.log(store.isLogged);
                formLoginProps.history.push("/home");
            } else {

            }
        }}>

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
        <button className="sign-in-btn">Iniciar Sesión</button>
        <p>¿Aún no tienes cuenta? <a>Regístrate</a></p>
    </form>
    );
}));

export default SignIn;