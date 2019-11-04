// import * as XMPP from 'stanza';
import converse from "@converse/headless/headless";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { dispatchAvatar, dispatchAvatarUrl, dispatchConnected, dispatchGroupchatDescription, dispatchGroupchatMessage, dispatchGroupchatSubject, initApi, storeBookmark } from '../../../js/redux/actions';


const { Strophe } = converse.env;

converse.plugins.add('converse-react', {
  initialize: function () {
    const { _converse } = this;

    _converse.api.settings.update({
      'initApi': null,
      'storeBookmark': null,
      'dispatchConnected': null,
      'dispatchGroupchatDescription': null,
      'dispatchGroupchatSubject': null,
      'dispatchGroupchatMessage': null
    });

    const _initApi = _converse.api.settings.get('initApi');
    const _storeBookmark = _converse.api.settings.get('storeBookmark');
    const _dispatchConnected = _converse.api.settings.get('dispatchConnected');
    const _dispatchGroupchatDescription = _converse.api.settings.get('dispatchGroupchatDescription');
    const _dispatchGroupchatSubject = _converse.api.settings.get('dispatchGroupchatSubject');
    const _dispatchGroupchatMessage = _converse.api.settings.get('dispatchGroupchatMessage');

    _initApi(_converse.api);
    const log = _converse.log;

    _converse.api.listen.on('connected', () => {
      console.log("Connected!");
      _dispatchConnected();
    });

    _converse.api.listen.on('disconnected', () => {
      console.log("Disconnected");

    });

    _converse.api.listen.on('logout', () => {
      console.log("Logout");
    });

    _converse.api.listen.on('bookmarksInitialized', (e) => {
      _converse.bookmarks.models.forEach((bookmark) => {
        const attributes = bookmark.attributes;
        console.log(bookmark);
        _storeBookmark(
          bookmark.get('jid'),
          bookmark.get('name'),
          bookmark.get('autojoin'),
          bookmark.get('nick')
        );

        if(bookmark.get('autojoin')) {
          _converse.api.rooms.create(bookmark.get('jid'), bookmark.get('nick'));
        }
      });
    });
    //
    // _converse.api.listen.on('initialized', () => {
    //   _dispatchConnected();
    // });

    _converse.api.listen.on('enteredNewRoom', room => {
      _dispatchGroupchatDescription(
        room.id,
        room.attributes.description
      );

      _dispatchGroupchatSubject(
        room.id,
        room.attributes.subject.text,
        room.attributes.subject.author,
      );

      const last_messages = room.messages.models.slice(-20);
      last_messages.forEach(message => {
        const attributes = message.attributes;
        if(!attributes.message) {
          console.log("No message");
          console.log(message.attributes);
          return;
        }

        if(!attributes.id) {
          console.log(attributes);
        }
        _dispatchGroupchatMessage(
          room.id,
          attributes.from,
          attributes.id,
          attributes.time,
          attributes.message
        );
      });

      room.messages.on('add', message => {
        const attributes = message.attributes;
        if (attributes.message) {
          const room = Strophe.getBareJidFromJid(attributes.from);
          _dispatchGroupchatMessage(
            room,
            attributes.from,
            attributes.id,
            attributes.time,
            attributes.message
          );
        } else {
          console.log(message);
        }
      });
    });
  }
});


const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const mapStateToProps = state => {
  return {
    isConnected: state.control.isConnected,
    avatars: state.assets.avatars
  };
};

class SignIn extends Component {
  constructor (props){
    super(props);
  }

  state = {
    username: '',
    password: '',
    websocket_url: "wss://chat.aliens-lyon.fr/xmpp-websocket"
  }

  handleOnSubmit = e => {
    e.preventDefault();


    // Configuration of the chat
    //
    // CONVERSE
    //
    console.log("Reinitializing…")
    converse.initialize({
      authentication: 'login',
      jid: this.state.username,
      password: this.state.password,
      websocket_url: this.state.websocket_url,
      whitelisted_plugins: ['converse-react'],
      initApi: this.props.initApi,
      dispatchConnected: this.props.dispatchConnected,
      dispatchGroupchatMessage: this.props.dispatchGroupchatMessage,
      dispatchGroupchatSubject: this.props.dispatchGroupchatSubject,
      dispatchGroupchatDescription: this.props.dispatchGroupchatDescription,
      storeBookmark: this.props.storeBookmark
    });


  };

  handleUsernameChange = e => {
    this.setState({username: e.target.value});
  };

  handlePasswordChange = e => {
    this.setState({password: e.target.value});
  };

  handleWebsocketURLChange = e => {
    this.setState({websocket_url: e.target.value});
  };

  render() {
    const { classes } = this.props;
    return this.props.isConnected ?
    (
      <Redirect
      to={{
        pathname: this.props.location.state && this.props.location.state.from.pathname || "/",
      }}
      />
    )
    :
    (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">
      Log in
      </Typography>
      <form className={classes.form} noValidate onSubmit={this.handleOnSubmit}>
      <TextField variant="outlined" margin="normal" required fullWidth
      id="username" label="Username" name="username" autoComplete="username"
      autoFocus value={this.state.username}
      onChange={this.handleUsernameChange} />

      <TextField variant="outlined" margin="normal" required fullWidth
      name="password" label="Password" type="password" id="password"
      autoComplete="current-password" value={this.state.password}
      onChange={this.handlePasswordChange} />

      <TextField variant="outlined"  margin="normal" required fullWidth
      name="password" label="Websocket url" autoComplete="websocket_url"
      value={this.state.websocket_url}
      onChange={this.handleWebsocketURLChange} />

      <Button type="submit" fullWidth variant="contained" color="primary"
      className={classes.submit}>
      Sign In
      </Button>
      </form>
      </div>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  dispatchGroupchatMessage,
  storeBookmark,
  dispatchConnected,
  dispatchGroupchatSubject,
  dispatchGroupchatDescription,
  initApi,
  dispatchAvatar,
  dispatchAvatarUrl
};

export default (connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignIn)));
