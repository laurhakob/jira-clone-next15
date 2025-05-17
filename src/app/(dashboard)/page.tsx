// "use client";

// import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { useRouter } from "next/navigation";
// import { useEffect, useMemo } from "react";
// import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

// export default function Home() {
//   const [open, setOpen] = useCreateWorkspaceModal();

//   const { data, isLoading } = useGetWorkspaces();
//   const router = useRouter();

//   const workspaceId = useMemo(() => data?.[0]?._id, [data]);

//   useEffect(() => {
//     if (isLoading) return;

//     if (workspaceId) {
//       router.replace(`/workspace/${workspaceId}`);
//       console.log("Redirect to workspace");
//     } else if (!open) {
//       setOpen(true);
//     }
//   }, [workspaceId, isLoading, open, setOpen, router]);

//   return (
//     <>
//       {" "}
//       <div>This is a home page</div>
//       <CreateWorkspaceModal />
//     </>
//   );
// }



// chat gbtic workspacei hamar

"use client";

import { WorkspacePreview } from "@/features/workspaces/components/workspace-preview";


export default function Home() {
  return (
    <div>
      <div>This is a home page</div>
      <WorkspacePreview />
    </div>
  );
}
