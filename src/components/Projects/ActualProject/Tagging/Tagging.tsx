import React from 'react';
import './_Tagging.scss'
import { observer } from 'mobx-react';

interface TaggingProps {
}

@observer class Tagging extends React.Component<TaggingProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div className="tagging">
            Etiquetado
        </div>);
    }
}

export default observer(Tagging);