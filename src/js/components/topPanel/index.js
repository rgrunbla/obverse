import React, { Component } from 'react';
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';


import Linkify from 'linkifyjs/react';

import { withStyles } from '@material-ui/core/styles';


const useStyles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  description: {
    display: "flex",
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
           groupchat_config: state.chat.groupchat_config[ownProps.active]
         }
}

class TopPanel extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const { classes, active } = this.props;
    return (
          <div className={classes.root}>
            <div className={classes.description}>
              <Typography variant="h6" style={{fontWeight: 'normal'}}>
                {this.props.groupchat_config && this.props.groupchat_config.description}
              </Typography>
              <Typography variant="h6" style={{marginLeft: 10, color: '#a0a0a0'}}>
                {active}
              </Typography>
            </div>
            <Typography variant="subtitle1" gutterBottom>
              <Linkify>
              {this.props.groupchat_config && this.props.groupchat_config.subject}
              </Linkify>
            </Typography>
          </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(TopPanel));
