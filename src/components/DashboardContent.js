import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import CreateAccount from "./CreateAccount";
import AccountSummary from "./AccountSummary";
import ManagePayees from "./ManagePayees";

function DashboardContent() {
  const type = useSelector((state) => state.dashboard.dashboardType);
  return <Box>
    {type === "create-account" && <CreateAccount />}
    {type === "account-summary" && <AccountSummary />}
    {
        type === "manage-payees" && <ManagePayees/>
    }
  </Box>;
}

export default DashboardContent;
