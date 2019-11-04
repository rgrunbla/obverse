import converse from "@converse/headless/headless";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Component } from "react";
import { connect } from "react-redux";

const useStyles = theme => ({
  root: {
    margin: theme.spacing(3),
    width: '100%'
  },

  textfield: {
    width: '90%'
  }
});

const getUniqueId = (suffix) => {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
    v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
  if (typeof(suffix) === "string" || typeof(suffix) === "number") {
    return uuid + ":" + suffix;
  } else {
    return uuid + "";
  }
}

const mapStateToProps = (state, ownProps) => {
  return { api: state.control.api,
    active: state.chat.groupchat_config.active }
  }

  class MessageInput extends Component {

    constructor(props) {
      super(props);
      this.state = {message: ''};

      this.handleChange = this.handleChange.bind(this);
      this.generateHandleSubmit = this.generateHandleSubmit.bind(this);
    }

    handleChange = (event) => {
      this.setState({message: event.target.value});
    }

    generateHandleSubmit = (props) => {
      return (event) => {
        event.preventDefault();

        const id = getUniqueId();

        var msg = converse.env.$msg({
          from: props.api.user.jid(),
          to: props.active,
          type: 'groupchat',
          id: id
        }).c('body').t(this.state.message);

        props.api && props.api.send(msg);

        this.setState({message: ''});
      }
    }

    render() {
      const { classes } = this.props;
      return (
        <form onSubmit={this.generateHandleSubmit(this.props)} className={classes.textfield}>
        <TextField
        onChange={this.handleChange}
        value={this.state.message}
        className={classes.root}
        autoComplete='off'
        id="standard-multiline-flexible"
        label="Send Message"
        margin="normal"
        />
        </form>
      );
    }
  }

  export default connect(mapStateToProps)(withStyles(useStyles)(MessageInput));
