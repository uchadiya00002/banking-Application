declare module "dashboard/Dashboard" {
  import type { ComponentType } from "react";

  const Dashboard: ComponentType;
  export default Dashboard;
}

declare module "transfers/Transfers" {
  import type { ComponentType } from "react";

  const Transfers: ComponentType<{
    onTransferComplete?: (message: string) => void;
  }>;

  export default Transfers;
}