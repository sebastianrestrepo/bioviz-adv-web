import React from 'react';
import './_Tagging.scss'
import { observer } from 'mobx-react';
import { TaggingHeader } from './Components/TaggingHeader';
import { TagSound } from './Components/TagSound/TagSound';
import SpectroComp from './Components/GenSpectro/SpectroComp';
import SpectroSel from './Components/SpectroSel/SpectroSel';
import toolsStore from '../../stores/toolsStore';
import ToolsMenu from './Components/ToolsMenu/ToolsMenu';
import { observable } from 'mobx';
import Slider from '@material-ui/core/Slider';
import P5Wrapper from 'react-p5-wrapper';

interface TaggingProps {
}

@observer class Tagging extends React.Component<TaggingProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div className="tagging">
            <TaggingHeader></TaggingHeader>
            <SpectroComp panel={toolsStore.panel} />
            <ToolsMenu />

            <div className="two-sections">
                <div className="spectro-selection" onClick={() => {
                    toolsStore.panel = 2;
                    if (toolsStore.isPlaying) {
                        toolsStore.isPlaying = false;
                        toolsStore.handlePause();
                    }
                }}
                    style={{
                        border: toolsStore.panel == 2 ? toolsStore.panelActivated : toolsStore.panelDisabled
                    }}>
                    <div className="black-card-header">
                        <h3>Selección del audio principal</h3>
                    </div>
                    <SpectroSel />
                </div>
                <TagSound></TagSound>
            </div>
        </div>);
    }
}

export default observer(Tagging);