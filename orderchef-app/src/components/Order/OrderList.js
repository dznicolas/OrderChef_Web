import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from "@mui/material"; 
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmDialog from "../../controls/ConfirmDialog";

export default function OrderList(props) {
  const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } = props;
  const [orderList, setOrderList] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subtitle:'' })

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.ORDER)
      .fetchAll()
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showForUpdate = (id) => {
    setOrderId(id);
    setOrderListVisibility(false);
  };


  const deleteOrder = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
      createAPIEndpoint(ENDPOINTS.ORDER)
        .delete(id)
        .then((res) => {
          setOrderListVisibility(false);
          setOrderId(0);
          resetFormControls();
          setNotify({ isOpen: true, message: "Deleted successfully.", color: 'success' });
        })
        .catch((err) => console.log(err));
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order N°</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((item) => (
            <TableRow key={item.orderMasterId}>
              <TableCell onClick={(e) => showForUpdate(item.orderMasterId)}>
                {item.orderNumber}
              </TableCell>
              <TableCell onClick={(e) => showForUpdate(item.orderMasterId)}>
                {item.customer.customerName}
              </TableCell>
              <TableCell onClick={(e) => showForUpdate(item.orderMasterId)}>
                {item.method}
              </TableCell>
              <TableCell onClick={(e) => showForUpdate(item.orderMasterId)}>
                {item.total}
              </TableCell>
              <TableCell>
                <DeleteForeverIcon
                  color="error"
                  onClick={() => {
                    setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => { deleteOrder(item.orderMasterId) }
                    })
                }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog 
         confirmDialog={confirmDialog}
         setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
