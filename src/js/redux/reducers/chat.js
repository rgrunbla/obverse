const initialState = {
  connection: null,
  isConnected: false,
  bookmarks: {},
  groupchat: {},
  groupchat_config: {
    active: null
  },
  groupchat_ids: {}
};

export default function(state = initialState, action) {
  switch (action.type) {

    case 'GROUPCHAT_ACTIVE':
    console.log("GROUPCHAT_ACTIVE");
    return Object.assign({}, state, {
      ...state,
      groupchat_config: {
        ...state.groupchat_config,
        active: action.jid,
        [action.jid]: {
          ...state.groupchat_config[action.jid],
          unread: 0
        }
      }
    });


    case 'STORE_BOOKMARK':
    return Object.assign({}, state, {
      ...state,
      bookmarks: {
        ...state.bookmarks,
        [action.jid]: {
          jid: action.jid,
          name: action.name,
          autojoin: action.autojoin,
          nick: action.nick,
        }
      }
    });

    case 'GROUPCHAT_MESSAGE':
    let groupchatExists = (typeof state.groupchat_ids[action.room]) != "undefined";
    var groupchat_id = null;
    var unread_count = (state.groupchat_config[action.room] && state.groupchat_config[action.room].unread) || 0;
    var count = null;
    var filtered = null;
    let visible = (action.room === state.groupchat_config.active);

    if(!visible) {
      unread_count += 1;
    }

    if(groupchatExists) {
      if (!state.groupchat_ids[action.room].includes(action.id)) {
        groupchat_id = state.groupchat_ids[action.room].concat(action.id).slice(-30);
      } else {
        return state;
      }
      filtered = Object.keys(state.groupchat[action.room])
      .filter(key => groupchat_id.includes(key))
      .reduce((obj, key) => {
        obj[key] = state.groupchat[action.room][key];
        return obj;
      }, {});
    } else {
      groupchat_id = [action.id];
    }

    return Object.assign({}, state, {
      ...state,
      groupchat: {
        ...state.groupchat,
        [action.room]: {
          ...filtered,
          [action.id]: {date: action.date,  id: action.id, author: action.author, textContent: action.textContent}
        }
      },

      groupchat_ids: {
        ...state.groupchat_ids,
        [action.room]: groupchat_id,
      },

      groupchat_config: {
        ...state.groupchat_config,
        [action.room]: {
          ...state.groupchat_config[action.room],
          unread: unread_count
        }
      }
    });

    case 'GROUPCHAT_SUBJECT':

    return Object.assign({}, state, {
      ...state,
      groupchat_config: {
        ...state.groupchat_config,
        [action.room]: {
          ...state.groupchat_config[action.room],
          subject: action.subject_text,
          author: action.subject_author,
          scrolled: true
        }
      }
    });


    case 'GROUPCHAT_DESCRIPTION':

    return Object.assign({}, state, {
      ...state,
      groupchat_config: {
        ...state.groupchat_config,
        [action.room]: {
          ...state.groupchat_config[action.room],
          description: action.description
        }
      }
    });



    default:
    return state;
  }
}
