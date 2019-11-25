import * as React from 'react';
import { observer } from 'mobx-react';
import SampleCard from './SampleCard';
import { suggestionStore } from '../../../../stores/suggestionStore';

@observer
export class SelSuggestions extends React.Component {

    render() {
        return <section className="SelSuggestions-section">
            {
                suggestionStore.anchicayaSuggestions.map((e,i)=> {
                    let jsonData = JSON.stringify(e.suggestions)
                    return <SampleCard
                        hour= {e.hour}
                        time = {e.time}
                        second = {e.startTime}
                        index = {i}
                        suggestions = {jsonData} />
                    
                })
            }
           
        </section>
    }
}

