"use client";

import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { data: user, isLoading } = useCurrentUser();
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // The useEffect will handle the redirect
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar Container with fixed width and no shrinking */}
      <div className="lg:w-[264px] lg:min-w-[264px] lg:max-w-[264px] flex-shrink-0 bg-neutral-100 p-4 overflow-y-auto hidden lg:block">
        <Sidebar />
      </div>
      {/* Main Content with flexible width */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 py-8 px-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;