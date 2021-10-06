import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const FormDialog = props => {
  const { handleClose, open, title, content, maxWidth, charityImage } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth={maxWidth}
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent className={charityImage ? "charityImage" : ""}>
          <DialogContentText>{content}</DialogContentText>
          {props.children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
