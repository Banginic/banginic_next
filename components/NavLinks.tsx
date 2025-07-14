import React from "react";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface Props {
  label: string;
  icon: StaticImageData;
  href: string
}
function Navlinks({ navlinks }: { navlinks: Props[]}) {
  return (
    <div className="hidden md:flex items-center justify-between  space-x-8">
      {navlinks?.map((item) => (
        <Link href={item.href} key={item.label} className="text-semibold hover:text-yellow-500">
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default Navlinks;