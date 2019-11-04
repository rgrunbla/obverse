const initialState = {
  api: null,
  isConnected: false,
  avatars_urls: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'CONNECTED':
    console.log("CONNECTED");
    return Object.assign({}, state, {
      ...state,
      isConnected: true
    });

    case 'INIT_API':
    return Object.assign({}, state, {
      ...state,
      api: action.api,
    });


    case 'AVATAR_URL':
    return Object.assign({}, state, {
      ...state,
      avatars_urls: {
        ...state.avatars_urls,
        [action.user_jid]: {
          id: action.avatar_id,
          url: action.avatar_url
        }
      }
    });

    default:
    return state;
  }
}
