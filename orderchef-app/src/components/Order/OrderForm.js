import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {Grid, InputAdornment, ButtonGroup, Button as MuiButton} from "@mui/material";
import Form from "../../layouts/Form";
import { Input, Select, Button } from "../../controls";
import ReplayIcon from "@mui/icons-material/Replay";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import { roundTo2DecimalPoint } from "../../utils";
import Popup from "../../layouts/Popup";
import Notification from "../../layouts/Notification";
import OrderList from "./OrderList";

const methods = [
  { id: "none", title: "Select" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

const useStyles = makeStyles((theme) => ({
  adornmentText: {
    "& .MuiTypography-root": {
      color: "#4a4a4a",
      fontWeight: "bolder",
      fontSize: "1.5em",
    },
  },
  submitButtonGroup: {
    color: "#000",
    margin: "8px",
  },
}));

export default function OrderForm(props) {
  const {values, errors, setErrors, setValues, handleInputChange, resetFormControls} = props;
  const classes = useStyles();
  const [customerList, setCustomerList] = useState([]);
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [notify, setNotify, color] = useState({ isOpen: false });

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then((res) => {
        if (Array.isArray(res.data)) {
          let customerList = res.data.map((item) => ({
            id: item.customerId,
            title: item.customerName,
          }));
          setCustomerList(customerList);
        } else {
          console.log("Response data is not an array:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  
  

  useEffect(() => {
    let total = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.foodItemPrice;
    }, 0);
    setValues({
      ...values,
      total: roundTo2DecimalPoint(total),
    });
  }, [JSON.stringify(values.orderDetails)]);

  useEffect(() => {
    if (orderId == 0) resetFormControls();
    else {
      createAPIEndpoint(ENDPOINTS.ORDER)
        .fetchById(orderId)
        .then((res) => {
          setValues(res.data);
          setErrors({});
        })
        .catch((err) => console.log(err));
    }
  }, [orderId]);

  const validateForm = () => {
    let temp = {};
    temp.customerId = values.customerId != 0 ? "" : "The field is required!";
    temp.method = values.method != "none" ? "" : "The field is required!";
    temp.orderDetails =
      values.orderDetails.length != 0 ? "" : "The field is required!";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const resetForm = () => {
    resetFormControls();
    setOrderId(0);
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.orderMasterId == 0) {
        createAPIEndpoint(ENDPOINTS.ORDER)
          .create(values)
          .then((res) => {
            resetFormControls();
            setNotify({ isOpen: true, message: "New order is created.", color: 'success' });
          })
          .catch((err) => console.log(err));
      } else {
        createAPIEndpoint(ENDPOINTS.ORDER)
          .update(values.orderMasterId, values)
          .then((res) => {
            setOrderId(0);
            setNotify({ isOpen: true, message: "The order is updated.", color: 'success'});
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const openListOfOrders = () => {
    setOrderListVisibility(true);
  };

  return (
    <>
      <Form onSubmit={submitOrder}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              disabled
              label="Order Number"
              name="OrderNumber"
              value={values.orderNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className={classes.adornmentText}
                    position="start"
                  >
                    #
                  </InputAdornment>
                ),
              }}
            />
            <Select
              label="Customer"
              name="customerId"
              value={values.customerId || ""}
              onChange={handleInputChange}
              options={customerList}
              error={errors.customerId}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              label="Payment Method"
              name="method"
              value={values.method}
              onChange={handleInputChange}
              options={methods}
              error={errors.method}
            />
            <Input
              disabled
              label="Total"
              name="total"
              value={values.total}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className={classes.adornmentText}
                    position="start"
                  >
                    $
                  </InputAdornment>
                ),
              }}
            />

            <ButtonGroup className={classes.submitButtonGroup}>
              <MuiButton
                size="medium"
                endIcon={<RestaurantIcon />}
                type="submit"
              >
                Submit
              </MuiButton>
              <MuiButton
                size="small"
                onClick={resetForm}
                startIcon={<ReplayIcon />}
              ></MuiButton>
            </ButtonGroup>
            <Button
              className={classes.ButtonOrders}
              onClick={openListOfOrders}
              color="info"
              size="medium"
              startIcon={<FormatListNumberedIcon />}
            >
              Orders
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Popup
        title="List of Orders"
        openPopup={orderListVisibility}
        setOpenPopup={setOrderListVisibility}
      >
        <OrderList
          {...{
            setOrderId,
            setOrderListVisibility,
            resetFormControls,
            setNotify,
          }}
        />
      </Popup>
      <Notification {...{ notify, setNotify }} />
    </>
  );
}
