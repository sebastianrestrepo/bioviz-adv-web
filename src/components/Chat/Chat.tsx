import React, { Component } from 'react';
import './_Chat.scss'
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import chatStore from '../../stores/chatStore';
import { observable, autorun } from 'mobx';
import DashMenu from '../DashMenu/DashMenu';
import WriteMessageBox from '../Chat/WriteMessageBox';
import ScrollToBottom from 'react-scroll-to-bottom';
import Header from '../Header/Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface ChatProps {
    history: any
}

@observer class Chat extends React.Component<ChatProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
        if (!authStore.isLogged) {
            props.history.push("/");
        }
    }

    renderMessages = () => {
        return chatStore.messages.map(message => (<div style={{
            alignItems: (message.username === chatStore.username)
                ? 'flex-end'
                : 'flex-start'
        }} className="message-box-wrapper">

            {(message.username === chatStore.username)
                ? <div className="message-box-photo">
                    <div className="message-box-itself"
                        style={{
                            alignItems: (message.username === chatStore.username)
                                ? 'flex-end'
                                : 'flex-start'
                        }}>
                        <p className="message-box"
                            style={{
                                backgroundColor: (message.username === chatStore.username)
                                    ? '#35E285'
                                    : '#FFFFFF',
                            }}>{message.text}</p>
                    </div>
                    <img src={"" + message.profile_photo + ""} alt="" width="37" height="37"
                        style={{
                            borderRadius: '100px'
                        }} />  </div>
                : <div className="message-box-photo">
                    <img src={"" + message.profile_photo + ""} alt="" width="37" height="37"
                        style={{
                            borderRadius: '100px'
                        }} />
                    <div className="message-box-itself"
                        style={{
                            alignItems: (message.username === chatStore.username)
                                ? 'flex-end'
                                : 'flex-start'
                        }}>
                        <p className="message-user" >{message.username}</p>
                        <p className="message-box"
                            style={{
                                backgroundColor: (message.username === chatStore.username)
                                    ? '#35E285'
                                    : '#FFFFFF',
                            }}>{message.text}</p>
                    </div>
                </div>}
        </div>));
    }

    render() {
        return (<div className="chat">
            <DashMenu />
            <div className="chat-layout">
                <ScrollToBottom className="messages-list">
                    {this.renderMessages()}
                </ScrollToBottom>
                <WriteMessageBox />
            </div>
        </div>);
    }

}

export default observer(Chat);