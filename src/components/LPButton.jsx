import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class LPButton extends Component {

    render() {
        return (
            <Link className="lpbutton" to={this.props.href}>{this.props.text}</Link>
        );
    }

}