import React from 'react';
import { observer } from 'mobx-react';

interface suggestionCardProps {
    percentage: any,
    spectro: any,
    position: any,
    sciname: any,
    commonName: any,
    birdPhoto: any,
    coincidences: any,
    audio: any,
    author: any,
    location: any,
    url: any,
    isPlaying: any
}

const SuggestionCard = observer(({ percentage,
    audio, author, location, url, isPlaying, spectro, position,
    sciname, commonName, birdPhoto, coincidences }: suggestionCardProps) => {
    return (<article className="suggested-specie">
        <span className="specie-card">
            <div className="percentage-title"
            >{percentage + '% DE COINCIDENCIA'}</div>
            <span className="info">
                <span className="spectrogram">
                    <img src={spectro} alt="" />
                </span>
                <div className="specie-card-down">
                    <div className="bird-info">
                        <span className="act-cont">
                            <div className="bird-photo-cont">
                                <img src={birdPhoto} alt="" />
                            </div>
                            <img src="./assets/tagging-section/vision.png" height="35px" alt="" />
                            <img src="./assets/tagging-section/play-audio.svg" height="30px" alt="" />
                        </span>
                        <div className="bird-text">
                            <div className="position-sci">
                                <h2 className="position">{'#' + position + '-'}</h2>
                                <h2 className="sci-name">{sciname}</h2>
                            </div>
                            <h2 className="common-name">{commonName}</h2>
                            <p className="maucalay">
                                Basado en registros de la librería Maucalay encontrados en eBird.
                    </p>
                            <p className="gray-text">© {author}
                                <a href={url} target='_blank'> <img src="./assets/tagging-section/visit-link.svg"
                                    alt="" /></a>
                            </p>
                            <p className="bold gray-text">{location}</p>
                        </div>
                    </div>

                    <div className="sug-actions">
                    </div>
                </div>
            </span>

        </span>

    </article>);
});

export default SuggestionCard;