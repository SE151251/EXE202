import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const ContactDetailsPopup = ({ styleFer, onClose }) => {
  return (
    <Dialog open={Boolean(styleFer)} onClose={onClose}>
      <DialogTitle>styleFer Details</DialogTitle>
      <DialogContent>
        <p>Account ID: {styleFer.accountID}</p>
        <p>Full Name: {styleFer.fullName}</p>
        <p>Email: {styleFer.email}</p>
        <p>Phone: {styleFer.phone}</p>
        <p>Avatar: {styleFer.avatar}</p>
        <p>Gender: {styleFer.gender ? "Male" : "Female"}</p>
        <p>Birth Date: {styleFer.birthDate}</p>
        <p>Status: {styleFer.status}</p>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsPopup;
