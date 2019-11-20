import React from 'react';
import './_Tagging.scss'
import { observer } from 'mobx-react';
import ColorEditor from './Components/SpectroEditor/ColorEditor';
import ContrastEditor from './Components/SpectroEditor/ContrastEditor';
import { TagSound } from './Components/TagSound/TagSound';

interface TaggingProps {
}

@observer class Tagging extends React.Component<TaggingProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div className="tagging">
            <TagSound/>
        </div>);
    }
}

export default observer(Tagging);