import React, { Component } from 'react';

class SignIn extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (<div className="sign-in">
            <div className="form-imput">
                <label>Correo Electrónico*</label>
                <input type="text" id="mail" name="mail" required />
            </div>
            <div className="form-imput">
                <label>Contraseña*</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button className="sign-in-btn">Iniciar Sesión</button>
            <p>¿Aún no tienes cuenta? <a>Regístrate</a></p>
        </div>
        );
    }
}

export default (SignIn);