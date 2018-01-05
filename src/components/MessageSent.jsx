import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class MessageSent extends Component {

    render() {
        return (
            <div className="blog-detail">
                <div className="blog-detail-header">
                    <h1 className="heading blog-title">Contact</h1>
                </div>
                <div className="blog-detail-body">
                    <div className="messagesent">
                        <h3>Thanks!</h3>
                        <p>We'll be in touch soon.</p>
                        <Link to="/blog">Back to the blog.</Link>
                    </div>
                </div>
            </div>
        )
    }
}