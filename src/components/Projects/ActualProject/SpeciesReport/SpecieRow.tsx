import React from 'react';
import { observer } from 'mobx-react';

interface specieRowProps {
    sciName: string;
    commonName: boolean;
    index: any
}

const SpecieRow = observer(({ sciName, commonName, index }: specieRowProps) => {

    return (
        <tr >
            <td className="gray-cell">{index + 1}</td>
            <td className="blank-cell">Orden</td>
            <td className="blank-cell">Familia</td>
            <td className="blank-cell">Género</td>
            <td className="blank-cell">{sciName}</td>
            <td className="blank-cell">{commonName}</td>
            <td className="blank-cell">0</td>
        </tr>
    );
});

export default SpecieRow;