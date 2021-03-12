import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SignInSide from '../../pages/login';
import PropTypes from "prop-types";
import {useSelector} from 'react-redux';

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
  const {SingupDialogOpen , setSingupDialogOpen,loginText} = props
  const {"next-i18next": nextI18Next }= useSelector(state => state)
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
            {loginText[`${nextI18Next}_close`]}
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