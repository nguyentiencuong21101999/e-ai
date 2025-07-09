import { useSearchParams } from "next/navigation";
import {
  Deposit,
  Info,
  PrivacyAndNotification,
  Withdrawal,
  Transactions,
} from "./Tab";

const MyAccount = () => {
  const param = useSearchParams();
  const tab = param.get("tab");

  return (
    <div className="flex-1">
      {tab === "info" ? (
        <Info />
      ) : tab === "deposit" ? (
        <Deposit />
      ) : tab === "withdrawal" ? (
        <Withdrawal />
      ) : tab === "transactions" ? (
        <Transactions />
      ) : tab === "privacy-notification" ? (
        <PrivacyAndNotification />
      ) : (
        <Info />
      )}
    </div>
  );
};

export default MyAccount;
