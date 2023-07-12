import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosCustomize";
import { format } from "date-fns";
import CreateRecipeTypePopup from "./CreateRecipeTypePopup";
import UpdateRecipeTypePopup from "./UpdateRecipeTypePopup";
import EditIcon from "@mui/icons-material/Edit";

const ListRecipeType = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Recipe Type ID", flex: 0.5 },
    { field: "Name", headerName: "Name", flex: 0.5 },
    { field: "ModifiedDate", headerName: "Modified Date", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleOpenUpdateDialog(params.row)}
          aria-label="Update"
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const [recipeTypes, setRecipeTypes] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedRecipeType, setSelectedRecipeType] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchRecipeTypes = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/RecipeTypes");
        const data = response.value;
        console.log("Recipe Type: ", data)
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

  const handleOpenUpdateDialog = (recipeType) => {
    setSelectedRecipeType(recipeType);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdateRecipeType = async (updatedRecipeType) => {
    setLoading(true);

    try {
      setRecipeTypes((prevRecipeTypes) => {
        const updatedTypes = prevRecipeTypes.map((recipeType) => {
          if (recipeType.id === updatedRecipeType.id) {
            return updatedRecipeType;
          }
          return recipeType;
        });
        return updatedTypes;
      });
    } catch (error) {
      console.error("Error updating recipe type:", error);
    } finally {
      setLoading(false);
      handleCloseUpdateDialog();
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
        setRecipeTypes={setRecipeTypes}
      />
      <UpdateRecipeTypePopup
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
        onUpdate={handleUpdateRecipeType}
        loading={loading}
        recipeType={selectedRecipeType}
        setRecipeTypes={setRecipeTypes}
      />
    </Box>
  );
};

export default ListRecipeType;
