import React from 'react';
import { observer } from 'mobx-react';

interface specieRowProps {
    sciName: string;
    commonName: boolean;
    family: string;
    order: string;
    index: any
}

const SpecieRow = observer(({ sciName, commonName, index, order, family }: specieRowProps) => {

    return (
        <tr >
            <td className="gray-cell">{index + 1}</td>
            <td className="blank-cell">{order}</td>
            <td className="blank-cell">{family}</td>
            <td className="blank-cell">{sciName}</td>
            <td className="blank-cell">{commonName}</td>
            <td className="blank-cell">0</td>
            <td className="blank-cell">0</td>
            <td className="blank-cell">0</td>
            <td className="blank-cell">0</td>
            <td className="blank-cell">0</td>
            <td className="blank-cell">0</td>
            <td className="blank-cell">0</td>
    
        </tr>
    );
});

export default SpecieRow;