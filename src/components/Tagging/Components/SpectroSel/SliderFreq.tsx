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
                    toolsStore.handlersValue[1] = (24- value[1])*4.166666666666;
                    toolsStore.handlersValue[0] = (value[0])*4.166666666666;
                    console.log(toolsStore.handlersValue[1]);
                }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={24}
            />
        </div>);
    }
}

export default observer(SliderFreq);