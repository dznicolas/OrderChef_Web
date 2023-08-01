import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { ListItemSecondaryAction } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  Paper:{
    width: '90%',
    display: 'block',
    margin: '0 auto !important',
    padding: "0px",
    marginTop: '10px',
  },
  listRoot: {
    width: '90%',
    display: 'block',
    margin: '0 auto !important',
    padding: "0px",
    marginTop: '10px',
    top: 5,
    maxHeight: 450,
    overflow: "auto",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    "& li:hover": {
      cursor: "pointer",
      backgroundColor: "#E3E3E3",
    },
    "& li:hover .MuiButtonBase-root": {
      display: "block",
      color: "#000",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "& .MuiButtonBase-root:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function SearchFoodItems(props) {
  const { values, setValues } = props;
  const [foodItems, setFoodItems] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchList, setSearchList] = useState([]);
  const classes = useStyles();
  let orderedFoodItems = values.orderDetails;

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.FOODITEM)
      .fetchAll()
      .then((res) => {
        const foodItemsArray = res.data;
        setFoodItems(foodItemsArray);
        setSearchList(foodItemsArray);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let x = [...foodItems];
    x = x.filter((y) => {
      return (
        y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase()) &&
        orderedFoodItems.every((item) => item.foodItemId != y.foodItemId)
      );
    });
    setSearchList(x);
  }, [searchKey, orderedFoodItems]);

  const addFoodItem = (foodItem) => {
    let x = {
      orderMasterId: values.orderMasterId,
      orderDetailId: 0,
      foodItemId: foodItem.foodItemId,
      quantity: 1,
      foodItemPrice: foodItem.price,
      foodItemName: foodItem.foodItemName,
    };
    setValues({
      ...values,
      orderDetails: [...values.orderDetails, x],
    });
  };

  return (
    <>
      <Paper className={classes.Paper}>
        <InputBase
          placeholder="Search food items"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Paper>
      <List className={classes.listRoot}>
        {searchList.map((item, idx) => (
          <ListItem key={idx} onClick={(e) => addFoodItem(item)}>
            <ListItemText
              primary={item.foodItemName}
              secondary={"$" + item.price}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={(e) => addFoodItem(item)}>
                <PlusOneIcon />
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
