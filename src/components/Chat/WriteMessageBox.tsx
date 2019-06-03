import React, { Component } from 'react';
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable } from 'mobx';
import chatStore from '../../stores/chatStore';
import Chat from '../Chat/Chat';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class WriteMessageBox extends Component {

    @observable writeInputClicked: boolean = false;
    @observable textValue: string = '';

    constructor(props: any) {
        super(props);
    }

    sendMessage() {
        console.log('USSSERRRNAME', chatStore.username);
        //chatStore.writeMessageToDB(this.textValue);
        chatStore.sendMessage(this.textValue);
        console.log(this.textValue);
    }

    handleMessageSubmit = e => {
        e.preventDefault();
        const msg = e.target;
    } 

    render() {
        return (<section>
            <form className="write-message-box"
                onSubmit={
                    (e: any) => {
                        e.preventDefault();
                        this.sendMessage();
                    }
                }>
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
                <input className="send-btn"
                    type="submit"
                    value="Enviar"></input>
            </form>
        </section>);
    }
}

export default observer(WriteMessageBox);