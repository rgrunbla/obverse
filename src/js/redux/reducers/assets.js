const initialState = {
  avatars: {}
};

export default function(state = initialState, action) {
  switch (action.type) {

    case 'AVATAR':
    console.log("Data:")
    console.log(action.avatar_data);
    return Object.assign({}, state, {
      ...state,
      avatars: {
          ...state.avatars,
          [action.avatar_id]: { jid: action.user_jid, data: action.avatar_data }
      }
    });


    default:
    return state;
  }
}
