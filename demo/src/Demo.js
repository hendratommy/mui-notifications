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
import { grey, green, yellow, red } from 'material-ui/colors';
import classNames from 'classnames';
import {
  Notification,
  NotificationProvider,
  showNotification,
  removeNotification
} from 'mui-notifications';

import Github from './icons/Github';
import AvatarImg from './images/grumpy.jpg';
import Divider from 'material-ui/Divider';
import InfoIcon from 'material-ui-icons/Info';
import WarningIcon from './icons/WarningOutline';
import ErrorIcon from './icons/ErrorOutline';

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
  avatarInfo: {
    backgroundColor: green[500]
  },
  avatarWarning: {
    backgroundColor: yellow[500]
  },
  avatarError: {
    backgroundColor: red[500]
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
  },
  expandedButton: {
    margin: `${theme.spacing.unit}px 0px 0px ${theme.spacing.unit}px`
  },
  expandedButtonContainer: {
    '& :last-child': {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  },
  infoCard: {
    border: `solid ${green[500]}`
  },
  warningCard: {
    border: `solid ${yellow[500]}`
  },
  errorCard: {
    border: `solid ${red[500]}`
  }
});

class Demo extends Component {
  showBasicNotification = () => {
    showNotification(id => ({
      title: 'Title',
      subheader: `Some message to be displayed {id: ${id}}`,
      avatar: (
        <Avatar className={this.props.classes.avatar}>
          <Message />
        </Avatar>
      ),
      timeout: 2000
    }));
  };

  showActionNotification = () => {
    showNotification(id => ({
      title: 'Title',
      subheader: `Some message to be displayed {id: ${id}}`,
      avatar: (
        <Avatar className={this.props.classes.avatar}>
          <Person />
        </Avatar>
      ),
      action: (
        <div>
          <Button
            dense
            className={this.props.classes.button}
            color="secondary"
            onClick={() => removeNotification(id)}
          >
            Dismiss <Close className={this.props.classes.rightIcon} />
          </Button>
          <Button dense className={this.props.classes.button} color="primary">
            Answer <Call className={this.props.classes.rightIcon} />
          </Button>
        </div>
      )
    }));
  };

  showPriorityNotification = () => {
    showNotification(id => ({
      title: 'Title',
      subheader: `Priority message {id: ${id}}`,
      content:
        'Priority message will not discarded when new notifications arrive and max limit reached',
      avatar: <Avatar className={this.props.classes.avatar} src={AvatarImg} />,
      action: (
        <div>
          <Button
            dense
            className={this.props.classes.button}
            color="secondary"
            onClick={() => removeNotification(id)}
          >
            Dismiss <Close className={this.props.classes.rightIcon} />
          </Button>
          <Button dense className={this.props.classes.button} color="primary">
            Answer <Call className={this.props.classes.rightIcon} />
          </Button>
        </div>
      ),
      disableTimestamp: true,
      priority: true
    }));
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
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <Typography color="inherit" type="headline" paragraph>
                Standard Notifications
              </Typography>
              <Notification
                title="Title"
                subheader="Some message"
                avatar={
                  <Avatar>
                    <Message />
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
                    <Person />
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
                disableTimestamp
              />
              <Notification
                title="Title"
                subheader="With custom timestamp"
                timestamp={moment().format('HH:mm:ss')}
                open={true}
                onCloseNotification={() => {
                  return;
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <Typography color="inherit" type="headline" paragraph>
                Notifications with additional text
              </Typography>
              <Notification
                title="Title"
                subheader="Subheader"
                content="Some message"
                avatar={
                  <Avatar>
                    <Message />
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
                    <Person />
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
                disableTimestamp
              />
              <Notification
                title="Title"
                subheader="Subheader"
                content="With custom timestamp"
                open={true}
                onCloseNotification={() => {
                  return;
                }}
                timestamp={moment().format('HH:mm:ss')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <Typography color="inherit" type="headline" paragraph>
                Expanded Notifications
              </Typography>
              <Notification
                title="Title"
                subheader="Some message"
                avatar={
                  <Avatar>
                    <Message />
                  </Avatar>
                }
                open={true}
                onCloseNotification={() => {
                  return;
                }}
                expandContent="Expanded content"
              />
              <Notification
                title="Title"
                subheader="Some message"
                avatar={
                  <Avatar className={this.props.classes.avatar}>
                    <Person />
                  </Avatar>
                }
                open={true}
                onCloseNotification={() => {
                  return;
                }}
                expandContent={
                  <div className={classes.expandedButtonContainer}>
                    <Divider />
                    <div>
                      <Button
                        dense
                        className={classes.expandedButton}
                        color="secondary"
                      >
                        Dismiss <Close className={classes.rightIcon} />
                      </Button>
                      <Button
                        dense
                        className={classes.expandedButton}
                        color="primary"
                      >
                        Answer <Call className={classes.rightIcon} />
                      </Button>
                    </div>
                  </div>
                }
                disableTimestamp
              />
              <Notification
                title="Title"
                subheader="With custom timestamp"
                open={true}
                onCloseNotification={() => {
                  return;
                }}
                expandContent="Expanded content"
                timestamp={moment().format('HH:mm:ss')}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <Typography color="inherit" type="headline" paragraph>
                Custom Notifications
              </Typography>
              <Notification
                title="Info"
                subheader="Some info message"
                avatar={
                  <Avatar className={this.props.classes.avatarInfo}>
                    <InfoIcon />
                  </Avatar>
                }
                action={
                  <div>
                    <Button dense className={classes.button} color="secondary">
                      Dismiss <Close className={classes.rightIcon} />
                    </Button>
                  </div>
                }
                open={true}
                onCloseNotification={() => {
                  return;
                }}
                disableTimestamp
                classes={{ card: classes.infoCard }}
              />
              <Notification
                title="Warning"
                subheader="Some warning message"
                avatar={
                  <Avatar className={this.props.classes.avatarWarning}>
                    <WarningIcon />
                  </Avatar>
                }
                action={
                  <div>
                    <Button dense className={classes.button} color="secondary">
                      Dismiss <Close className={classes.rightIcon} />
                    </Button>
                  </div>
                }
                open={true}
                onCloseNotification={() => {
                  return;
                }}
                disableTimestamp
                classes={{ card: classes.warningCard }}
              />
              <Notification
                title="Error"
                subheader="Some error message"
                avatar={
                  <Avatar className={this.props.classes.avatarError}>
                    <ErrorIcon />
                  </Avatar>
                }
                action={
                  <div>
                    <Button dense className={classes.button} color="secondary">
                      Dismiss <Close className={classes.rightIcon} />
                    </Button>
                  </div>
                }
                open={true}
                onCloseNotification={() => {
                  return;
                }}
                disableTimestamp
                classes={{ card: classes.errorCard }}
                expandContent={
                  <Typography>Some error detail, or stack trace</Typography>
                }
              />
            </Grid>
          </Grid>
        </Paper>
        <Divider className={classes.divider} />
        <div className={classes.buttonContainer}>
          <Button raised onClick={this.showBasicNotification}>
            Show Basic Notification
          </Button>
          <Button raised onClick={this.showActionNotification}>
            Show Action Notification
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
