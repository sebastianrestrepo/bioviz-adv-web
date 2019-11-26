import * as React from 'react';
import './_AIGenSuggestions.scss';
import { observer } from 'mobx-react';
import tagStore from '../../../../stores/taggingStore';
import { suggestionStore } from '../../../../stores/suggestionStore';
import Mark from './Mark';

@observer
export class AIGenSuggestions extends React.Component {

    render() {
        return <div className="gen-spectro-section-A" >
            <span className="spectro-section">
                {
                    suggestionStore.anchicayaSuggestions.map((e,i) => {
                        const jsonData = JSON.stringify(e.suggestions[0]);
                        return <Mark start={e.startTime} end={e.endTime} suggestion={jsonData} />
                    })
                }
              
            </span>
        </div>
    }
}
