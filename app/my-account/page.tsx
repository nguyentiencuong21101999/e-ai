"use client";

import MyAccount from "@/components/Screens/MyAccount/Main";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function DepositPage() {
  useScrollToTop()
  
  return <MyAccount />;
}
