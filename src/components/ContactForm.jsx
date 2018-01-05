import React, { Component } from 'react';
import {Helmet} from "react-helmet";

export default class ContactForm extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="blog-detail">
                <Helmet>
                    <title>Contact | LP Mode</title>
                    <link rel="canonical" href={`https://lp-mode.com/contact`}/>
                    <meta name="description" content="Shoot us a question, share your sewing/fashion story, or just get in touch!"/>
                </Helmet>
                <div className="blog-detail-header">
                    <h1 className="heading blog-title">Contact</h1>
                </div>
                <div className="blog-detail-body">
                    <div className="contact-wrapper">
                        <div className="contact-wrapper-blurb">
                            Reach out to Alyssa Lorraine and Pepper.
                            <br/>
                            Shoot us a question, share your sewing or fashion story, or just get in touch!
                        </div>
                        <div className="contact-wrapper-form">
                            <form action="https://formspree.io/lorraine@lp-mode.com" method="POST">
                                <input type="text" name="name" placeholder="Name"/>
                                <br/>
                                <input type="email" name="_replyto" placeholder="Email"/>
                                <br/>
                                <input type="text" name="_subject" placeholder="Subject" />
                                <br/>
                                <textarea placeholder="Message" name="message"/>
                                <input type="hidden" name="_next" value="/messagesent" />
                                <br/>
                                <input className="contact-wrapper-form-button" type="submit" value="Send"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}