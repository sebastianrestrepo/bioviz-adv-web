import * as React from 'react';
import { observer } from 'mobx-react';
import SampleCard from './SampleCard';

@observer
export class SelSuggestions extends React.Component {

    render() {
        return <section className="SelSuggestions-section">
            <SampleCard />
            <SampleCard />
        </section>
    }
}

