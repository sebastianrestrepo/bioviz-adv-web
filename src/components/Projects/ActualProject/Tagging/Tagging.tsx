import React from 'react';
import './_Tagging.scss'
import { observer } from 'mobx-react';
import { TaggingHeader } from './Components/TaggingHeader';

interface TaggingProps {
}

@observer class Tagging extends React.Component<TaggingProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div className="tagging">
            <TaggingHeader></TaggingHeader>
        </div>);
    }
}

export default observer(Tagging);