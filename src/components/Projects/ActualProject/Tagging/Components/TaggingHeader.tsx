import * as React from 'react';
import { observer } from 'mobx-react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { SingleDatePicker, DirectionProvider } from 'react-dates';
import tagStore from '../../../../../stores/taggingStore';

@observer
export class TaggingHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <section className="tag-header-cont">
            <h1>Etiquetando</h1>
            <SingleDatePicker
                date={tagStore.dayAnalyzing} // momentPropTypes.momentObj or null
                onDateChange={date => {
                    tagStore.dayAnalyzing = date
                    // console.log( date._d, 'FECHA')
                }} // PropTypes.func.isRequired
                isDayBlocked={function noRefCheck() { }}

                focused={tagStore.focusedDayInput} // PropTypes.bool
                onFocusChange={({ focused }) => tagStore.focusedDayInput = focused} // PropTypes.func.isRequired
                id="id" // PropTypes.string.isRequired,
                numberOfMonths={1}
                showKeyboardShortcuts={false}
                dayPickerNavigationInlineStyles={null}
                isDayHighlighted={function noRefCheck() { }}
                isOutsideRange={function noRefCheck() { }}
                block={false}
                transitionDuration= {0}

            />
        </section>
    }
}