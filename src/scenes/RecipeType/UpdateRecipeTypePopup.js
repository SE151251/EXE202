import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UpdateRecipeTypeForm from "./UpdateRecipeTypeForm";

const UpdateRecipeTypePopup = ({
    open,
    onClose,
    onUpdate,
    loading,
    recipeType,
    setRecipeTypes
  }) => {
    const [recipeTypeForm, setRecipeTypeForm] = useState(recipeType);
    const handleClose = () => {
      setRecipeTypeForm(null);
      onClose();
    };
  
    if (!recipeType) {
      return null;
    }
  
    const handleUpdate = (updatedRecipeType) => {
      onUpdate(updatedRecipeType);
      handleClose();
    };
 
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{fontWeight:'bold', fontSize:"24px", textAlign:"center"}}>Update Recipe Type</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{fontSize:"18px", textAlign:"center", mb: 3}}>
            Update the details for the selected Recipe Type
          </DialogContentText>
          <UpdateRecipeTypeForm
            recipeTypeForm={recipeType}
            setRecipeTypeForm={setRecipeTypeForm}
            onClose={handleClose}
            onUpdate={handleUpdate}
            open={open}
            loading={loading}
            setRecipeTypes={setRecipeTypes}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default UpdateRecipeTypePopup;
