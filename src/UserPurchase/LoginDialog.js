import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SignInSide from '../../pages/login';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog(props) {
  const classes = useStyles();
  const {SingupDialogOpen , setSingupDialogOpen} = props

  const handleClose = () => {
    setSingupDialogOpen(!SingupDialogOpen)
  };
  const newProps = {
    ...props,
    Dialog: true,
  }

  return (
    <div>
      <Dialog fullScreen open={SingupDialogOpen} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        <SignInSide {...newProps}/>
      </Dialog>
    </div>
  );
}

LoginDialog.propTypes={
    SingupDialogOpen: PropTypes.bool.isRequired,
    setSingupDialogOpen: PropTypes.func.isRequired,
  }