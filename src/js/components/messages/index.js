import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Message from '../message';

const useStyles = theme => ({
  root: {
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
  return { groupchat: state.chat.groupchat[ownProps.active],
           groupchat_ids: state.chat.groupchat_ids[ownProps.active] }
}

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: 'instant' });
  };

  componentDidMount = () => {
    this.scrollToBottom();
  };

  componentDidUpdate = () => {
    this.scrollToBottom();
  };

  render() {
    var messageDate = null;
    var author = null;
    const { classes, groupchat_ids, groupchat } = this.props;
    return (
      <div className={classes.root}>
        <List>
        {groupchat_ids && groupchat_ids.slice(-30).map((message_id) => {
            const currentDate = new Date(groupchat[message_id].date);
            const currentAuthor = groupchat[message_id].author;
            var skip = false;
            const FIVE_MIN=5*60*1000;
            if(author == currentAuthor) {
              if (messageDate) {
                skip = (currentDate - messageDate) < FIVE_MIN;
              }
            }
            if (messageDate) {
              if (!(messageDate.toDateString() === currentDate.toDateString())) {
                messageDate = currentDate;
                return (
                  <React.Fragment key={message_id}>
                    <Divider />
                    <Message message={groupchat[message_id]} />
                  </React.Fragment>
                );
              }
            }
            messageDate = currentDate;
            author = currentAuthor;
            return (
              <Message key={message_id} skip={skip} message={groupchat[message_id]} />
            )
          })
        }
        </List>
        <div ref={el => { this.el = el; }} />
      </div>
      )
  }
}


export default connect(mapStateToProps, null)(withStyles(useStyles)(Messages));
