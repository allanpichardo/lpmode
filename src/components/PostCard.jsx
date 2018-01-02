import React, { Component } from 'react';
import BlogDetail from "./BlogDetail";
import {Link} from "react-router-dom";
import WpApi from 'wpapi';

export default class PostCard extends Component {

    constructor(props) {
        super(props);

        this.wp = WpApi({endpoint: 'https://lp-mode.com/wp-json'});

        this.state = {
            bgImage: '',
        };
    }

    componentWillMount() {
        let post = this.props.post;
        if(post.featured_media > 0) {
            this.wp.media().id(post.featured_media).then((media) => {
                let mediumImage = media.media_details.sizes.shop_catalog.source_url;
                this.setState({
                    bgImage: mediumImage,
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <Link to={`/blog/${this.props.post.slug}`} className="blog-index-post-item" style={{backgroundImage: `url(${this.state.bgImage})`}}>
                <div className="post-card-container">
                    <h3>{this.props.post.title.rendered}</h3>
                    <h5>{BlogDetail.getHumanDate(this.props.post.date)}</h5>
                    <div className="post-card-excerpt" dangerouslySetInnerHTML={{__html: this.props.post.excerpt.rendered}}/>
                </div>
            </Link>
        )
    }
}