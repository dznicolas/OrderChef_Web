import React from "react";
import { List, ListItem, ListItemText, Paper, ListItemSecondaryAction, ButtonGroup, IconButton, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "../../controls";
import { roundTo2DecimalPoint } from "../../utils";
import ImgFood from "../../imagens/food.png";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    width: '90%',
    display: 'block',
    margin: '0 auto',
    padding: "0px",
    marginBottom: "10px",
    "&:hover": {
      cursor: "pointer",
    },
    "&:hover $deleteButton": {
      display: "block",
    },
  },
  buttonGroup: {
    backgroundColor: "#Fff",
    borderRadius: 8,
    fontSize: "17px",
    marginTop: "6px",
    "& .MuiButtonBase-root ": {
      border: "none",
      padding: "4px",
      fontSize: "13px",
    },
    "& button:nth-child(2)": {
      fontSize: "13px",
      color: "#000",
    },
  },
  deleteButton: {
    "& .MuiButtonBase-root": {
      color: "#E81719",
    },
  },
  totalPerItem: {
    fontWeight: "bolder",
    fontSize: "1.2em",
    margin: "0px 10px",
  },
  ImgFood: {
    width: '100px',
    height: '100px',
  }
}));

export default function OrderedFoodItems(props) {
  const { values, setValues } = props;
  const classes = useStyles();

  let orderedFoodItems = values.orderDetails;

  const removeFoodItem = (index, id) => {
    let x = { ...values };
    x.orderDetails = x.orderDetails.filter((_, i) => i != index);
    if (id != 0) {
      x.deletedOrderItemIds += id + ",";
    }
    setValues({ ...x });
  };

  const updateQuantity = (idx, value) => {
    let x = { ...values };
    let foodItem = x.orderDetails[idx];
    if (foodItem.quantity + value > 0) {
      foodItem.quantity += value;
      setValues({ ...x });
    }
  };

  return (
    <>
      <List>
        {orderedFoodItems.length == 0 ? (
          <>
            <div>
              <img src={ImgFood} className={classes.ImgFood} alt="Food" />
            </div>
            <ListItem style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div>
                <ListItemText primary="List of selected items" />
              </div>
            </ListItem>
          </>
        ) : (
          orderedFoodItems.map((item, idx) => (
            <Paper key={idx} className={classes.paperRoot}>
              <ListItem>
                <ListItemText
                  primary={item.foodItemName}
                  primaryTypographyProps={{
                    component: "h1",
                    style: {
                      fontWeight: "500",
                      fontSize: "1.2em",
                    },
                  }}
                  secondary={
                    <>
                      <ButtonGroup
                        variant="outlined"
                        size="small"
                        className={classes.buttonGroup}
                      >
                        <Button
                          color="primary"
                          className={classes.btnStyle}
                          onClick={(e) => updateQuantity(idx, -1)}
                        >
                          -
                        </Button>
                        <Button
                          color="primary"
                          className={classes.btnStyle}
                          disabled
                        >
                          {item.quantity}
                        </Button>
                        <Button
                          color="primary"
                          className={classes.btnStyle}
                          onClick={(e) => updateQuantity(idx, 1)}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                      <span className={classes.totalPerItem}>
                        {"$" +
                          roundTo2DecimalPoint(
                            item.quantity * item.foodItemPrice
                          )}
                      </span>
                    </>
                  }
                  secondaryTypographyProps={{
                    component: "div",
                  }}
                />
                <ListItemSecondaryAction className={classes.deleteButton}>
                  <IconButton
                    disableRipple
                    onClick={(e) => removeFoodItem(idx, item.orderDetailsId)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))
        )}
      </List>
    </>
  );
}
