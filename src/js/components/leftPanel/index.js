import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';
import React, { Component } from "react";
import Bookmarks from '../bookmarks/';


class LeftPanel extends Component {

  render() {
    const { classes, active } = this.props;
    return (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}>
          <List>
              <ListItem key="Bookmarks">
                <ListItemIcon><ChatIcon /></ListItemIcon>
                <ListItemText primary="Bookmarks" />
              </ListItem>
              <Bookmarks active={active}/>
          </List>
        </Drawer>
    );
  }
}

export default LeftPanel;
