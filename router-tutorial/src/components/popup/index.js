import React from "react";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

const optionsList = ["about", "users", "topics"];

const RenderList = ({ value, onOptionPress }) => {
  return (
    <List
      style={{
        width: 160,
        justifyContent: "center",
        alignContent: "center",
        paddingTop: 0,
        paddingBottom: 0
      }}
    >
      <ListItem divider button>
        <ListItemText
          primary={value.toUpperCase()}
          onClick={() => onOptionPress(value)}
          style={{
            marginLeft: 20,
            color: "purple"
          }}
        />
      </ListItem>
    </List>
  );
};

const Popup = ({ onCloseClicked, showModal, onOptionPress }) => {
  const classes = useStyles();

  const open = Boolean(showModal);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={showModal}
      onClose={onCloseClicked}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      {optionsList.map(val => (
        <RenderList value={val} key={val} onOptionPress={onOptionPress} />
      ))}
    </Popover>
  );
};

export default Popup;
