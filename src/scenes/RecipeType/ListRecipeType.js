import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosCustomize";
import { format } from "date-fns";
import CreateRecipeTypePopup from "./CreateRecipeTypePopup";
import "react-toastify/dist/ReactToastify.css";

const ListRecipeType = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Recipe Type ID", flex: 0.5 },
    { field: "Name", headerName: "Name", flex: 0.5 },
    { field: "ModifiedDate", headerName: "Modified Date", flex: 0.5 },
  ];

  const [recipeTypes, setRecipeTypes] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipeTypes = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/RecipeTypes");
        const data = response.value;
        console.log("response: ", data);
        const rows =
          data && data.length
            ? data.map((recipeType) => ({
                id: recipeType.Id,
                Name: recipeType.Name,
                ModifiedDate: format(
                  new Date(recipeType.ModifiedDate),
                  "dd/MM/yyyy"
                ),
              }))
            : [];
        setRecipeTypes(rows);
      } catch (error) {
        console.error("Error fetching recipe types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeTypes();
  }, []);

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateRecipeType = async (recipeType) => {
    setLoading(true);

    try {
      setRecipeTypes((prevRecipeTypes) => [...prevRecipeTypes, recipeType]);
    } catch (error) {
      console.error("Error creating recipe type:", error);
    } finally {
      setLoading(false);
      handleCloseCreateDialog();
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Recipe Type"
        subtitle="List of Recipe Type for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenCreateDialog}
          >
            Create
          </Button>
        </Box>
        <DataGrid
          rows={recipeTypes}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <CreateRecipeTypePopup
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        onCreate={handleCreateRecipeType}
        loading={loading}
        setRecipeTypes = {setRecipeTypes}
      />
      {/* <ToastContainer /> */}
    </Box>
  );
};

export default ListRecipeType;
