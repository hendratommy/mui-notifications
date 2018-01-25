import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Message from 'material-ui-icons/Message';
import Person from 'material-ui-icons/Person';
import Call from 'material-ui-icons/Call';
import Close from 'material-ui-icons/Close';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography/Typography';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { grey } from 'material-ui/colors';
import classNames from 'classnames';
import { Notification, NotificationProvider } from 'mui-notifications';

import Github from './icons/Github';
import AvatarImg from './images/grumpy.jpg';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root: {
    padding: 0,
    margin: 0,
    flexGrow: 1
  },
  buttonContainer: {
    margin: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'space-around'
  },
  spacer: {
    flex: '1'
  },
  iconButton: {
    margin: theme.spacing.unit,
    textAlign: 'center'
  },
  icon: {
    height: 32,
    width: 32
  },
  content: {
    textAlign: 'left',
    marginBottom: 15,
    margin: 0,
    padding: '70px 15px 15px 15px'
  },
  divider: {
    margin: `${theme.spacing.unit}px 0px`
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  sample: {
    backgroundColor: grey[100],
    padding: theme.spacing.unit
  }
});

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  showNotification = () => {
    NotificationProvider.showNotification({
      title: 'Title',
      subheader: `Some message to be displayed ${this.state.count}`,
      avatar: (
        <Avatar className={this.props.classes.avatar}>
          <Message />
        </Avatar>
      ),
      timeout: 2000
    });
    // update notifications count
    this.setState({
      count: this.state.count + 1
    });
  };

  showPersonalisedNotification = () => {
    // update notifications count
    this.setState({
      count: this.state.count + 1
    });
    NotificationProvider.showNotification({
      title: 'Title',
      subheader: `Some message to be displayed ${this.state.count}`,
      avatar: <Avatar className={this.props.classes.avatar} src={AvatarImg} />,
      timestamp: moment().format('HH:mm')
    });
  };

  showPriorityNotification = () => {
    // update notifications count
    this.setState({
      count: this.state.count + 1
    });
    NotificationProvider.showNotification({
      title: 'Title',
      subheader: `Some message to be displayed ${this.state.count}`,
      avatar: (
        <Avatar className={this.props.classes.avatar}>
          <Call />
        </Avatar>
      ),
      action: (
        <div>
          <Button dense className={this.props.classes.button}>
            Dismiss <Close className={this.props.classes.rightIcon} />
          </Button>
          <Button dense className={this.props.classes.button}>
            Answer <Call className={this.props.classes.rightIcon} />
          </Button>
        </div>
      ),
      priority: true
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.root, classes.content)}>
        <AppBar color="primary">
          <Toolbar>
            <Typography
              type="title"
              color="inherit"
              className={classes.headerText}
              noWrap
            >
              mui-notifications
            </Typography>
            <div className={classes.spacer} />
            <IconButton
              color="inherit"
              component="a"
              href="https://github.com/hendratommy/mui-notifications"
              className={classes.iconButton}
            >
              <Github className={classes.icon} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Paper className={classes.sample}>
          <Grid container>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Notification
                title="Title"
                subheader="Some message"
                avatar={
                  <Avatar>
                    <Person />
                  </Avatar>
                }
                open={true}
                onCloseNotification={() => {
                  return;
                }}
              />
              <Notification
                title="Title"
                subheader="Some message"
                avatar={
                  <Avatar className={this.props.classes.avatar}>
                    <Call />
                  </Avatar>
                }
                action={
                  <div>
                    <Button dense className={classes.button} color="secondary">
                      Dismiss <Close className={classes.rightIcon} />
                    </Button>
                    <Button dense className={classes.button} color="primary">
                      Answer <Call className={classes.rightIcon} />
                    </Button>
                  </div>
                }
                open={true}
                onCloseNotification={() => {
                  return;
                }}
              />
              <Notification
                title="Title"
                subheader="Some message"
                disableTimestamp
                open={true}
                onCloseNotification={() => {
                  return;
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Notification
                title="Title"
                subheader="Subheader"
                content="Some message"
                avatar={
                  <Avatar>
                    <Person />
                  </Avatar>
                }
                open={true}
                onCloseNotification={() => {
                  return;
                }}
              />
              <Notification
                title="Title"
                subheader="Subheader"
                content="Some message"
                avatar={
                  <Avatar className={this.props.classes.avatar}>
                    <Call />
                  </Avatar>
                }
                action={
                  <div>
                    <Button dense className={classes.button} color="secondary">
                      Dismiss <Close className={classes.rightIcon} />
                    </Button>
                    <Button dense className={classes.button} color="primary">
                      Answer <Call className={classes.rightIcon} />
                    </Button>
                  </div>
                }
                open={true}
                onCloseNotification={() => {
                  return;
                }}
              />
              <Notification
                title="Title"
                subheader="Subheader"
                content="Some message"
                open={true}
                onCloseNotification={() => {
                  return;
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        <Divider className={classes.divider} />
        <div className={classes.buttonContainer}>
          <Button raised onClick={this.showNotification}>
            Show Notification
          </Button>
          <Button raised onClick={this.showPersonalisedNotification}>
            Show Personalised Notification
          </Button>
          <Button
            raised
            color="primary"
            onClick={this.showPriorityNotification}
          >
            Show Priority Notification
          </Button>
        </div>
        <NotificationProvider
          desktop={true}
          transitionName={{
            leave: 'dummy',
            leaveActive: 'fadeOut',
            appear: 'dummy',
            appearActive: 'zoomInUp'
          }}
          transitionAppear={true}
          transitionLeave={true}
        />
      </div>
    );
  }
}
Demo.displayName = 'Demo';
Demo.propTypes = {
  classes: PropTypes.any.isRequired
};

export default withStyles(styles)(Demo);
