import axios from 'axios';
// export const UPDATE_FEED = 'UPDATE_FEED';

export function handleUrlFeed(url) {
    return (dispatch)=> {
        axios.get(url)
            .then(response => {
                dispatch({
                    type: 'UPDATE_FEED',
                    payload: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'UPDATE_FEED_FAILED',
                    payload: error
                });
            })
    }
}

export function handleUrls(urlList) {
    return (dispatch)=>dispatch({
        type: 'UPDATE_URL',
        payload: urlList
    });
    // return (dispatch)=> {
    //     axios.get(url)
    //         .then(response => {
    //             dispatch({
    //                 type: 'UPDATE_FEED',
    //                 payload: response.data
    //             });
    //         })
    // }
}