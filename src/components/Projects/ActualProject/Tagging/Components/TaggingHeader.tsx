import 'rc-time-picker/assets/index.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './customDatepicker.scss';

import { SingleDatePicker } from 'react-dates';
import tagStore from '../../../../../stores/taggingStore';
import ReactDOM from 'react-dom';
import moment from 'moment';

import TimePicker from 'rc-time-picker';
const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';


@observer
export class TaggingHeader extends React.Component {

    constructor(props) {
        super(props);
    }
    onChange(value) {
        console.log(value && value.format(str));
    }

    render() {
        return <section className="tag-header-cont">
            <div className="datetime">
                <h1>Etiquetando</h1>

                <label >
                    <p>Día:</p>
                    <SingleDatePicker
                        date={moment()} // momentPropTypes.momentObj or null
                        onDateChange={date => {
                            tagStore.dayAnalyzing = date
                            // console.log( date._d, 'FECHA')
                        }} // PropTypes.func.isRequired
                        isDayBlocked={function noRefCheck() { }}
                        placeholder="Seleccionar"
                        displayFormat="MMM D"
                        focused={tagStore.focusedDayInput} // PropTypes.bool
                        onFocusChange={({ focused }) => tagStore.focusedDayInput = focused} // PropTypes.func.isRequired
                        id="id" // PropTypes.string.isRequired,
                        numberOfMonths={1}
                        showKeyboardShortcuts={false}
                        dayPickerNavigationInlineStyles={null}
                        isDayHighlighted={function noRefCheck() { }}
                        isOutsideRange={function noRefCheck() { }}
                        block={false}
                        transitionDuration={0}
                    />
                </label>
                <label >
                    <p>Hora:</p>

                    <TimePicker
                        showSecond={showSecond}
                        defaultValue={moment()}
                        className="xxx"
                        onChange={this.onChange}
                        minuteStep={5}
                        use12Hours
                        inputReadOnly
                    />
                </label>
            </div>

            <label >
                <p>Tiempo actual:</p>
                <p className="green-text">{tagStore.actualTime}</p>
            </label>
            <div className="right-handlers">
                <button className="green-button">
                    Especies en estudio
            </button>
                <div>
                    <p>Sugerencias</p>
                    <label className="switch">
                        <input type="checkbox" onChange={(e:any) => tagStore.isAiOn = e.target.checked} name="" id="" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>


        </section>
    }
}