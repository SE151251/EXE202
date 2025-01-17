import { FoodBankOutlined } from "@mui/icons-material";
import AddCardIcon from "@mui/icons-material/AddCard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Box, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Apex from "../../components/ApexChart";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { tokens } from "../../theme";
import axiosClient from "../../utils/axiosCustomize";
const Dashboard = () => {
  const [data, setData] = useState({
    CurrentMonthProfits: 0,
    TotalActiveRecipes: 0,
    TotalActiveStyleFers: 0,
    TotalOrders: 0,
    TotalRecipeTypes: 0,
    MonthProfits: [
      {
        month: 0,
        profit: 0,
      },
    ],
    FiveNewOrders: [
      {
        ID: 0,
        OrderStatus: 0,
        OrderedDate: "2023-07-10T06:39:06.9812813Z",
        Total: 0.63,
        StyleFer: { Email: "email@gmail.com", FullName: "user" }
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          "/Dashboards?$expand=monthProfits,fiveNewOrders($expand=stylefer)",
          { params: { year: 2023 } }
        );
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(typeof data.MonthProfits);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" sx={{ height: "100vh" }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.TotalActiveRecipes}
            subtitle="Recipes Active"
            progress="0.3"
            increase="+30%"
            icon={
              <MenuBookIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.TotalActiveStyleFers}
            subtitle="StyleFers Active"
            progress="0.50"
            increase="+21%"
            icon={
              <PersonPinIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.TotalOrders}
            subtitle="Total Orders"
            progress="0.30"
            increase="+5%"
            icon={
              <AddCardIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.TotalRecipeTypes}
            subtitle="Recipe Types"
            progress="0.80"
            increase="+43%"
            icon={
              <FoodBankOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{ height: "65vh" }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ${data.CurrentMonthProfits}
              </Typography>
            </Box>
            {/* <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          <Box height="300px" m="-20px 0 0 0">
            <Apex dataChart={data.MonthProfits} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{ height: "65vh" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {data.FiveNewOrders && data.FiveNewOrders.map((transaction, i) => (
            <Box
              key={`${transaction.ID}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  Order ID: {transaction.ID}
                </Typography>
                <Typography 
                   color={colors.blueAccent[500]}
                   variant="h5"
                   fontWeight="400"
                  >
                    {transaction.StyleFer.Email}
                  </Typography>

                  <Typography color={colors.grey[100]}>
                   {transaction.OrderStatus === 0 ? "Failed" : "Success"}
                  </Typography>
              </Box>
              <Box color={colors.grey[100]}>{format(new Date(transaction.OrderedDate), 'dd/MM/yyyy')}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.Total}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
