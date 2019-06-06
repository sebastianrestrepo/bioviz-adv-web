import React, { Component } from 'react';
import { withRouter } from 'react-router';
import authStore from '../../stores/authStore';
import { observer } from 'mobx-react';
import AudioDropzone from './AudioDropzone'

interface formRegisterProps {

}

const NewProjectCard = observer(withRouter((formRegisterProps) => {

    return (<div>
        <AudioDropzone />
    </div>);
}));

export default NewProjectCard;