import React from 'react';
import { observer } from 'mobx-react';

interface suggestionCardProps {
    percentage: any,
    spectro: any,
    position: any,
    sciname: any,
    commonName: any,
    _color: any,
    birdPhoto: any,
    coincidences: any
}

const SuggestionCard = observer(({ percentage, spectro, position, sciname, commonName, _color, birdPhoto, coincidences }: suggestionCardProps) => {

    return (<article className="suggested-specie">
        <span className="specie-card">
            <div className="percentage-title"
            >{percentage + '% DE COINCIDENCIA'}</div>
            <span className="info">
                <span className="spectrogram"></span>
                <div className="specie-card-down">
                    <div className="bird-info">
                        <div className="bird-photo-cont">
                            <img src={birdPhoto} alt="" />
                        </div>
                        <div className="bird-text">
                            <div className="position-sci">
                                <h2 className="position">{'#' + position + '-'}</h2>
                                <h2 className="sci-name">{sciname}</h2>
                            </div>
                            <h2 className="common-name">{commonName}</h2>
                        </div>
                    </div>
                    <p>
                        Basado en registros de la librería Maucalay encontrados en eBird.
                    </p>
                    <div className="sug-actions">
                            <img className="play-img" src="./assets/tagging-section/play-audio.svg" height="30px" alt="" />
                            <img src="./assets/tagging-section/vision.png" height="35px" alt="" />
                    </div>
                </div>
            </span>

        </span>

    </article>);
});

export default SuggestionCard;