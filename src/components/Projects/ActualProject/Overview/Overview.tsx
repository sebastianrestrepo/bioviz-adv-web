import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './_overview.scss'

class Overview extends Component {

    constructor(props: {}) {
        super(props);
    }

    render() {
        return <section className="overview-cont">
            <div className="overview-cols left">
                <div className="progress"></div>
                <div className="tag"></div>

            </div>
            <div className="overview-cols right">
                <div className="location">
                    <h3>Zona de estudio:</h3>
                    <img src="./assets/create-projects/map.png" alt="" />
                </div>
                <div className="species"></div>
            </div>
        </section>
    }
}

export default observer(Overview);