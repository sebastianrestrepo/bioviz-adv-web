import * as React from 'react';
import './_spectroEditor.scss';

import { observer } from 'mobx-react';
import * as CSS from 'csstype';
import tagStore from '../../../../stores/taggingStore';

@observer
export class SpectroEditor extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const ContrastBrightness: CSS.Properties = {
            filter: 'brightness(' + tagStore.brightVal + ') ' + 'contrast(' + tagStore.contrastVal + ')',
        }
        return <div className="editor-cont">
           
        </div>
    }
}