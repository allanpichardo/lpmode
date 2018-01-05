import React, { Component } from 'react';
import moment from 'moment';
import Spinner from "./Spinner";
import FacebookProvider, { Like, Comments } from 'react-facebook';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import Utils from "../lib/Utils";
import Wordpress from "../lib/Wordpress";

export default class BlogDetail extends Component {

    constructor(props) {
        super(props);

        this.wp = Wordpress.getBaseWpInstance();

        this.state = {
            isNotFound: false,
        };

        this.renderNotFound = this.renderNotFound.bind(this);
        this.renderPost = this.renderPost.bind(this);
        this.renderTags = this.renderTags.bind(this);
        this.isPage = this.isPage.bind(this);
        this.renderAuthorAttribution = this.renderAuthorAttribution.bind(this);
    }

    isPage() {
        return !!this.props.match.params.pagename;
    }

    componentWillMount() {
        if(this.isPage()) {
            let name = this.props.match.params.pagename;
            this.wp.pages().slug(name).then((data) => {
                if(data.length > 0) {
                    let post = data[0];
                    this.setState({
                        post: post,
                        isNotFound: false,
                    });
                    return this.wp.users().id(post.author);
                } else {
                    this.setState({
                        isNotFound: true,
                    })
                }
            }).then((author) => {
                this.setState({
                    author: author,
                });
            }).catch((error) => {
                console.log(error);
            });
        } else {
            let slug = this.props.match.params.slug;
            this.wp.posts().slug(slug).then((data) => {
                if(data.length > 0) {
                    let post = data[0];
                    this.setState({
                        post: post,
                        isNotFound: false,
                    });
                    return this.wp.users().id(post.author);
                } else {
                    this.setState({
                        isNotFound: true,
                    })
                }
            }).then((author) => {
                this.setState({
                    author: author,
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    static getHumanDate(timestamp) {
        return moment(timestamp).format('MMMM Do YYYY');
    }

    renderTags() {
        if(this.state.tags) {
            let tagLinks = this.state.tags.map((tag) => {
                return (
                    <Link className="blog-detail-tags-link" key={tag.id} to={`/tag/${tag.slug}`} >{tag.name}</Link>
                )
            });
            return (
                <div className="blog-detail-tags">Tags: {tagLinks}</div>
            )
        } else {
            let tags = [];
            this.state.post.tags.forEach((id) => {
                this.wp.tags().id(id).then((data) => {
                    tags.push(data);
                    this.setState({
                        tags: tags,
                    })
                }).catch((error) => {
                    console.log(error);
                });
            });
        }
        return (<span className="invisible"/>);
    }

    render() {
        if(this.state.post && this.state.author) {
            if (this.state.isNotFound) {
                return this.renderNotFound();
            } else {
                return this.renderPost();
            }
        } else {
            return (<Spinner/>)
        }
    }

    renderNotFound() {
        return (
                <div className="blog-detail"/>
        );
    }

    renderPost() {
        let detailClass = this.isPage() ? "blog-detail-page" : "blog_detail";
        return (
            <div className={detailClass}>
                <Helmet>
                    <title>{this.state.post.title.rendered} | LP Mode</title>
                    <link rel="canonical" href={`https://lp-mode.com/${this.state.post.slug}`}/>
                    <meta name="description" content={Utils.stripHtml(this.state.post.excerpt.rendered)}/>
                    <meta property="og:title" content={`${this.state.post.title.rendered}`}/>
                    <meta property="og:site_name" content="LP Mode"/>
                    <meta property="og:type" content="article"/>
                    <meta property="og:description" content={Utils.stripHtml(this.state.post.excerpt.rendered)}/>
                </Helmet>
                <div className="blog-detail-header">
                    <h1 className="heading blog-title">{this.state.post.title.rendered}</h1>
                </div>
                <div className="blog-detail-share">
                    {this.renderFacebookLike()}
                </div>
                {this.renderTags()}
                <div className="blog-detail-body" dangerouslySetInnerHTML={{__html: this.state.post.content.rendered}}/>
                <div className="blog-detail-footer">
                    {this.renderAuthorAttribution()}
                </div>
                <div className="blog-detail-comments">
                    {this.renderFacebookComments()}
                </div>
            </div>
        )
    }

    renderAuthorAttribution() {
        if(!this.isPage()) {
            return (
                <h5><span>By {this.state.author.name}</span> on
                    <span>{BlogDetail.getHumanDate(this.state.post.date)}</span></h5>
            );
        } else {
            return (<div/>);
        }
    }

    renderFacebookComments() {
        if(!this.isPage()) {
            return (
                <FacebookProvider appId="140481659949883">
                    <Comments href={window.location.href}/>
                </FacebookProvider>
            );
        } else {
            return (<div/>);
        }
    }

    renderFacebookLike() {
        if(!this.isPage()) {
            return (
                <FacebookProvider appId="140481659949883">
                    <Like href={window.location.href} colorScheme="light" showFaces share/>
                </FacebookProvider>
            );
        } else {
            return(<div className="invisible"/>);
        }
    }
}