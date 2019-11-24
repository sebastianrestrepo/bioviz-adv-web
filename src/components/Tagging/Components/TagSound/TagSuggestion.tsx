import React, { Component } from 'react';
import { observer } from 'mobx-react';
import tagStore from '../../../../stores/taggingStore';

interface tagSuggestionProps {
    sciName: string;
    commonName: string;
    order: string;
    family: string;
    gender: string;
    coincidence: number;
    mainAudioUrl: string;
    spectroImgUrl: string;
    birdPhoto: string;
    otherSongs: string;
}

class TagSuggestion extends Component<tagSuggestionProps> {
    songsData = JSON.parse(this.props.otherSongs);
    constructor(props: any) {
        super(props);
    }
    render() {
        return <div className={(tagStore.isAiOn) ? 'suggest-card-cont firstdisplay' : 'suggest-card-cont undisplay firstdisplay'}>

            <div className="ai-section">
                <div className="column-wrapper">
                    <div className="coincidence-header">
                        <h2>{this.props.coincidence}% DE COINCIDENCIA TOTAL</h2>
                    </div>
                    <span className="main-spec">
                        <img className="spec-img" src={this.props.spectroImgUrl} alt="" />
                        <img className="lens-img"
                            onClick={() => tagStore.onSpecZoomView(this.props.spectroImgUrl, this.props.mainAudioUrl)}
                            src="./assets/tagging-section/lens.svg" alt="" />
                    </span>
                </div>
                <div className="row suggestion-info">
                    <div className="bird-info">
                        <div className="row">
                            <div className="bird-photo-cont">
                                <img src={this.props.birdPhoto} alt="" />
                            </div>
                            <h3 className="yellow-text">#1</h3>
                        </div>
                        <p className="sci-name-style gray-text _12px">{this.props.order} > {this.props.family} </p>
                        <p className="bold  _14px">{this.props.commonName}</p>
                        <p className="sci-name-style gray-text _14px">{this.props.sciName}</p>

                        <div className="suggestion-actions">

                            <span className="match-perc">
                                <span className="play" onClick={() => tagStore.playBirdSong(this.props.mainAudioUrl)}>
                                    <img className="play-img" src="./assets/tagging-section/play-audio.svg"
                                        height="25px" alt="" />
                                    <p> Reproducir canto</p>
                                    {/*(!tagStore.isPlaying) ?  <img className="play-img" src="./assets/tagging-section/play-audio.svg"
                                        height="25px" alt="" />  :  <img className="play-img" src="./assets/tagging-section/pause.svg"
                                    height="25px" alt="" /> */}

                                </span>
                                <div className="actions-wrapper">
                                    <span className="action-btn">
                                        <span className="tooltip">
                                            <img src="./assets/tagging-section/tick.png"
                                                onClick={() => tagStore.updateMark()}
                                                height="20px"
                                                width="20px" alt="" />
                                            <span className="tooltiptextUp">Validar sugerencia</span>
                                        </span>
                                    </span>
                                    <span className="action-btn">
                                        <span className="tooltip">
                                            <img src="./assets/tagging-section/question.svg"
                                                onClick={() => tagStore.updateMark()}
                                                height="20px"
                                                width="20px" alt="" />
                                            <span className="tooltiptextUp">Pedir opinión a la comunidad</span>
                                        </span>
                                    </span>
                                    <span className="action-btn">
                                        <span className="tooltip">
                                            <img src="./assets/tagging-section/cancel.png" height="20px" width="20px" alt="" />
                                            <span className="tooltiptextUp">No es esta especie</span>
                                        </span>
                                    </span>

                                </div>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
            <div className="card-section ai-sources">
                <p className={(tagStore.isUnfoldedReference) ? 'unfolded' : ''}
                    onClick={() => tagStore.onDisplayOtherSings()}>
                    <span className="arrow-down"></span>
                    Ver otros cantos de esta especie encontrados en eBird:</p>
                {
                    (tagStore.isUnfoldedReference) ? <span className="row">
                        {
                            this.songsData.map((song) => {
                                return <article className="spec">
                                    <img className="spectro-img" src={song.spectroImgUrl} height="150px" alt="" />
                                    <span className="play" onClick={() => tagStore.playBirdSong(song.audioUrl)}>
                                        <img className="play-img" src="./assets/tagging-section/play-audio.svg" height="20px" alt="" />
                                        <p className="_14px"> Reproducir canto</p>
                                    </span>
                                    <p className=" _14px">{song.location}</p>
                                    <p className="gray-text _14px">{song.owner}</p>
                                    <img className="lens-img"
                                        onClick={() => tagStore.onSpecZoomView(song.spectroImgUrl, song.audioUrl)}
                                        src="./assets/tagging-section/lens.svg" alt="" />
                                </article>
                            })
                        }
                    </span> : ''
                }

            </div>
        </div>

    }


};

export default observer(TagSuggestion);