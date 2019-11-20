import React from 'react';
import './_Tagging.scss'
import { observer } from 'mobx-react';
import ColorEditor from './Components/SpectroEditor/ColorEditor';
import ContrastEditor from './Components/SpectroEditor/ContrastEditor';

interface TaggingProps {
}

@observer class Tagging extends React.Component<TaggingProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div className="tagging">
            <ColorEditor/>
        </div>);
    }
}

export default observer(Tagging);