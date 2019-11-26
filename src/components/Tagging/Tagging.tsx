import React from 'react';
import './_Tagging.scss'
import { observer } from 'mobx-react';
import { TaggingHeader } from './Components/TaggingHeader';
import { TagSound } from './Components/TagSound/TagSound';
import SpectroComp from './Components/GenSpectro/SpectroComp';
import SpectroSel from './Components/SpectroSel/SpectroSel';
import toolsStore from '../../stores/toolsStore';
import ToolsMenu from './Components/ToolsMenu/ToolsMenu';
import { SelSuggestions } from './Components/SpectroSel/SelSuggestions';
import tagStore from '../../stores/taggingStore';
import { AIGenSuggestions } from './Components/GenSpectro/AIGenSuggestions';
import ColorEditor from './Components/SpectroEditor/ColorEditor';
import ContrastEditor from './Components/SpectroEditor/ContrastEditor';
import { CompareAudios } from './Components/CompareAudios/CompareAudios';

interface TaggingProps {
}

@observer class Tagging extends React.Component<TaggingProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div className="tagging">
            <TaggingHeader></TaggingHeader>
            {
                (tagStore.isAiOn) ? <AIGenSuggestions isGeneralSpectro={true} /> : ''
            }
            {
                (tagStore.isDateTimeSelected) ? <section>
                    <SpectroComp panel={toolsStore.panel} />
                    <ToolsMenu />
                    <div className="two-sections">
                        {
                            (tagStore.isComparingMicros) ? <CompareAudios></CompareAudios> : ''
                        }
                        {
                            (tagStore.isSelSpectroSelected) ? <div className="spectro-selection"
                                onClick={() => {
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
                                {
                                    (tagStore.isAiOn) ? <AIGenSuggestions isGeneralSpectro={false} /> : ''
                                }
                                <SpectroSel handlersValue={toolsStore.handlersValue}
                                    rSpectro={toolsStore.rSpectro}
                                    gSpectro={toolsStore.gSpectro}
                                    bSpectro={toolsStore.bSpectro}
                                    rBack={toolsStore.rBack}
                                    gBack={toolsStore.gBack}
                                    bBack={toolsStore.bBack}
                                    whiteAndBlack={toolsStore.whiteAndBlack}
                                    contrastVal={tagStore.contrastVal}
                                    brightVal={tagStore.brightVal} />
                            </div> : ''
                        }

                        {
                            (tagStore.isAiOn && !tagStore.isDataLabeling) ? <SelSuggestions /> :''
                        }
                        {
                            (tagStore.isDataLabeling) ? <TagSound></TagSound> : ''
                        }
                        {
                            (tagStore.isColorEditorOn) ? <ColorEditor /> : ''
                        }
                        {
                            (tagStore.isContrastEditorOn) ? <ContrastEditor /> : ''
                        }

                    </div>
                </section> : ''
            }

        </div>);
    }
}

export default observer(Tagging);