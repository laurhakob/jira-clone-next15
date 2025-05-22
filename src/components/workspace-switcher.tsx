// yntir code GROK-ov bayc home page um der workspace tablen a databasaov


// "use client";

// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { RiAddCircleFill } from "react-icons/ri";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";

// export const WorkspaceSwitcher = () => {
//   const { data: workspaces, isLoading } = useGetWorkspaces();

//   if (isLoading) {
//     return (
//       <div className="flex flex-col gap-y-2">
//         <div className="flex items-center justify-between">
//           <p className="text-xs uppercase text-neutral-500">Workspaces</p>
//           <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
//         </div>
//         <p>Loading workspaces...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-y-2">
//       <div className="flex items-center justify-between">
//         <p className="text-xs uppercase text-neutral-500">Workspaces</p>
//         <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
//       </div>
//       <Select
//         onValueChange={(value) => console.log("Selected workspace ID:", value)}
//       >
//         <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
//           <SelectValue placeholder="No workspace selected" />
//         </SelectTrigger>
//         <SelectContent>
//           {workspaces?.length === 0 ? (
//             <p className="text-sm text-neutral-500 p-2">No workspaces available</p>
//           ) : (
//             workspaces?.map((workspace) => (
//               <SelectItem key={workspace._id} value={workspace._id}>
//                 <div className="flex items-center gap-2">
//                   {workspace.imageUrl && (
//                     <img
//                       src={workspace.imageUrl}
//                       alt={workspace.name}
//                       className="w-6 h-6 rounded"
//                     />
//                   )}
//                   <span className="truncate">{workspace.name}</span>
//                 </div>
//               </SelectItem>
//             ))
//           )}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };




// updated version with GROK for sidebar workspaces and homepage only current workspace

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
// import { RiAddCircleFill } from "react-icons/ri";
// import Image from "next/image";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "./ui/dialog";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import FileUpload from "@/features/upload/fileUpload";
// import { Id } from "../../convex/_generated/dataModel";

// export const WorkspaceSwitcher = () => {
//   const router = useRouter();
//   const { data: workspaces, isLoading } = useGetWorkspaces();
//   const createWorkspace = useCreateWorkspace(); // This is a function, not an object

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);

//   const handleCreate = async () => {
//     if (name.trim().length < 3) return;
//     const newWorkspaceId = await createWorkspace({
//       name,
//       image: imageId ?? undefined,
//     });
//     setName("");
//     setImageId(null);
//     setIsModalOpen(false);
//     router.push(`/?workspaceId=${newWorkspaceId}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col gap-y-2">
//         <div className="flex items-center justify-between">
//           <p className="text-xs uppercase text-neutral-500">Workspaces</p>
//           <RiAddCircleFill
//             className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
//             onClick={() => setIsModalOpen(true)}
//           />
//         </div>
//         <p>Loading workspaces...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-y-2">
//       <div className="flex items-center justify-between">
//         <p className="text-xs uppercase text-neutral-500">Workspaces</p>
//         <RiAddCircleFill
//           className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
//           onClick={() => setIsModalOpen(true)}
//         />
//       </div>
//       <Select
//         onValueChange={(value) => router.push(`/?workspaceId=${value}`)}
//       >
//         <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
//           <SelectValue placeholder="No workspace selected" />
//         </SelectTrigger>
//         <SelectContent>
//           {workspaces?.length === 0 ? (
//             <p className="text-sm text-neutral-500 p-2">No workspaces available</p>
//           ) : (
//             workspaces?.map((workspace) => (
//               <SelectItem key={workspace._id} value={workspace._id}>
//                 <div className="flex items-center gap-2">
//                   {workspace.imageUrl && (
//                     <Image
//                       src={workspace.imageUrl}
//                       alt={workspace.name}
//                       width={24}
//                       height={24}
//                       className="rounded"
//                     />
//                   )}
//                   <span className="truncate">{workspace.name}</span>
//                 </div>
//               </SelectItem>
//             ))
//           )}
//         </SelectContent>
//       </Select>

//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent>
//           <DialogTitle>Create a Workspace</DialogTitle>
//           <DialogDescription>
//             Enter a name and optionally upload an image for your workspace.
//           </DialogDescription>
//           <Input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Workspace name"
//             minLength={3}
//             required
//           />
//           <FileUpload
//             onUploadComplete={(id) => setImageId(id as Id<"_storage">)}
//           />
//           <Button onClick={handleCreate}>Create</Button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };




// shat kavn a GROK-ov


"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { RiAddCircleFill } from "react-icons/ri";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import FileUpload from "@/features/upload/fileUpload";
import { Id } from "../../convex/_generated/dataModel";

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");
  const { data: workspaces, isLoading } = useGetWorkspaces();
  const createWorkspace = useCreateWorkspace();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);

  const previewImageUrl = useQuery(
    api.upload.getImageUrl,
    imageId ? { storageId: imageId } : "skip"
  );

  const handleCreate = async () => {
    if (name.trim().length < 3) return;
    const newWorkspaceId = await createWorkspace({
      name,
      image: imageId ?? undefined,
    });
    setName("");
    setImageId(null);
    setIsModalOpen(false);
    router.push(`/?workspaceId=${newWorkspaceId}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase text-neutral-500">Workspaces</p>
          <RiAddCircleFill
            className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <p>Loading workspaces...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <Select
        value={workspaceId || undefined}
        onValueChange={(value) => router.push(`/?workspaceId=${value}`)}
      >
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.length === 0 ? (
            <p className="text-sm text-neutral-500 p-2">No workspaces available</p>
          ) : (
            workspaces?.map((workspace) => (
              <SelectItem key={workspace._id} value={workspace._id}>
                <div className="flex items-center gap-2">
                  {workspace.imageUrl && (
                    <Image
                      src={workspace.imageUrl}
                      alt={workspace.name}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                  )}
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogTitle>Create a Workspace</DialogTitle>
          <DialogDescription>
            Enter a name and optionally upload an image for your workspace.
          </DialogDescription>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workspace name"
            minLength={3}
            required
          />
          <FileUpload
            onUploadComplete={(id) => setImageId(id as Id<"_storage">)}
          />
          {previewImageUrl && (
            <div className="mt-2">
              <Image
                src={previewImageUrl}
                alt="Preview"
                width={100}
                height={100}
                className="rounded border"
              />
            </div>
          )}
          <Button
            className="bg-[#48909b] hover:bg-[#3d7f87]"
            onClick={handleCreate}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};