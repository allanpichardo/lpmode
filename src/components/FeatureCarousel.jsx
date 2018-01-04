import React, { Component } from 'react';
import WpApi from 'wpapi';
import LPButton from "./LPButton";
import Spinner from "./Spinner";
import Wordpress from "../lib/Wordpress";

export default class FeatureCarousel extends Component {

    constructor(props) {
        super(props);

        this.wp = Wordpress.getBaseWpInstance();

        this.state = {
            index: -1,
            isInTransition: false,
        };

        this.populateFeaturedPosts = this.populateFeaturedPosts.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
    }

    componentWillMount() {
        this.populateFeaturedPosts();
    }

    handleScroll(event) {
        if(event.deltaY > 200 && !this.state.isInTransition) {
            let newIndex = (this.state.index + 1) % this.state.count;
            this.goToIndex(newIndex);
        } else if (event.deltaY < -200 && !this.state.isInTransition) {
            let newIndex = this.state.index > 0 ? (this.state.index - 1) % this.state.count : this.state.count - 1;
            this.goToIndex(newIndex);
        }
    }

    populateFeaturedPosts() {
        Wordpress.getFeaturedPosts().then((posts) => {
            this.setState({
                posts: posts,
                count: posts.length,
                index: 0,
            });

            let promises = [];
            posts.forEach((post) => {
                promises.push(this.wp.media().id(post.featured_media));
            });

            return Promise.all(promises);
        }).then((media) => {
            console.log(media);
            this.setState({
                media: media,
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidUpdate(previousProps, previousState) {

    }
    getDots(selectionIndex, count) {
        let indexes = [];
        for(let i = 0; i < count; ++i) {
            indexes.push(i);
        }

        return indexes.map((index) => {
            let className = index === selectionIndex ? 'current' : '';
            return (<li key={index.toString()} className={className}><a href="#" onClick={()=>{this.goToIndex(index)}}>{index}</a></li>)
        })
    }

    render() {
        let post = null;
        let imageUrl = '';
        if(this.state.posts && this.state.media) {
            post = this.state.posts[this.state.index];
            imageUrl = this.state.media[this.state.index].media_details.sizes.large.source_url;
        }

        return !!post ? (
            <div className="feature" style={{backgroundImage: `url(${imageUrl})`}} onWheel={this.handleScroll}>
                <div className="feature-heading heading" dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
                <div className="feature-subheading" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
                <div className="feature-action">
                    <LPButton text="Read more" href={`/blog/${post.slug}`} />
                </div>
                <div className="feature-dots">
                    <div className="dotstyle dotstyle-fillup dotstyle-drawcircle">
                        <ul>
                            {this.getDots(this.state.index, this.state.count)}
                        </ul>
                    </div>
                </div>
            </div>
        ) :  (<Spinner/>)
    }

    goToIndex(index) {
        this.setState({
            index: index,
            isInTransition: true,
        }, () => {
            setTimeout(() => {
                this.setState({
                    isInTransition: false,
                }, () => {
                });
            }, 1000);
        });
    }
}