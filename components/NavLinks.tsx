import React from "react";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { DeveloperLink } from '@/components/exportComp'

interface Props {
  label: string;
  icon: StaticImageData;
  href: string
}
function Navlinks({ navlinks }: { navlinks: Props[]}) {
  return (
    <div className="hidden lg:flex items-center justify-between  space-x-8">
      {navlinks?.map((item) => (
        <Link href={item.href} key={item.label} className="text-semibold text-white hover:text-yellow-500">
          {item.label}
        </Link>
      ))}
      <DeveloperLink />
    </div>
  );
}

export default Navlinks;