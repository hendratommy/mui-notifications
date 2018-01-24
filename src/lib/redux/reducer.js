import { Map, List } from 'immutable';
import { combineReducers } from 'redux';

export const SHOW_NOTIFICATION = '@@mui-notifications/SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = '@@mui-notifications/HIDE_NOTIFICATION';
export const REMOVE_NOTIFICATION = '@@mui-notifications/REMOVE_NOTIFICATION';
export const SET_MAX_NOTIFICATIONS =
  '@@mui-notifications/SET_MAX_NOTIFICATIONS';

const initialState = Map({
  notifications: List(),
  count: 0,
  maxNotifications: 5
});

const reducer = (state = initialState, action) => {
  let notifications, notification, count, maxNotifications, index;
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      notifications = state.get('notifications');
      count = state.get('count');
      maxNotifications = state.get('maxNotifications');

      notifications = notifications.filter(notification => notification.open);
      if (notifications.size >= maxNotifications) {
        index = notifications.findIndex(
          notification =>
            typeof notification === 'object' &&
            (!notification.hasOwnProperty('priority') || !notification.priority)
        );
        if (index >= 0) notifications = notifications.splice(index, 1);
      }
      if (notifications.size < maxNotifications) {
        let notification = action.payload.notification;
        notification.id = count;
        notification.open = true;
        notifications = notifications.push(notification);
        state = state.set('count', count + 1);
      }

      // sort by priority
      notifications = notifications.sort((a, b) => {
        if (!a.priority && b.priority) return 1;
        if (a.priority && !b.priority) return -1;
        return 0;
      });
      return state.set('notifications', notifications);
    }
    case SET_MAX_NOTIFICATIONS: {
      return state.set('maxNotifications', action.payload.maxNotifications);
    }
    case HIDE_NOTIFICATION: {
      notifications = state.get('notifications');

      index = action.payload.index;
      notification = Object.assign({}, notifications.get(index));
      notification.open = false;
      notifications = notifications.set(index, notification);
      return state.set('notifications', notifications);
    }
    case REMOVE_NOTIFICATION: {
      notifications = state.get('notifications');

      index = action.payload.index;
      notifications = notifications.splice(index, 1);
      return state.set('notifications', notifications);
    }
    default: {
      return state;
    }
  }
};

export default function(state, action) {
  return combineReducers({
    muiNotifications: reducer
  })(state, action);
}
