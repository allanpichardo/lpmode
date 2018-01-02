import React, { Component } from 'react';

export default class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleSearchClick() {
        if(this.input.value === '') {
            this.handleClear();
            return;
        }

        if(this.props.onSearch) {
            this.props.onSearch(this.input.value)
        }
    }

    handleClear() {
        if(this.props.onClear) {
            this.props.onClear();
        }
    }

    handleFocus(isFocused) {
        this.input.classList.toggle('searchbox-input-focused', isFocused);
    }

    render() {
        return (
            <div className="searchbox">
                <input className="searchbox-input" onBlur={()=>{this.handleFocus(false)}} onFocus={()=>{this.handleFocus(true)}} ref={(input) => {this.input = input}} onInput={(e) => {if(e.target.value === '') this.handleClear()}} type="search" placeholder={this.props.placeholder} onKeyUp={(e) => {if(e.keyCode === 13) this.handleSearchClick()}}/>
                <button onClick={this.handleSearchClick}><i className="material-icons">search</i></button>
            </div>
        )
    }
}