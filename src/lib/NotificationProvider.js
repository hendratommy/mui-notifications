import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Notification from './Notification';

let notifications = [],
  count = 0,
  maxNotifications;

const styles = theme => ({
  root: {
    bottom: 20,
    right: 25,
    position: 'fixed',
    zIndex: theme.zIndex.snackbar,
    minWidth: 325
  }
});

class NotificationProvider extends Component {
  componentWillMount() {
    notifications = [];
    maxNotifications = this.props.maxNotifications;
  }

  static showNotification = notification => {
    let tempNotifications = notifications;
    notification.id = count;
    notification.open = true;

    tempNotifications.push(notification);
    tempNotifications = tempNotifications.filter(
      NotificationProvider.filterOpen
    );
    notifications = NotificationProvider.shuffleNotifications(
      tempNotifications
    );
    count++;
  };

  static filterOpen = notification => notification.open;

  static shuffleNotifications = tempNotifications => {
    if (tempNotifications.length > maxNotifications) {
      for (let i in tempNotifications) {
        if (
          typeof tempNotifications[i] === 'object' &&
          (!tempNotifications[i].hasOwnProperty('priority') ||
            !tempNotifications[i].priority)
        ) {
          tempNotifications.splice(i, 1);
          if (tempNotifications.length === maxNotifications) {
            break;
          }
        }
      }
    }

    tempNotifications.sort(function(a, b) {
      const priorityA = a.priority,
        priorityB = b.priority;
      if (!priorityA && priorityB) {
        return 1;
      } else if (priorityA && !priorityB) {
        return -1;
      }

      return 0;
    });
    return tempNotifications;
  };

  onCloseNotification = index => {
    notifications.splice(index, 1);
    this.forceUpdate();
  };

  onNotificationTimeout = index => {
    const notification = notifications[index];
    notification.open = false;
    this.forceUpdate();
    setTimeout(() => {
      this.onCloseNotification(index);
      this.forceUpdate();
    }, 300);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {notifications.map((props, index) => {
          return (
            <Notification
              onCloseNotification={() => {
                this.onCloseNotification(index);
              }}
              onNotificationTimeout={() => {
                this.onNotificationTimeout(index);
              }}
              open={true}
              key={`notification-${props.id}`}
              {...props}
            />
          );
        })}
      </div>
    );
  }
}

NotificationProvider.propTypes = {
  desktop: PropTypes.bool,
  maxNotifications: PropTypes.number
};
NotificationProvider.defaultProps = {
  maxNotifications: 5
};
export default withStyles(styles)(NotificationProvider);
