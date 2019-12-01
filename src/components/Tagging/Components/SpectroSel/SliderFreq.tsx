import React, { useState }from 'react';
import { observer } from 'mobx-react';
import Slider from '@material-ui/core/Slider';
import toolsStore from '../../../../stores/toolsStore';

interface SliderFreqProps {
}


@observer class SliderFreq extends React.Component<SliderFreqProps> {

    constructor(props: any) {
        super(props);
    }

    render() {

        return (<div>
              <Slider
                orientation="vertical"
                defaultValue={[toolsStore.handlersValue[1], toolsStore.handlersValue[0]]}
                onChange={(event, value) => {
                    console.log(value);
                    const sliderValue = [value[0] * 7.69, (13 - value[1]) * 7.69];
                    toolsStore.setHandlerValue(sliderValue);
                    console.log(toolsStore.handlersValue[1]);
                }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={13}
            />
        </div>);
    }
}

export default observer(SliderFreq);
