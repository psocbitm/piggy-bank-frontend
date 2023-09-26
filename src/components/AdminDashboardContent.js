import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import AdminUsers from "./AdminUsers";
import AdminAccounts from "./AdminAccounts";
import AdminTransactions from "./AdminTransactions";

function AdminDashboardContent() {
  const type = useSelector((state) => state.dashboard.adminDashboardType);
  return (
    <Box>
      {type === "users" && <AdminUsers />}
      {type === "accounts" && <AdminAccounts />}
      {type === "transactions" && <AdminTransactions />}
    </Box>
  );
}

export default AdminDashboardContent;
