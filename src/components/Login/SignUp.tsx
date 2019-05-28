import React, { Component } from 'react';

class SignUp extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (<div className="sign-up">
            <div className="form-imput">
                <label>Nombres y Apellidos*</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div className="form-imput">
                <label>Correo Electrónico*</label>
                <input type="text" id="mail" name="mail" required />
            </div>
            <div className="form-imput">
                <label>Contraseña*</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button className="sign-up-btn">Registrarse</button>
        </div>
        );
    }
}

export default (SignUp);