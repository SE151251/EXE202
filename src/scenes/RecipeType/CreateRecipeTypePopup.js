import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CreateRecipeTypeForm from "./CreateRecipeTypeForm";

const CreateRecipeTypePopup = ({ open, onClose, onCreate, loading, setRecipeTypes }) => {
  const [recipeTypeForm, setRecipeTypeForm] = useState({});

  const handleClose = () => {
    setRecipeTypeForm({});
    onClose();
  };

  const handleCreate = (values) => {
    setRecipeTypeForm(values);
    onCreate(values);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{fontWeight:'bold', fontSize:"24px", textAlign:"center"}}>Create Recipe Type</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{fontSize:"18px", textAlign:"center", mb: 3}}>
          Fill in the form to create a new Recipe Type
        </DialogContentText>
        <CreateRecipeTypeForm
          recipeTypeForm={recipeTypeForm}
          setRecipeTypeForm={setRecipeTypeForm}
          onClose={handleClose}
          onCreate={handleCreate}
          loading={loading}
          setRecipeTypes ={setRecipeTypes}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRecipeTypePopup;
