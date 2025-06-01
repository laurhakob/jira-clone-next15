// import { Navbar } from "@/components/navbar";
// import { Sidebar } from "@/components/sidebar";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// const DashboardLayout = ({ children }: DashboardLayoutProps) => {
//   return (
//     <div className="min-h-screen ">
//       <div className="flex w-full h-full">
//         <div className="left-0 top-0 lg:flex hidden lg:w-[264px] h-full overflow-y-auto">
//           <Sidebar />
//         </div>
//         {/* stex grac er className="lg:pl-[264px] w-full */}
//         <div className="w-full">
//           <div className="mx-auto max-w-screen-2xl h-full">
//             <Navbar />
//             <main className="h-full py-8 px-6 flex flex-col">{children}</main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default DashboardLayout;



// ireakany naxordn a, esi update versia a log outi hamar 




// es amenalavn a
"use client";

import { useCurrentUser } from "@/features/auth/api/use-current-user"; // Adjust path
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
    <div className="min-h-screen">
      <div className="flex w-full h-full">
        <div className="left-0 top-0 lg:flex hidden lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

