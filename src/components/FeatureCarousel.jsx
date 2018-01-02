import React, { Component } from 'react';
import WpApi from 'wpapi';
import LPButton from "./LPButton";
import Spinner from "./Spinner";

export default class FeatureCarousel extends Component {

    constructor(props) {
        super(props);

        this.wp = new WpApi({endpoint: 'https://lp-mode.com/wp-json'});

        this.state = {
            index: -1,
            isInTransition: false,
        };

        this.populateFeaturedPosts = this.populateFeaturedPosts.bind(this);
        this.fetchFeaturedImage = this.fetchFeaturedImage.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.cancelCarouselInterval = this.cancelCarouselInterval.bind(this);
    }

    componentWillMount() {
        this.populateFeaturedPosts();
    }

    componentDidMount() {
        let intervalRef = setInterval(() => {
            let newIndex = (this.state.index + 1) % this.state.count;
            this.goToIndex(newIndex);
        }, 10000);
        this.setState({
            intervalRef: intervalRef,
        });
    }

    componentWillUnmount() {
        this.cancelCarouselInterval();
    }

    cancelCarouselInterval() {
        if (this.state.intervalRef) {
            clearInterval(this.state.intervalRef);
        }
    }

    handleScroll(event) {
        if(event.deltaY > 100 && !this.state.isInTransition) {
            let newIndex = (this.state.index + 1) % this.state.count;
            this.goToIndex(newIndex);
            this.cancelCarouselInterval();
        } else if (event.deltaY < -100 && !this.state.isInTransition) {
            let newIndex = this.state.index > 0 ? (this.state.index - 1) % this.state.count : this.state.count - 1;
            this.goToIndex(newIndex);
            this.cancelCarouselInterval();
        }
    }

    populateFeaturedPosts() {
        this.wp.tags().slug('featured').then((data) => {
            let tag = data[0];
            return this.wp.posts().tags(tag.id);
        }).then((posts) => {
            this.setState({
                posts: posts,
                count: posts.length,
                index: 0,
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidUpdate(previousProps, previousState) {
        if(previousState.index !== this.state.index) {
            this.fetchFeaturedImage();
        }
    }

    toggleFade(isVisible) {
        let feature = document.querySelector('.feature');
        feature.classList.toggle('fade-out', !isVisible);
        feature.classList.toggle('fade-in', isVisible);
    }

    fetchFeaturedImage() {
        this.wp.media().id(this.state.posts[this.state.index].featured_media).then((img) => {
            this.setState({
                image: img,
                isInTransition: false,
            });
            this.toggleFade(true);
        }).catch((error) => {
            console.log(error);
        });
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
        if(this.state.posts) {
            post = this.state.posts[this.state.index];
        }
        if(this.state.image) {
            imageUrl = this.state.image.media_details.sizes.full.source_url;
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
        this.toggleFade(false);
        this.setState({
            index: index,
            isInTransition: true,
        });
    }
}