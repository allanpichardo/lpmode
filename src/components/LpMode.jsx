import React, { Component } from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Header from "./Header";
import FeatureCarousel from "./FeatureCarousel";
import NavPanel from "./NavPanel";
import BlogDetail from "./BlogDetail";
import {Helmet} from "react-helmet";
import BlogIndex from "./BlogIndex";
import ContactForm from "./ContactForm";
import MessageSent from "./MessageSent";

export default class LpMode extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isCartOpen: false,
        };

        this.handleNavToggle = this.handleNavToggle.bind(this);
        this.handleClickOutsideNav = this.handleClickOutsideNav.bind(this);
    }

    handleNavToggle(isToggled) {
        let nav = document.querySelector('.sidebar-nav');
        nav.classList.toggle('sidebar-open', isToggled);
        this.setState({
            isNavOpen: isToggled,
        });
    }

    handleCartToggle(isToggled) {
        let cart = document.querySelector('.sidebar-cart');
        cart.classList.toggle('sidebar-open', isToggled);
        this.setState({
            isCartOpen: isToggled,
        })
    }

    handleClickOutsideNav() {
        let navButton = document.querySelector('#nav button');
        navButton.click();
    }

    render() {
        return (
            <Router>
                <div className="main-wrapper">
                    <Helmet>
                        <title>LP Mode</title>
                    </Helmet>
                    <Header
                        onNavToggle={(isToggled) => {this.handleNavToggle(isToggled)}}
                        onCartToggle={(isToggled) => {this.handleCartToggle(isToggled)}}
                    />
                    <div className="sidebar sidebar-nav">
                        <NavPanel isOpen={this.state.isNavOpen} onClickOutside={this.handleClickOutsideNav}/>
                    </div>
                    <div className="sidebar sidebar-cart"></div>
                    <div className="content">
                        <Route exact={true} path="/wp-login.php" onEnter={()=>{window.location.reload()}}/>
                        <Route exact={true} path="/" component={FeatureCarousel}/>
                        <Route exact={true} path="/blog" component={BlogIndex}/>
                        <Route exact path="/blog/:slug" component={BlogDetail}/>
                        <Route exact={true} path="/tag/:tagslug" component={BlogIndex}/>
                        <Route exact={true} path="/tutorials" component={BlogIndex}/>
                        <Route exact={true} path="/tutorials/:slug" component={BlogDetail}/>
                        <Route path="/pages/:pagename" component={BlogDetail}/>
                        <Route path="/contact" component={ContactForm}/>
                        <Route path="/messagesent" component={MessageSent}/>
                    </div>
                </div>
            </Router>
        );
    }

}
