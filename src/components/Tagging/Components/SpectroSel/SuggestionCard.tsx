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
        <span className="tooltip exploreaction">
            <img src="./assets/Tagging/vision.png" height="auto" width="45px" alt="" />
            <span className="tooltiptextUp">Explorar canto</span>
        </span>
        <span className="tooltip play-audio">
            <img src="./assets/Tagging/play-audio.svg" height="auto" width="35px" alt=""
            />
            <span className="tooltiptextUp">Reproducir canto</span>
        </span>
        <span className="specie-card">
            <div className="percentage-title"
                style={{
                    backgroundColor: '#44cd88',
                }}>{percentage + '% DE COINCIDENCIA'}</div>
            <img className="spectrogram" src={spectro} alt=""
                style={{
                    border: 'solid 3px ' + '#44cd88',
                }} />
            <div className="specie-card-down">
                <div className="bird-info">
                    <img className="bird-photo" src={birdPhoto} alt="" />
                    <div className="bird-text">
                        <div className="position-sci">
                            <h2 className="position">{'#' + position + '-'}</h2>
                            <h2 className="sci-name">{sciname}</h2>
                        </div>
                        <h2 className="common-name">{commonName}</h2>
                    </div>
                </div>
                <p className="coincidence" style={{
                    color: _color,
                }}>{coincidences}</p>
            </div>
        </span>

    </article>);
});

export default SuggestionCard;