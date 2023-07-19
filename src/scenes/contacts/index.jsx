import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import OrderConfirmationPopup from "./Dialog/OrderConfirmationPopup"; // Thêm import OrderConfirmationPopup
import { useTheme } from "@mui/material";
import axiosClient from "../../utils/axiosCustomize";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit"; // Thêm import EditIcon

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "Email",
      headerName: "Email",
      flex: 0.5,
    },
    { field: "OrderedDate", headerName: "Ordered Date", flex: 0.5 },
    {
      field: "Total",
      headerName: "Total",
      flex: 0.5,
    },
    {
      field: "OrderStatus",
      headerName: "Order Status",
      flex: 0.5,
    },
    {
      field: "Actions", 
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        const isUnPaid = params.row.OrderStatus === "UnPaid";
        return (
          <>
            {isUnPaid ? (
              <EditIcon
                className="link"
                onClick={() => handleOpenOrderConfirmation(params.row.id)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <EditIcon
                className="link"
                style={{ color: "gray", cursor: "not-allowed" }}
              />
            )}
          </>
        );
      },
    },
  ];

  const [orderd, setOrderd] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrderd = async () => {
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
    };

    fetchOrderd();
  }, []);
  const [initialAmount, setInitialAmount] = useState(0);
  const handleOpenOrderConfirmation = (orderId) => {
    const order = orderd.find((order) => order.id === orderId);
    setSelectedOrderId(orderId);
    setInitialAmount(order?.total || 0);
  };

  const handleCloseOrderConfirmation = () => {
    setSelectedOrderId(null);
  };

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="List of Contacts for Future Reference" />
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
          rows={orderd}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      {selectedOrderId && (
        <OrderConfirmationPopup
        orderId={selectedOrderId}
        initialAmount={initialAmount}
        onClose={handleCloseOrderConfirmation}
        setOrderd={setOrderd}
      />
      )}
    </Box>
  );
};

export default Contacts;
