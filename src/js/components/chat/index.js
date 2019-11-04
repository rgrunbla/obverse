import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from "react-redux";
import LeftPanel from '../leftPanel';
import MessageInput from '../messageInput';
import Messages from '../messages';
import TopPanel from '../topPanel';



const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },

  leftPanel: {

  },

  middlePanel: {
    maxHeight: '100vh',
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },

  rightPanel: {
    width: drawerWidth,
  },

  roomHeader: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  bottomNavigationBar: {
    display: 'flex'
  },

  textInput: {
    margin: theme.spacing(3),
    width: '80%'
  },

  messages: {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: theme.spacing(1),
    background: '#f1f1f1',
    height: '100%',
  },
  toolbar: theme.mixins.toolbar,
});


const mapStateToProps = (state, ownProps) => {
  return { groupchat: state.chat.groupchat[ownProps.match.params.id],
           groupchat_ids: state.chat.groupchat_ids[ownProps.match.params.id],
           groupchat_config: state.chat.groupchat_config[ownProps.match.params.id]
         }
}

const mapDispatchToProps = dispatch => {
  return {
    active: (jid) => dispatch({ type: 'GROUPCHAT_ACTIVE', jid })
  }
}



class Chat extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location) => {
      this.props.active(location.pathname.slice(7));
    });
    this.props.active(this.props.match.params.id);
  }

  componentWillUnmount() {
      this.unlisten();
  }

  render () {
    const { classes, match } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.leftPanel}>
        <LeftPanel active={match.params.id} classes={classes} />
        </div>
        <div className={classes.middlePanel}>
          <TopPanel active={match.params.id} />
          <Messages active={match.params.id} />
          <div className={classes.bottomNavigationBar}>
            <MessageInput />
          </div>
        </div>
        <div className={classes.rightPanel}>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Chat));
