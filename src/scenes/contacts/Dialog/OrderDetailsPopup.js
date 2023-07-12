import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import axiosClient from "../../../utils/axiosCustomize";

const OrderDetailsPopup = ({ orderId, onClose }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosClient.get(
          `/Orders/${orderId}?$expand=StyleFer, OrderTransactions, OrderDetails($expand=Recipe)`
        );
        const data = response;
        console.log("data detail: ", response);
        setOrderDetails(data);
      } catch (error) {
        console.error("Fetch order detail is error:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={Boolean(orderDetails)} onClose={handleClose}>
      <DialogTitle style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "25px", color: "green"}}>Order Detail</DialogTitle>
      <DialogContent sx={{ width: "535px", height: "290px" }}>
        {orderDetails ? (
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {orderDetails.OrderDetails.map((detail, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" style={{fontSize: "15px"}}>
                        Recipe Title:
                      </TableCell>
                      <TableCell align="right" >
                        {detail.Recipe.RecipeTitle}
                      </TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row" style={{fontSize: "15px"}}>
                        Recipe Type:
                      </TableCell>
                      <TableCell align="right">
                        {detail.Recipe.RecipeType}
                      </TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row" style={{fontSize: "15px"}}>
                        Unit Price:
                      </TableCell>
                      <TableCell align="right">
                        {detail.Recipe.UnitsPrice + "$"}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>Loading...</p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "70px",
          }}
        >
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsPopup;
