import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Linkify from 'linkifyjs/react';
import randomColor from 'randomcolor';
import React, { Component } from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return { avatar: state.control.avatars_urls && state.control.avatars_urls[ownProps.message.author] && state.control.avatars_urls[ownProps.message.author].url || null }
}


class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  const empty_author = '?';
  if(!this.props.skip) {
  return (
              <ListItem dense key={this.props.message.message_id} style={{paddingTop: "0", paddingBottom: "0"}}>
                <ListItemIcon>
                  <Avatar src={this.props.avatar || ""} style={{borderRadius: 0, color: 'black', backgroundColor: randomColor({'luminosity': 'light', 'seed': this.props.message.author || empty_author})}}>{this.props.message.author && this.props.message.author.split("/").slice(1).join("/")[0] || empty_author}</Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div style={{display:"flex"}}>
                      <Typography variant="body1">
                        {this.props.message.author && this.props.message.author.split("/").slice(1).join("/")}
                      </Typography> <Typography style={{marginLeft: 5, color: 'gray'}} variant="body1">
                        {(new Date(this.props.message.date)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </Typography>
                    </div>
                  }
                  secondary={
                    <Linkify>{this.props.message.textContent}</Linkify>
                  }
                />
              </ListItem>
    )
  } else {
    return (
                <ListItem dense key={this.props.message.message_id} style={{paddingTop: "0", paddingBottom: "0"}}>
                <div style={{minWidth: '56px'}}>
                </div>
                <ListItemText
                secondary={
                  <Linkify>{this.props.message.textContent}</Linkify>
                }
                />
                </ListItem>
      )
  }
}
}

export default connect(mapStateToProps, null)(Message);
