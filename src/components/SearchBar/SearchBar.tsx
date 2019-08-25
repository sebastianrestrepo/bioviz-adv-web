import React, { Component } from 'react';
import './_SearchBar.scss'
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable } from 'mobx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import onClickOutside from 'react-onclickoutside'

interface SearchBarProps {
    history: any
}

@observer class SearchBar extends Component {

    @observable searchBarClicked: boolean = false;

    constructor(props: any) {
        super(props);

    }

    render() {
        return (<div className="search-bar">
            <input className="search-txt" name="" placeholder="Buscar Proyectos"
                onFocus={() => {
                    this.searchBarClicked = true;
                }}
                onBlur={()=>{
                    this.searchBarClicked = false;
                }}
                style={{
                    backgroundColor: this.searchBarClicked
                        ? '#F4F4F4'
                        : '#E5E5E5',
                    borderColor: this.searchBarClicked
                        ? '#E5E5E5'
                        : 'rgba(0,0,0,0)',
                    borderStyle: this.searchBarClicked
                        ? 'solid'
                        : '',
                    borderWidth: this.searchBarClicked
                        ? '1.3px'
                        : '',
                }} />
            <button className="search-btn">Buscar</button>
        </div>);
    }
}

export default observer(SearchBar);