import React from 'react';
import { observer } from 'mobx-react';
import tagStore from '../../../../stores/taggingStore';
import { suggestionStore } from '../../../../stores/suggestionStore';
import SuggestionCard from './SuggestionCard';

interface sampleCardProps {
    hour: string,
    time: string,
    second: any,
    index: any,
    suggestions: any
}

const SampleCard = observer(({ hour, time, second, index, suggestions }: sampleCardProps) => {
    let suggestData = JSON.parse(suggestions);

    return (<article className="sel-suggest-card">
        <div className="time">
            <h3>{hour}:{second}, {time}</h3>
            <p>Vocalización {index+1}</p>
            <span className="time-separator"></span>
        </div>
        <div className="card">
            <span className="arrow-left white"></span>
            <div className="up">
                <span className="audio">

                </span>
                <span className="sample-info">
                    <span className="play" onClick={() => ''}>
                        <img className="play-img" src="./assets/tagging-section/play-audio.svg" height="20px" alt="" />
                        <p> Reproducir muestra</p>
                    </span>
                    <p className="caption" >De acuerdo a este fragmento se han encontrado <span className="yellow-text">3 subespecies</span> que coinciden.</p>
                    <button className="yellow-btn"
                        onClick={() => suggestionStore.onSampleSugDisplay()}
                    >Revisar sugerencias</button>
                </span>
            </div>

            <section className={(suggestionStore.isSampleSuggestionsOn) ? 'suggestions' : 'suggestions undisplay'}>
                {
                    suggestData.map((s, i) => {

                        return <SuggestionCard
                            percentage={s.percentage}
                            spectro={s.spectroImgUrl}
                            position={i + 1}
                            sciname={s.sciName}
                            commonName={s.commonName}
                            birdPhoto={s.birdPhotoUrl}
                            audio={s.mainAudioUrl}
                            author={s.owner}
                            location={s.location}
                            url={s.url}
                            isPlaying={s.isPlaying}
                            coincidences={suggestData.length}
                        ></SuggestionCard>
                    })
                }
            </section>
        </div>
    </article>);
});

export default SampleCard;