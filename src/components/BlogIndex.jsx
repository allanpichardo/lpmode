import React, { Component } from 'react';
import Spinner from "./Spinner";
import PostCard from "./PostCard";
import SearchBar from "./SearchBar";
import {Helmet} from "react-helmet";
import Wordpress from "../lib/Wordpress";

export default class BlogIndex extends Component {

    constructor(props) {
        super(props);

        this.wp = Wordpress.getBaseWpInstance();

        this.state = {
            posts: [],
            page: 1,
            isTutorial: !!this.props.location && this.props.location.pathname === '/tutorials',
            perPage: 20,
            isLoading: false,
            title: "Blog | LP Mode",
            tutorialsId: Wordpress.tutorialsId,
        };

        this.renderPosts = this.renderPosts.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleScrolledToBottomOfPage = this.handleScrolledToBottomOfPage.bind(this);
        this.hasTag = this.hasTag.bind(this);
        this.getSlug = this.getSlug.bind(this);
        this.saveAndDisplayPosts = this.saveAndDisplayPosts.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentWillMount() {
        this.populatePosts(this.state.perPage, this.state.page);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScrolledToBottomOfPage);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrolledToBottomOfPage);
    }

    hasTag() {
        return !!this.props.match.params.tagslug;
    }

    getSlug() {
        return this.props.match.params.tagslug;
    }

    populatePosts(perPage, page) {
        this.setState({
            isLoading: true,
        }, () => {
            if(this.state.tutorialsId) {
                this.queryForPosts(this.state.tutorialsId, perPage, page);
            } else {
                this.wp.categories().slug('tutorials').then((results) => {
                    let tutorialsId = 0;
                    if(results.length > 0) {
                        tutorialsId = results[0].id;
                    }
                    this.setState({
                        tutorialsId: tutorialsId,
                    });
                    this.queryForPosts(tutorialsId, perPage, page);
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }

    queryForPosts(tutorialsId, perPage, page) {
        if (!this.state.isTutorial) {
            const query = this.wp
                .posts()
                .excludeCategories(tutorialsId)
                .perPage(perPage)
                .page(page)
                .order('desc').orderby('date');

            if (this.hasTag()) {
                this.setState({
                    title: `Tag: ${this.getSlug()} | LP Mode`,
                });
                this.wp.tags().slug(this.getSlug()).then((results) => {
                    return query.tags(results[0].id);
                }).then((data) => {
                    this.saveAndDisplayPosts(data);
                }).catch((error) => {
                    this.handleError(error);
                });
            } else {
                this.setState({
                    title: `Blog | LP Mode`,
                });
                query.then((data) => {
                    this.saveAndDisplayPosts(data);
                }).catch((error) => {
                    this.handleError(error);
                });
            }
        } else {
            this.setState({
                title: `Tutorials | LP Mode`,
            });
            this.wp
                .posts()
                .categories(tutorialsId)
                .perPage(perPage)
                .page(page)
                .order('desc').orderby('date')
                .then((data) => {
                    this.saveAndDisplayPosts(data);
                }).catch((error) => {
                    this.handleError(error);
                });
        }
    }

    handleError(error) {
        console.log(error);
        this.setState({
            isLoading: false,
        });
    }

    saveAndDisplayPosts(data) {
        let currentPosts = this.state.posts.slice();
        let combined = currentPosts.concat(data);
        this.setState({
            posts: combined,
            isLoading: false,
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.page < this.state.page) {
            return false;
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.page > prevState.page) {

            this.populatePosts(this.state.perPage, this.state.page);
        }
    }

    renderPosts() {
        let postcards = this.state.posts.map((post) => {
            return (
                <PostCard key={post.id} post={post}/>
            )
        });
        return (
            <div className="blog-index">
                <Helmet>
                    <title>{this.state.title}</title>
                    <link rel="canonical" href={`https://lp-mode.com${this.props.location.pathname}`} />
                    <meta property="og:title" content={`${this.state.title}`}/>
                    <meta property="og:site_name" content="LP Mode"/>
                </Helmet>
                <div className="blog-index-search">
                    <SearchBar placeholder="Search..." onClear={this.handleClear} onSearch={(term) => this.handleSearch(term)}/>
                </div>
                <div className="blog-index-posts">
                    {postcards}
                </div>
            </div>
        )
    }

    render() {
        if(!this.state.isLoading || this.state.posts.length > 0) {
            return this.renderPosts();
        } else {
            return (<Spinner/>)
        }
    }

    handleSearch(term) {
        this.wp.posts().search(term).then((results) => {
            this.setState({
                posts: results,
                page: 1,
            })
        }).catch((error) => {
            this.handleError(error);
        });
    }

    handleClear() {
        this.setState({
            posts: [],
            page: 1,
        }, () => {
            this.populatePosts(this.state.perPage, this.state.page);
        });
    }

    handleScrolledToBottomOfPage() {
        let d = document.querySelector('.blog-index-posts');
        if(d) {
            let offset = document.documentElement.scrollTop + window.innerHeight;
            let height = d.offsetHeight;

            if (offset >= height && !this.state.isLoading) {
                let page = this.state.page + 1;
                this.setState({
                    page: page,
                    isLoading: true,
                });
            }
        }
    }
}