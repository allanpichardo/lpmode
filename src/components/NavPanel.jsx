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
                <div className="navlist-social">
                    <a href="https://www.facebook.com/lpmodestudio" target="_blank" rel="noopener noreferrer"><i alt="Facebook" className="fa fa-facebook-square"/></a>
                    <a href="https://www.instagram.com/lpmodestudio" target="_blank" rel="noopener noreferrer"><i alt="Instagram" className="fa fa-instagram"/></a>
                    <a href="https://www.pinterest.com/lpmodestudio" target="_blank" rel="noopener noreferrer"><i alt="Pinterest" className="fa fa-pinterest"/></a>
                </div>
            </div>
        );
    }

}