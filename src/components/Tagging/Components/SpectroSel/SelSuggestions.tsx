import * as React from 'react';
import { observer } from 'mobx-react';
import { suggestionStore } from '../../../../stores/suggestionStore';
import SampleCard from './SampleCard';

@observer
export class SelSuggestions extends React.Component {

    render() {
        return <section className="SelSuggestions-section">
            {
                suggestionStore.anchicayaSuggestions.map((e, i) => {
                    let jsonData = JSON.stringify(e.suggestions)
                    return <SampleCard
                        key={i}
                        hour={e.hour}
                        time={e.time}
                        second={e.startTime}
                        sugCant={e.suggestions.length}
                        index={i}
                        suggestions={jsonData}
                        mainAudio = {e.audio}
                        mainspec = {e.specImg}
                        open={e.sugOpen} />

                })
            }

        </section>
    }
}

