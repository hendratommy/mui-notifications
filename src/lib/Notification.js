import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import CloseIcon from 'material-ui-icons/Close';
import ExpandMore from 'material-ui-icons/ExpandMore';
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
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  actionDivider: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit}px 0px ${
      theme.spacing.unit
    }px`,
    padding: 0
  },
  rightHeaderSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.unit,
    '& :last-child': {
      marginRight: theme.spacing.unit
    }
  },
  smallIcon: {
    width: 15,
    height: 15
  },
  smallIconButton: {
    width: 20,
    height: 20,
    marginLeft: theme.spacing.unit
  },
  timestampFont: {
    fontSize: '9pt',
    color: theme.palette.text.secondary,
    textAlign: 'left'
  },
  titleText: {
    width: 158
  },
  expandTitleText: {
    width: 133
  },
  subheaderText: {
    display: 'block',
    fontSize: '10pt',
    color: theme.palette.text.secondary,
    maxHeight: 60,
    overflow: 'hidden'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    textAlign: 'center'
  },
  expandContent: {
    margin: 0,
    padding: theme.spacing.unit
  },
  secondaryTextColor: {
    color: theme.palette.text.secondary
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
});

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
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

  handleExpandContent = () => {
    this.setState({ expanded: !this.state.expanded });
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
      hideCloseButton,
      expandContent
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
              <span className={classes.rightHeaderSection}>
                {expandContent ? (
                  <IconButton
                    className={classes.smallIconButton}
                    onClick={this.handleExpandContent}
                    disableRipple
                  >
                    <ExpandMore
                      className={classNames(classes.expand, classes.smallIcon, {
                        [classes.expandOpen]: this.state.expanded
                      })}
                    />
                  </IconButton>
                ) : (
                  <span />
                )}
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
                {!hideCloseButton && (
                  <IconButton
                    className={classes.smallIconButton}
                    onClick={this.onCloseNotification}
                    disableRipple
                  >
                    <CloseIcon className={classes.smallIcon} />
                  </IconButton>
                )}
              </span>
            }
            title={
              <Typography
                type={avatar ? 'body2' : 'headline'}
                component="span"
                className={
                  expandContent ? classes.expandTitleText : classes.titleText
                }
                noWrap
              >
                {title}
              </Typography>
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
              <Typography type="body1" component="span">
                {content}
              </Typography>
            </CardContent>
          )}
          {expandContent && (
            <Collapse in={this.state.expanded} unmountOnExit>
              <Typography
                type="body1"
                component="span"
                className={classes.expandContent}
                classes={{ body1: classes.secondaryTextColor }}
              >
                {expandContent}
              </Typography>
            </Collapse>
          )}
          {action && (
            <div>
              <Divider className={classes.actionDivider} />
              <CardActions className={classes.cardActions}>
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
  id: PropTypes.any,
  hideCloseButton: PropTypes.bool,
  priority: PropTypes.bool,
  expandContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};
Notification.defaultProps = {
  raised: true,
  disableTimestamp: false,
  open: false,
  hideCloseButton: false,
  priority: false
};

export default withStyles(styles)(Notification);
