const feeds = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_FEED':
      return {
        ...state,
        urlFeeds: action.payload,
        error: false
      }

    case 'UPDATE_FEED_FAILED':
      return {
        ...state,
        urlFeeds: null,
        error: true
      }
      case 'UPDATE_URL':
      console.log('action.payload', action.payload)
      return {
        ...state,
        urlList: action.payload,
        urlFeeds: action.payload.length === 0 ? null : state.urlFeeds,
        error: action.payload.length > 0 && state.urlFeeds === null ? true : false
      }
    default:
      return state
  }
}

export default feeds