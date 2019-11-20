import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export class TaggingHeader extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return <section className="tag-header-cont">
           <h1>Etiquetando</h1>
        </section>
    }
}