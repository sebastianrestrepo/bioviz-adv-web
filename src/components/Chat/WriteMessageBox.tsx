import React, { Component } from 'react';
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable } from 'mobx';
import chatStore from '../../stores/chatStore';
import Chat from '../Chat/Chat';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class WriteMessageBox extends Component {

    @observable writeInputClicked: boolean = false;
    @observable textValue: string = 'xd';

    constructor(props: any) {
        super(props);
    }

    sendMessage() {
        console.log('USSSERRRNAME', chatStore.username);

        chatStore.writeMessageToDB(this.textValue);
        console.log(this.textValue);
    }

    render() {
        return (<section>
            <div className="write-message-box">
                <input className="write-input" name="" placeholder="Escribe un mensaje..."
                    onChange={(e) => {
                        this.textValue = e.target.value;
                    }}
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
                <button className="send-btn"
                    onClick={() => {
                        this.sendMessage()
                    }}>Enviar</button>
            </div>
        </section>);
    }
}

export default observer(WriteMessageBox);