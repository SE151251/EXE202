import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const OrderTransactionsPopup = ({ transactions, onClose }) => {
  return (
    <Dialog open={Boolean(transactions)} onClose={onClose}>
      <DialogTitle>Order Transactions</DialogTitle>
      <DialogContent>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <p>Transaction ID: {transaction.id}</p>
            <p>Payment Time: {transaction.paymentTime}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Content: {transaction.content}</p>
            <p>Transaction Type: {transaction.transactionType}</p>
            <p>Status: {transaction.status}</p>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default OrderTransactionsPopup;
