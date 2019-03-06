import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedContainer extends Component {
    componentWillReceiveProps(nextProps) {
        if(nextProps.activeUrl !== this.props.activeUrl && nextProps.activeUrl !== null){
        this.getFeeds(nextProps.activeUrl)}
    }
    componentDidMount() {
        this.getFeeds(this.props.activeUrl)
    }
    getFeeds = (url) => {
        this.props.handleUrlFeed(url)
    }
    createMarkup = (content) => { return { __html: content }; };
    render() {
        const { error, feeds } = this.props
        return (<>
            {!error ? <> <h1>{feeds && feeds.feed ? feeds.feed.url : 'Feeds not available'}</h1>
                <div className="feeds-container">
                    {feeds && feeds.items && feeds.items.map((feed, index) => {
                        return (<div key={index} className="feed-box">
                            {feed.title} - {feed.pubDate}
                            <div dangerouslySetInnerHTML={this.createMarkup(feed.content)} />
                        </div>)
                    })}
                </div> </> : <h1>Network Error</h1>}</>
        );
    }
}

export default connect(store => ({
    feeds: store && store.feeds && store.feeds.urlFeeds,
    error: store.feeds && store.feeds && store.feeds.error
}))(FeedContainer)
