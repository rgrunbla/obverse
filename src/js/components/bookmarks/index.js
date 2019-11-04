import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function mapStateToProps(state) {
  return {
    bookmarks: state.chat.bookmarks,
    groupchat_config: state.chat.groupchat_config
   }
}

const drawerWidth = 240;
const bottomNavigationHeight = '10vh';

const useStyles = theme => ({
  root: {
    width: drawerWidth,
    maxWidth: drawerWidth,
    backgroundColor: theme.palette.background.paper,
  },
  unreadMessages : {
    fontSize:'7em',
  }
});

class Bookmarks extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes, active } = this.props;
    return (
      <List className={classes.root}>
        {Object.values(this.props.bookmarks).map((bookmark) => (
          <React.Fragment key={bookmark.jid}>
            <Divider />
              <ListItem key={bookmark.jid} alignItems="flex-start" dense button component={Link} to={'/rooms/' + bookmark.jid} selected={(active == bookmark.jid)}>
              <React.Fragment>
                <ListItemText
                  primary={<span style={{ fontWeight: (this.props.groupchat_config && this.props.groupchat_config[bookmark.jid] && this.props.groupchat_config[bookmark.jid].unread > 0) ? 'bold': 'normal' }}>{bookmark.name}</span>}
                  title={bookmark.jid}
                  />
              </React.Fragment>
              </ListItem>
          </React.Fragment>
        ))}
      </List>
    );
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Bookmarks));
