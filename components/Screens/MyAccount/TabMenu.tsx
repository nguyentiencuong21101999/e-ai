import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TabMenu = () => {
  const menu = [
    {
      label: "Personal Info",
      href: "info",
    },
    {
      label: "Deposit",
      href: "deposit",
    },
    {
      label: "Withdrawal",
      href: "withdrawal",
    },
    {
      label: "Transactions",
      href: "transactions",
    },
    {
      label: "My Entries",
      href: "my-entries",
    },
    {
      label: "Privacy & Notification",
      href: "privacy-notification",
    },
  ];

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <div className="px-5 py-6 bg-[#2B65A5] text-white">
      <h3 className="text-[24px] font-bold">My Account</h3>
      <ul className="ms-4 flex gap-x-6 mt-5">
        {menu.map((item) => (
          <li
            key={item.label}
            className={`text-[16px] px-4 py-[6px] rounded-[50px] whitespace-nowrap ${
              tab === item.href && "bg-[#073965]"
            }`}
          >
            <Link href={`/my-account?tab=${item.href}`}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabMenu;
