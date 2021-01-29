import React from 'react';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {
  const {open, handleClose, ContentText, closeButtom, ContentHeader, cancelButton, CancellDialog} = props

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={CancellDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onEscapeKeyDown={CancellDialog}
        onBackdropClick={CancellDialog}
      >
        <DialogTitle id="alert-dialog-title">{ContentHeader}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {closeButtom !== "NotAgree" && <Button variant="contained" onClick={handleClose} color="primary">
            {closeButtom}
          </Button>}
          <Button variant="contained" onClick={CancellDialog} color="secondary">
            {cancelButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  ContentText: PropTypes.string.isRequired,
  ContentHeader: PropTypes.string.isRequired,
  closeButtom: PropTypes.string.isRequired,
  CancellDialog: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  cancelButton: PropTypes.string.isRequired
  };
