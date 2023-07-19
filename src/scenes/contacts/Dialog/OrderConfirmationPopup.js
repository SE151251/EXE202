import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import axiosClient from "../../../utils/axiosCustomize";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { format } from "date-fns";

const OrderConfirmationPopup = ({ orderId, initialAmount, onClose, setOrderd }) => {
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
  });

  const handleConfirmOrder = async (values, { setSubmitting, resetForm }) => {
    try {
      const requestBody = {
        paymentTime: values.paymentTime,
        amount: values.amount,
        content: values.content,
        status: values.status,
      };
      await axiosClient.post(`/Orders/Transaction(${orderId})`, requestBody);
      setSubmitting(false);
      resetForm();
      try {
        const response = await axiosClient.get(`/Orders?$expand=styleFer`);
        const data = response.value;
        console.log("Data: ", data);
        const rows =
          data && data.length
            ? data.map((orderd) => ({
                id: orderd.ID,
                Email: orderd.StyleFer.Email,
                OrderedDate: format(new Date(orderd.OrderedDate), "dd/MM/yyyy"),
                Total: orderd.Total,
                OrderStatus: orderd.OrderStatus === 1 ? "Paid" : "UnPaid",
                OrderDetail: orderd.OrderDetails,
                total: orderd.Total,
              }))
            : [];

        setOrderd(rows);
      } catch (error) {
        console.error("Error fetching orderd:", error);
      }
      onClose();
      toast.success("Confirm transaction successfully");
    } catch (error) {
      console.error("Error confirming order:", error);
      toast.error(error.response.data.Message[0].DescriptionError[0]);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle style={{ fontWeight: "bold", fontSize: "25px", textAlign: "center"}}>Order Confirmation</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            paymentTime: new Date().toISOString().split("T")[0],
            amount: initialAmount,
            content: "",
            status: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={handleConfirmOrder}
        >
          <Form>
            <Field
              name="paymentTime"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Payment Time"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />

            <Field
              name="amount"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />

            <Field
              name="content"
              render={({ field, meta }) => (
                <TextField
                  {...field}
                  label="Content"
                  fullWidth
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                  margin="normal"
                />
              )}
            />

            <DialogActions sx={{marginTop: "20px"}}>
              <Button onClick={onClose} variant="contained" color="error" sx={{marginRight: "7px"}}>Cancel</Button>
              <Button type="submit" variant="contained" color="success">
                Confirm
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmationPopup;
