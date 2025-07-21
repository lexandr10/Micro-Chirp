"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { getAccessToken, removeAccessToken } from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    setIsAuthenticated(!!token)
  }, [])

  const handleLogout = async () => {
    try {
      await authService.logout();
      removeAccessToken();
      setIsAuthenticated(false)
      toast.success("Logged out successfully");
      router.push("/auth/login");

      
    } catch (error) {
      toast.error("Failed to logout");
      
    }
  }

  return (
    <header className="bg-white shadow mb-6">
      <div className="container mx-auto flex justify-center gap-8 p-4">
        <NavLink href="/" label="All Chirps" activePath={pathname} />
        <NavLink href="/dashboard" label="My Chirps" activePath={pathname} />
        <NavLink href="/auth/login" label="Auth" activePath={pathname} />
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition-colors font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  activePath: string | null;
}

function NavLink({ href, label, activePath }: NavLinkProps) {
  const isActive = activePath === href;

  return (
    <Link
      href={href}
      className={`transition-colors font-medium ${
        isActive
          ? "text-blue-600 font-semibold"
          : "text-gray-800 hover:text-blue-600"
      }`}
    >
      {label}
    </Link>
  );
}
