import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosCustomize";
import { format } from 'date-fns';
const ListMembers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "AccountID", headerName: "Account ID"},
    { field: "FullName", headerName: "Full Name", flex: 0.5 },
    {
      field: "Email",
      headerName: "Email",
      headerAlign: "left",
      flex: 0.5
    },
    {
      field: "Phone",
      headerName: "Phone",
      type: "number",
      headerAlign: "left",
      flex: 0.5,
      align: "left",
    },
    {
      field: "Gender",
      headerName: "Gender",
      flex: 0.5,
      align: "left",
    },
    {
      field: "BirthDate",
      headerName: "Birth Date",
      flex: 0.5,
    },
    {
      field: "Status",
      headerName: "Status",
      type: "number",
      headerAlign: "left",
      flex: 0.5,
      align: "left",
    },
  ];
  

  const [styleFer, setStyleFer] = useState([]);

  useEffect(() => {
    const fetchStyleFer = async () => {
      try {
        const response = await axiosClient.get("/StyleFers"); 
        const data = response.value;
        const rows = data && data.length ? data.map((styleFer) => ({
            id: styleFer.AccountID,
            AccountID: styleFer.AccountID,
            FullName: styleFer.FullName,
            Email: styleFer.Email,
            Phone: styleFer.Phone,
            Gender: styleFer.Gender ? "Male" : "Female",
            BirthDate: format(new Date(styleFer.BirthDate), 'dd/MM/yyyy'),
            Status: styleFer.Status === 1 ? "Active" : "InActive",
          })) : [];              
        setStyleFer(rows);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
  
    fetchStyleFer();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="List Account Members"
        subtitle="List of account members in system"
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
        <DataGrid
          rows={styleFer}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ListMembers;
