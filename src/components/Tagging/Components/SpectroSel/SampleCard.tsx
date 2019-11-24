import React from 'react';
import { observer } from 'mobx-react';
import tagStore from '../../../../stores/taggingStore';
import { suggestionStore } from '../../../../stores/suggestionStore';
import SuggestionCard from './SuggestionCard';

interface sampleCardProps {

}

const SampleCard = observer(({ }: sampleCardProps) => {

    return (<article className="sel-suggest-card">
        <div className="time">
            <h3>01:52:02</h3>
            <p>Vocalización 1</p>
            <span className="time-separator"></span>
        </div>
        <div className="card">
            <span className="arrow-left white"></span>
            <span className="play" onClick={() => ''}>
                <img className="play-img" src="./assets/tagging-section/play-audio.svg" height="20px" alt="" />
                <p> Reproducir muestra</p>
            </span>
            <p className="yellow-text">Se han encontrado 3 subespecies para esta muestra</p>
            <button className="yellow-btn">Revisar sugerencias</button>
            <section className="suggestions">
                {
                    suggestionStore.suggestionsArray.map((s, i) => {
                        return <SuggestionCard
                            percentage={s.percentage}
                            spectro={s.spectrogramImg}
                            position={i + 1}
                            sciname={s.scientificName}
                            commonName={s.commonName}
                            _color={s.color}
                            birdPhoto={s.birdPhoto}
                            coincidences={s.coincidences}
                        ></SuggestionCard>
                    })
                }
            </section>
        </div>
    </article>);
});

export default SampleCard;