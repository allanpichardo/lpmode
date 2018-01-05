import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class NavPanel extends Component {

    constructor(props) {
        super(props);

        this.outsideClickListener = this.outsideClickListener.bind(this);
    }

    outsideClickListener(event) {
        if (!event.target.closest('.navlist')) {
            if(this.props.onClickOutside) {
                this.props.onClickOutside();
            }
        }
    }

    componentDidUpdate() {
        if(this.props.isOpen) {
            document.addEventListener('click', this.outsideClickListener)
        } else {
            document.removeEventListener('click', this.outsideClickListener)
        }
    }

    render() {
        return (
            <div className="navlist">
                <div className="navlist-links">
                    <ul>
                        <li><NavLink exact to="/" className="navLink" activeClassName="activeNavLink" onClick={this.props.onClickOutside} >Home</NavLink></li>
                        {/*<li><NavLink to="/shop" className="navLink" activeClassName="activeNavLink" onClick={this.props.onClickOutside}>Shop</NavLink></li>*/}
                        <li><NavLink to="/blog" className="navLink" activeClassName="activeNavLink" onClick={this.props.onClickOutside}>Blog</NavLink></li>
                        <li><NavLink to="/tutorials" className="navLink" activeClassName="activeNavLink" onClick={this.props.onClickOutside}>Tutorials</NavLink></li>
                        <li><NavLink to="/pages/about" className="navLink" activeClassName="activeNavLink" onClick={this.props.onClickOutside}>About</NavLink></li>
                        <li><NavLink to="/contact" className="navLink" activeClassName="activeNavLink" onClick={this.props.onClickOutside}>Contact</NavLink></li>
                    </ul>
                </div>
                <div className="navlist-social"></div>
            </div>
        );
    }

}