import React, { Component } from 'react';
import { connect } from 'react-redux';
import assets from '../../assets';
import './style.scss';
import { handleUrlFeed, handleUrls } from './action.js';
import FeedContainer from '../../components/FeedContainer';

const defaultFeed = [
    'https://api.rss2json.com/v1/api.json?rss_url=http://sukhmanisakhi.com/feed/',
    'https://api.rss2json.com/v1/api.json?rss_url=https://aws.amazon.com/blogs/big-data/feed/'
]

class URLSwitch extends Component {
    constructor(props) {
        super(props);
        this.feedUrl = [];
        this.activeUrl = '';
    }

    isUrlValid = (url) => {
        return url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    }

    componentDidMount() {
        this.feedUrl = this.props.urlList && this.props.urlList.length > 0 ? this.props.urlList : defaultFeed
        this.props.history.push(`/hdfcLife?${this.feedUrl[0]}`)
    }

    handleUrlAdd = () => {
        if (this.inputUrl.value !== '' && this.isUrlValid(this.inputUrl.value)) {
            if (this.feedUrl.indexOf(this.inputUrl.value) < 0) {
                this.feedUrl.unshift(this.inputUrl.value)
                this.props.handleUrls(this.feedUrl)
            } 
            // else {
            //     window.alert('URL already exist')
            // }
            this.props.history.push(`/hdfcLife?${this.inputUrl.value}`)
        } else {
            this.inputUrl.value = ''
            window.alert('Please enter a valid url')
        }
        this.inputUrl.value = ''
    }

    handleUrlChange = (id) => {
        if (this.feedUrl.indexOf(this.activeUrl) !== id) {
            this.props.history.push(`/hdfcLife?${this.feedUrl[id]}`)
        }
    }

    handleUrlDelete = (index, e) => {
        e.stopPropagation();
        this.feedUrl.splice(index, 1)
        this.props.handleUrls(this.feedUrl)
        if (this.feedUrl.length > 0) {
            this.props.history.push(`/hdfcLife?${this.feedUrl[0]}`)
        } else {
            this.props.history.push('/hdfcLife')
        }
    }
    render() {
        this.activeUrl = this.props.history.location.search ? this.props.history.location.search.slice(1) : this.feedUrl[0] ? this.feedUrl[0] : null
        return (
            <>
                <div className="side-panel">
                    <div className="search-tab">
                        <form onSubmit={this.handleUrlAdd}>
                            <input type="text" placeholder="input URL" ref={inputUrl => this.inputUrl = inputUrl} />
                        </form>
                    </div>
                    <div className="search-icon" onClick={this.handleUrlAdd}>
                        <img src={assets.searchIcon} />
                    </div>
                    <hr />
                    <div className="url-list">
                        {this.feedUrl.length > 0 && this.feedUrl.map((url, index) => {
                            return (
                                <a title={url}><div key={index} className={`url ${this.feedUrl.indexOf(this.activeUrl) === index && 'active'}`} onClick={() => this.handleUrlChange(index)}>
                                    {url}
                                    <span onClick={(e) => this.handleUrlDelete(index, e)}>X</span>
                                </div></a>
                            )
                        })}
                    </div>
                </div>
                <div className="content-container">
                    <FeedContainer activeUrl={this.activeUrl} handleUrlFeed={this.props.handleUrlFeed} />
                </div>
            </>
        );
    }
}

export default connect(store => ({
    urlList: store.feeds && store.feeds && store.feeds.urlList
}), { handleUrlFeed, handleUrls })(URLSwitch)