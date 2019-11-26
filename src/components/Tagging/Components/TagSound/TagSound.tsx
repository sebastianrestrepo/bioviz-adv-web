import * as React from 'react';
import './_tagSound.scss';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { observer } from 'mobx-react';
import TagSuggestion from './TagSuggestion';
import tagStore from '../../../../stores/taggingStore';
import { suggestionStore } from '../../../../stores/suggestionStore';
import reportStore from '../../../../stores/reportStore';
import AsyncSelect from 'react-select/async';
import projectsStore from '../../../../stores/projectsStore';

const options = [
    { value: 'song', label: 'Canción' },
    { value: 'call', label: 'Llamado' },
    { value: 'alert', label: 'Alerta' }
]

const sex = [
    { value: 'male', label: 'Macho' },
    { value: 'female', label: 'Hembra' },
    { value: 'unknown', label: 'Desconocido' }
]



@observer
export class TagSound extends React.Component {

    handleSexChange = (newValue: any, actionMeta: any) => {
        let action = actionMeta.action;
        if (action == 'select-option') {
            tagStore.sex = newValue.value
        }

    };
    handleTypeChange = (newValue: any, actionMeta: any) => {
        let action = actionMeta.action;
        if (action == 'select-option') {
            tagStore.type = newValue.value
        }

    };
    handleSciChange = (newValue: any, actionMeta: any) => {

        let action = actionMeta.action;
        if (action == 'select-option') {
            tagStore.sciName = newValue.value
        }
    };

    render() {
        return <section className="tagging-section firstdisplay">
            <div className="card-header">
                <h3>Selección</h3>
                <img className="close-icon" src="./assets/gen-icons/dark-x-close.svg" alt="" />
            </div>
            <div className="spec">
                <img src="./assets/spectroSelected.png" alt="" />
            </div>
            <div className={(tagStore.isAiOn) ? 'suggestion-cont' : 'suggestion-cont undisplay'}>
                <div className="suggest-header">
                    <h1>Sugerencias del sistema</h1>
                </div>
                <div className="cards-cont">
                    {
                        suggestionStore.speciesSuggested.map((e, i) => {
                            const jsonData = JSON.stringify(e.otherSongs);
                            return <TagSuggestion
                                key={i}
                                sciName={e.sciName}
                                commonName={e.commonName}
                                order={e.order}
                                family={e.family}
                                gender={e.gender}
                                coincidence={e.coincidence}
                                mainAudioUrl={e.mainAudioUrl}
                                spectroImgUrl={e.spectroImgUrl}
                                birdPhoto={e.birdPhotoUrl}
                                otherSongs={jsonData} />
                        })
                    }
                    <span className="next-card">
                        <img src="./assets/tagging-section/right-arrow.svg" width="25px" alt="" />
                    </span>
                    <span className={(tagStore.isSomethingZoomed) ? "zoomed-spectro" : "zoomed-spectro undisplay"} >
                        <div className='spectro-card'>
                            <img className="spec-img" src={tagStore.zoomedSpeImgUrl} alt="" />

                            <span className="play" onClick={() => tagStore.playBirdSong(tagStore.zoomedSpeAudioUrl)}>
                                <img className="play-img" src="./assets/tagging-section/play-audio.svg" height="20px" alt="" />
                                <p className="_14px"> Reproducir canto</p>
                            </span>
                            <img className="close-img"
                                onClick={() => tagStore.onExitZoomView()}
                                src="./assets/gen-icons/dark-x-close.svg" alt="" />
                        </div>
                    </span>
                </div>
            </div>
            <div className="card-section">
                <div className="form-section">
                    <div className="card-item">
                        <span >¿Es alguna de las especies en estudio?</span>
                        <div className="imgs-array">
                            {
                                projectsStore.actualProject.species.map((e, i) => {
                                    return <span className="tooltip">
                                        <div className="bird-photo" onClick={() => tagStore.sciName = e.sciName}>
                                            <img src={e.photo} alt="" />
                                        </div>
                                        <span className="tooltiptext">{e.sciName}</span>
                                    </span>
                                })
                            }
                        </div>
                    </div>
                    <span className="input-row card-item name-specie">
                        <p className="text-title">Nombre común o científico:</p>
                        <CreatableSelect
                            className={'react-selector'}
                            isClearable
                            defaultValue={{value: tagStore.sciName, label: tagStore.onSciNameChange()}}
                            value={{value: tagStore.sciName, label: tagStore.onSciNameChange()}}
                            onChange={this.handleSciChange}
                            options={reportStore.scinamesOptions}
                            placeholder={'Escribe la especie'}
                        />
                    </span>
                    <span className='naming'>
                        <span className="input-row card-item">
                            <p className="text-title">Tipo de canto:</p>
                            <Select className={'react-selector'}
                                options={options}
                                onChange={this.handleTypeChange}
                                isClearable
                                isSearchable />
                        </span>
                        <span className="input-row card-item">
                            <p className="text-title">Sexo:</p>
                            <Select className={'react-selector'}
                                options={sex}
                                onChange={this.handleSexChange}
                                isClearable
                                isSearchable />
                        </span>

                    </span>
                    <p className={tagStore.isNoteActivated ? 'green-link card-item undisplay' : 'green-link card-item'}
                        onClick={() => tagStore.onNoteClick()}
                    >Agregar anotación o comentario</p>
                    <div className={tagStore.isNoteActivated ? 'card-item' : 'card-item undisplay'}>
                        <p className="text-title green-text">Anotación</p>
                        <textarea placeholder="Escribir anotación" name="" id="" ></textarea>
                    </div>
                </div>
                <div className="btn-actions">
                    <button className="green-button" onClick={() => tagStore.onSaveClick()}>Guardar en Listado</button>
                </div>
            </div>

        </section>
    }
}

