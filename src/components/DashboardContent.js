import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import CreateAccount from "./CreateAccount";
import AccountSummary from "./AccountSummary";
import ManagePayees from "./ManagePayees";
import Transfer from "./Transfer";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import TransactionHistory from "./TransactionHistory";

function DashboardContent() {
  const type = useSelector((state) => state.dashboard.dashboardType);
  return (
    <Box>
      {type === "create-account" && <CreateAccount />}
      {type === "account-summary" && <AccountSummary />}
      {type === "manage-payees" && <ManagePayees />}
      {type === "transfer" && <Transfer />}
      {type === "withdraw" && <Withdraw />}
      {type === "deposit" && <Deposit />}
      {type === "transaction-history" && <TransactionHistory />}
    </Box>
  );
}

export default DashboardContent;
