import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import CloseIcon from 'material-ui-icons/Close';
import moment from 'moment';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    width: 300,
    margin: theme.spacing.unit * 3,
    zIndex: theme.zIndex.snackbar,
    overflow: 'hidden'
  },
  card: {},
  cardHeader: {
    paddingLeft: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
  },
  cardContent: {
    padding: theme.spacing.unit
  },
  avatar: {
    flex: '0 0 auto',
    marginRight: theme.spacing.unit * 2,
    alignItems: 'baseline'
  },
  typeIcons: {
    width: 24,
    height: 24
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0
  },
  actionDivider: {
    marginTop: theme.spacing.unit,
    padding: 0
  },
  titleComponent: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    maxWidth: 200,
    alignItems: 'baseline',
    '& :last-child': {
      marginLeft: 'auto'
    }
  },
  close: {
    width: 15,
    height: 15
  },
  closeButton: {
    width: 20,
    height: 20,
    margin: theme.spacing.unit
  },
  timestampFont: {
    width: 70,
    fontSize: '9pt',
    color: theme.palette.text.secondary,
    textAlign: 'right'
  },
  titleText: {
    width: 158
  },
  subheaderText: {
    display: 'block',
    fontSize: '10pt',
    color: theme.palette.text.secondary,
    maxHeight: 60,
    overflow: 'hidden'
  }
});

class Notification extends React.Component {
  componentWillMount() {
    if (this.props.timeout) {
      this.autoHideTimeout = setTimeout(() => {
        this.onNotificationTimeout();
      }, this.props.timeout);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.autoHideTimeout);
  }

  onCloseNotification = () => {
    if (this.props.onCloseNotification) {
      this.props.onCloseNotification();
    }
  };

  onNotificationTimeout = () => {
    if (this.props.onNotificationTimeout) {
      this.props.onNotificationTimeout();
    } else {
      this.onCloseNotification();
    }
  };

  render() {
    const {
      classes,
      raised,
      avatar,
      title,
      subheader,
      content,
      action,
      disableTimestamp,
      timestamp,
      open,
      hideCloseButton
    } = this.props;

    return (
      <Slide direction="up" in={open}>
        <Card
          className={classNames(classes.root, classes.card)}
          raised={raised}
        >
          <CardHeader
            className={classes.cardHeader}
            avatar={avatar}
            action={
              !hideCloseButton && (
                <IconButton
                  className={classes.closeButton}
                  onClick={this.onCloseNotification}
                >
                  <CloseIcon className={classes.close} />
                </IconButton>
              )
            }
            title={
              <span className={classes.titleComponent}>
                <Typography
                  type={avatar ? 'body2' : 'headline'}
                  component="span"
                  className={classes.titleText}
                  noWrap
                >
                  {title}
                </Typography>
                {disableTimestamp ? (
                  <span />
                ) : (
                  <Typography
                    type="body1"
                    component="span"
                    classes={{ body1: classes.timestampFont }}
                  >
                    {timestamp ? timestamp : moment().format('h:mm A')}
                  </Typography>
                )}
              </span>
            }
            subheader={
              <Typography
                type={'body1'}
                component="span"
                className={classes.subheaderText}
              >
                {subheader}
              </Typography>
            }
          />
          {content && (
            <CardContent className={classes.cardContent}>
              <Typography type="body1" noWrap>
                {content}
              </Typography>
            </CardContent>
          )}
          {action && (
            <div>
              <Divider className={classes.actionDivider} />
              <CardActions className={classes.cardActions}>
                <Divider />
                {action}
              </CardActions>
            </div>
          )}
        </Card>
      </Slide>
    );
  }
}
Notification.displayName = 'Notification';
Notification.propTypes = {
  classes: PropTypes.any.isRequired,
  raised: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  avatar: PropTypes.node,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  action: PropTypes.node,
  timeout: PropTypes.number,
  disableTimestamp: PropTypes.bool,
  timestamp: PropTypes.string,
  onCloseNotification: PropTypes.func.isRequired,
  onNotificationTimeout: PropTypes.func,
  open: PropTypes.bool.isRequired,
  hideCloseButton: PropTypes.bool,
  priority: PropTypes.bool
};
Notification.defaultProps = {
  raised: true,
  disableTimestamp: false,
  open: false,
  hideCloseButton: false,
  priority: false
};

export default withStyles(styles)(Notification);
