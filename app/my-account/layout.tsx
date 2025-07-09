"use client";

import Contact from "@/components/Screens/MyAccount/Contact";
import Links from "@/components/Screens/MyAccount/Links";
import TabMenu from "@/components/Screens/MyAccount/TabMenu";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-[10px]">
      <TabMenu />
      <div className="flex gap-x-6 mt-4">
        {children}
        <div className="max-w-[225px] w-full">
          <Links />
          <Contact />
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
