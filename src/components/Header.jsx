import React, { Component } from 'react';
import ToggleButton from "./ToggleButton";
import logo from '../images/logo_rectangle.svg';
import {Link} from "react-router-dom";

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleNavToggle = this.handleNavToggle.bind(this);
    }

    render() {
        return (
            <div className="header">
                <div className="header-menu">
                    <ToggleButton id="nav" imageOff="menu" imageOn="close" onToggle={(isToggled) => {this.handleNavToggle(isToggled)}}/>
                </div>
                <div className="header-title">
                    <Link to="/"><img alt="LP Mode" src={logo}/></Link>
                </div>
                <div className="header-cart">
                    <ToggleButton id="crt" imageOff="shopping_cart" imageOn="close" onToggle={(isToggled) => {this.handleCartToggled(isToggled)}}/>
                </div>
            </div>
        );
    }

    handleNavToggle(isToggled) {
        if(this.props.onNavToggle) {
            this.props.onNavToggle(isToggled);
        }
        document.querySelector('#nav').classList.toggle('inverted', isToggled);
    }

    handleCartToggled(isToggled) {
        if(this.props.onCartToggle) {
            this.props.onCartToggle(isToggled);
        }
        document.querySelector('#crt').classList.toggle('inverted', isToggled);
    }
}