declare module "dashboard/Dashboard" {
  import type { ComponentType } from "react";

  const Dashboard: ComponentType;
  export default Dashboard;
}

declare module "transactions/Transactions" {
  import type { ComponentType } from "react";

  const Transactions: ComponentType;
  export default Transactions;
}

declare module "transfers/Transfers" {
  import type { ComponentType } from "react";

  const Transfers: ComponentType<{
    onTransferComplete?: (message: string) => void;
  }>;

  export default Transfers;
}

declare module "profile/Profile" {
  import type { ComponentType } from "react";

  const Profile: ComponentType;
  export default Profile;
}
