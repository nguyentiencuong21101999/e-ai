import Link from "next/link";
import React from "react";

const Links = () => {
  const listLink = [
    {
      label: "How do I verify My Account online?",
      href: "#!",
    },
    {
      label: "Why is my account suspended?",
      href: "#!",
    },
    {
      label: "How do I close my account?",
      href: "#!",
    },
    {
      label: "All My Account Articles",
      href: "#!",
    },
  ];

  return (
    <div className="mb-4 p-4 bg-[#F0F1F2] space-y-[2px]">
      <p className="text-[16px] font-medium">Useful Links</p>

      {listLink.map((item, index) => (
        <div key={index}>
          <Link
            href={item.href}
            className="block py-4 text-blue-800 text-[11px]"
          >
            {item.label}
          </Link>
          {index === listLink.length - 1 ? null : (
            <div className="bg-gray-400 h-[1px] w-full" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Links;
