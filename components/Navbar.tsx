'use client'

import Image from "next/image";
import React from "react";
import Logo from "@/public/img/Logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  {
    id: 1,
    href: '/top-up',
    label: "Top Up"
  },
  {
    id: 2,
    href: '/transaction',
    label: "Transaction"
  },
  {
    id: 3,
    href: '/profile',
    label: "Akun"
  },
]

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="border border-b border-[#b3b3b1]">
      <div className="max-w-[1230px] mx-auto flex justify-between items-center py-6">
        <div className="flex items-center gap-2">
          <Image src={Logo} width={20} height={32} alt="Logo Brand" />
          <Link href="/" className="text-[1.2rem] text-[#5e5e5e]">
            SIMS PPOB
          </Link>
        </div>

        <div className="flex items-center gap-10">
          {/* <Link href="/top-up" className="text-[#5e5e5e]">
            Top Up
          </Link>
          <Link href="/transaction" className="text-[#5e5e5e]">
            Transaction
          </Link> */}

          {nav.map(item => (
            <Link key={item.id} href={item.href} className={`${pathname === item.href && 'text-red-700'} text-[#5e5e5e]`}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
