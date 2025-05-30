import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen ">
      <div className="flex w-full h-full">
        <div className="left-0 top-0 lg:flex hidden lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        {/* stex grac er className="lg:pl-[264px] w-full */}
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
