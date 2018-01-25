import React from 'react';
import PropTypes from 'prop-types';
import immutable from 'immutable';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import Notification from './Notification';
import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATION_BY_ID,
  HIDE_NOTIFICATION,
  SET_MAX_NOTIFICATIONS
} from './redux/reducer';

export const store = configureStore();

const styles = theme => ({
  root: {
    bottom: 20,
    right: 25,
    position: 'fixed',
    zIndex: theme.zIndex.snackbar,
    minWidth: 325
  }
});

class NotificationProvider extends React.Component {
  componentWillMount() {
    setMaxNotifications(this.props.maxNotifications);
  }
  onCloseNotification = index => {
    internalRemoveNotification(index);
  };

  onNotificationTimeout = index => {
    hideNotification(index);
    setTimeout(() => {
      this.onCloseNotification(index);
    }, 300);
  };

  render() {
    const { classes, notifications } = this.props;
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
  maxNotifications: PropTypes.number,
  notifications: PropTypes.instanceOf(immutable.List).isRequired
};

function mapStateToProps(state) {
  return {
    maxNotifications: state.muiNotifications.get('maxNotifications'),
    notifications: state.muiNotifications.get('notifications')
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  if (
    ownProps.maxNotifications &&
    stateProps.maxNotifications !== ownProps.maxNotifications
  )
    return {
      ...stateProps,
      ...dispatchProps,
      maxNotifications: ownProps.maxNotifications
    };
  return {
    ...stateProps,
    ...dispatchProps
  };
}

export default class ComponentWrapper extends React.Component {
  render() {
    const WrappedComponent = compose(
      connect(mapStateToProps, {}, mergeProps),
      withStyles(styles)
    )(NotificationProvider);
    return (
      <Provider store={store}>
        <WrappedComponent {...this.props} />
      </Provider>
    );
  }
}

export const setMaxNotifications = maxNotifications => {
  return store.dispatch({
    type: SET_MAX_NOTIFICATIONS,
    payload: { maxNotifications }
  });
};

export const showNotification = getNotificationFn => {
  const id = store.getState().muiNotifications.get('count');
  return new Promise((resolve, reject) => {
    const notification = getNotificationFn(id);
    const dispatched = store.dispatch({
      type: SHOW_NOTIFICATION,
      payload: { notification }
    });
    return resolve(dispatched);
  });
};

const hideNotification = index => {
  return store.dispatch({ type: HIDE_NOTIFICATION, payload: { index } });
};

const internalRemoveNotification = index => {
  return store.dispatch({ type: REMOVE_NOTIFICATION, payload: { index } });
};

export const removeNotification = id => {
  return new Promise((resolve, reject) => {
    const dispacted = store.dispatch({
      type: REMOVE_NOTIFICATION_BY_ID,
      payload: { id }
    });
    return resolve(dispacted);
  });
};
