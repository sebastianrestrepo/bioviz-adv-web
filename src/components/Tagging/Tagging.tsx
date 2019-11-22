import React from 'react';
import './_Tagging.scss'
import { observer } from 'mobx-react';
import { TaggingHeader } from './Components/TaggingHeader';
import { TagSound } from './Components/TagSound/TagSound';
import SpectroComp from './Components/GenSpectro/SpectroComp';
import SpectroSel from './Components/SpectroSel/SpectroSel';
import toolsStore from '../../stores/toolsStore';
import ToolsMenu from './Components/ToolsMenu/ToolsMenu';

interface TaggingProps {
}

@observer class Tagging extends React.Component<TaggingProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div className="tagging">
            <TaggingHeader></TaggingHeader>
            <SpectroComp />
            <ToolsMenu />

            <div className="two-sections">
                <div className="spectro-selection">
                    <SpectroSel regionEnd={toolsStore.regionEnd}
                        specWidth={toolsStore.selSpecWidth}
                        regionStart={toolsStore.regionStart}
                        selSpecLeftPos={toolsStore.selSpecLeftPos}
                        genSpecWidth={toolsStore.genSpecWidth} />
                </div>
                <TagSound></TagSound>
            </div>
        </div>);
    }
}

export default observer(Tagging);