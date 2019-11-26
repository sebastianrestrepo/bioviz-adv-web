import * as React from 'react';
import './_AIGenSuggestions.scss';
import { observer } from 'mobx-react';
import tagStore from '../../../../stores/taggingStore';
import { suggestionStore } from '../../../../stores/suggestionStore';
import Mark from './Mark';
import { Component } from 'react';

interface aiGenSuggestionsProps {
    isGeneralSpectro: any
}

@observer
export class AIGenSuggestions extends Component<aiGenSuggestionsProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return  <div className="marks">
                    {
                        suggestionStore.anchicayaSuggestions.map((e, i) => {
                            const jsonData = JSON.stringify(e.suggestions[0]);
                            return <Mark index={e.index} start={e.startTime} end={e.endTime} suggestion={jsonData} isGeneralSpectro={this.props.isGeneralSpectro}/>
                        })
                    }
                </div>
        
    }
}
