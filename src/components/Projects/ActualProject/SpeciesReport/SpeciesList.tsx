import * as React from 'react';
import { observer } from 'mobx-react';
import reportStore from '../../../../stores/reportStore';
import SpecieRow from './SpecieRow';
import './_speciesReport.scss';

@observer
export class SpeciesList extends React.Component {

    constructor(props) {
        super(props);
        reportStore.onRetrieveSpeciesList();
    }

    downloadCsvFile = () => {
        const element = document.createElement("a");
        const file = new Blob([], { type: 'text/plain' });
        element.href = reportStore.fileUri;
        element.download = reportStore.listFileName + ".csv";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    render() {

        return <div className="species-list-cont">
            <div className="list-header">
                <h1>Listado de especies</h1>
                <button className="green-button" onClick={() => {
                    reportStore.onDownloadList();
                    (reportStore.convertionDone) ? this.downloadCsvFile()
                        : console.log()
                }}>
                    Descargar
                    </button>

            </div>

            <div className="hack1">
                <div className="hack2">
                <table>
                <thead>
                    <tr>
                        <th className="gray-cell"></th>
                        <th>Orden</th>
                        <th>Familia</th>
                        <th>Nombre científico</th>
                        <th>Nombre común</th>
                        <th>Tiempo inicio</th>
                        <th>Tiempo final</th>
                        <th>Fecha</th>
                        <th>País</th>
                        <th>Estado</th>
                        <th>Lugar</th>
                        <th>Coordenadas</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reportStore.speciesList.map((data, i) => {
                            return <SpecieRow key={i}
                                index={i}
                                sciName={data.sciName}
                                commonName={data.commonName}
                                family={data.family}
                                order={data.order}></SpecieRow>
                        })
                    }
                </tbody>

            </table>
                </div>
            </div>
         
        </div>
    }
}