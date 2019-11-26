import * as React from 'react';
import './_AIGenSuggestions.scss';
import { observer } from 'mobx-react';
import tagStore from '../../../../stores/taggingStore';
import { Mark } from './Mark';

@observer
export class AIGenSuggestions extends React.Component {

    render() {
        return <div className="gen-spectro-section-A" >
            <span className="spectro-section">
                <Mark />
            </span>
        </div>
    }
}
