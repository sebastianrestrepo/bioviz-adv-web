import React, { Component } from 'react';
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable } from 'mobx';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class WriteMessageBox extends Component {

    @observable writeInputClicked: boolean = false;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<section>
            <div className="write-message-box">
                <input className="write-input" name="" placeholder="Escribe un mensaje..."
                    onFocus={() => {
                        this.writeInputClicked = true;
                    }}
                    onBlur={() => {
                        this.writeInputClicked = false;
                    }}
                    style={{
                        backgroundColor: this.writeInputClicked
                            ? '#F4F4F4'
                            : '#E5E5E5',
                        borderColor: this.writeInputClicked
                            ? '#E5E5E5'
                            : 'rgba(0,0,0,0)',
                        borderStyle: this.writeInputClicked
                            ? 'solid'
                            : '',
                        borderWidth: this.writeInputClicked
                            ? '1.3px'
                            : '',
                    }} />
                <button className="send-btn">Enviar</button>
            </div>
        </section>);
    }
}

export default observer(WriteMessageBox);