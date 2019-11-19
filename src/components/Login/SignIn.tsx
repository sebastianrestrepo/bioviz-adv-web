import React, { Component } from 'react';
import { withRouter } from 'react-router';
import authStore from '../../stores/authStore';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

interface formLoginProps {

}

const SignIn = observer(withRouter((formLoginProps) => {

    return (<form className="sign-in firstdisplay"
        onSubmit={(event: any) => {
            event.preventDefault();
            authStore.login(authStore.credentials.email, authStore.credentials.password);
          

        }}>

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
        <button className="sign-in-btn">Iniciar Sesión</button>
        <p>¿Aún no tienes cuenta? <a>Regístrate</a></p>
    </form>
    );
}));

export default SignIn;