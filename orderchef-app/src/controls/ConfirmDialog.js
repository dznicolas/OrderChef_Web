import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from './Button'
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  Buttons: {
    marginBottom: '10px'
  }
}));

const DialogWrapper = styled(Dialog)(({ theme }) => ({
  padding: theme.spacing(2),
  position: "absolute",
}));

const DialogTitleWrapper = styled(DialogTitle)({
  textAlign: "center",
});

const DialogContentWrapper = styled(DialogContent)({
  textAlign: "center",
});

const DialogActionsWrapper = styled(DialogActions)({
  justifyContent: "center",
});

const TitleIcon = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  color: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: theme.palette.info.light,
    cursor: "default",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "5rem",
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  const handleNoClick = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const handleYesClick = () => {
    confirmDialog.onConfirm();
  };

  return (
    <DialogWrapper open={confirmDialog.isOpen}>
      <DialogTitleWrapper>
        <TitleIcon disableRipple>
          <QuestionMarkIcon />
        </TitleIcon>
      </DialogTitleWrapper>
      <DialogContentWrapper>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subtitle}</Typography>
      </DialogContentWrapper>
      <DialogActionsWrapper className={classes.Buttons}>
        <Button color="info" onClick={handleNoClick}>
          No
        </Button>
        <Button color="error" onClick={handleYesClick}>
          Yes
        </Button>
      </DialogActionsWrapper>
    </DialogWrapper>
  );
}
