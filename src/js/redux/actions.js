export function storeBookmark(jid, name, autojoin, nick, id) {
  return {
    type: 'STORE_BOOKMARK',
    jid,
    name,
    autojoin,
    nick
  }
}

export function dispatchGroupchatMessage(room, author, id, date, textContent) {
  return {
    type: 'GROUPCHAT_MESSAGE',
    room,
    author,
    id,
    date,
    textContent
  }
}

export function dispatchGroupchatDescription(room, description) {
  return {
    type: 'GROUPCHAT_DESCRIPTION',
    room,
    description
  }
}

export function dispatchGroupchatSubject(room, subject_text, subject_author) {
  return {
    type: 'GROUPCHAT_SUBJECT',
    room,
    subject_author,
    subject_text
  }
}

export function initApi(api) {
    return {
      type: 'INIT_API',
      api
    }
}

export function dispatchConnected() {
    return {
      type: 'CONNECTED',
    }
}

export function dispatchAvatar(user_jid, avatar_id, avatar_data) {
    return {
      type: 'AVATAR',
      user_jid,
      avatar_id,
      avatar_data
    }
}


export function dispatchAvatarUrl(user_jid, avatar_id, avatar_url) {
    return {
      type: 'AVATAR_URL',
      user_jid,
      avatar_id,
      avatar_url
    }
}
