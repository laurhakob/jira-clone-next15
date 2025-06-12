// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useQuery } from "convex/react";
// import { api } from "../../convex/_generated/api";
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
// import { useCreateProject } from "@/features/projects/api/use-create-project";
// import { Id } from "../../convex/_generated/dataModel";

// export const ProjectSwitcher = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const workspaceId = searchParams.get("workspaceId") as Id<"workspaces"> | null;
//   const projectId = searchParams.get("projectId") as Id<"projects"> | null;

//   const projects = useQuery(
//     api.projects.get,
//     workspaceId ? { workspaceId } : "skip"
//   );

//   const createProject = useCreateProject();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);

//   const previewImageUrl = useQuery(
//     api.upload.getImageUrl,
//     imageId ? { storageId: imageId } : "skip"
//   );

//   const handleCreate = async () => {
//     if (!workspaceId || name.trim().length < 3) return;
//     const newProjectId = await createProject({
//       workspaceId,
//       name,
//       image: imageId ?? undefined,
//     });
//     setName("");
//     setImageId(null);
//     setIsModalOpen(false);
//     router.push(`/?workspaceId=${workspaceId}&projectId=${newProjectId}`);
//   };

//   if (!workspaceId) {
//     return null; // Don't show if no workspace is selected
//   }

//   if (projects === undefined) {
//     return <p>Loading projects...</p>;
//   }

//   return (
//     <div className="flex flex-col gap-y-2">
//       <div className="flex items-center justify-between">
//         <p className="text-xs uppercase text-neutral-500">Projects</p>
//         <RiAddCircleFill
//           className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
//           onClick={() => setIsModalOpen(true)}
//         />
//       </div>
//       <Select
//         value={projectId || undefined}
//         onValueChange={(value) =>
//           router.push(`/?workspaceId=${workspaceId}&projectId=${value}`)
//         }
//       >
//         <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
//           <SelectValue placeholder="No project selected" />
//         </SelectTrigger>
//         <SelectContent>
//           {projects.length === 0 ? (
//             <p className="text-sm text-neutral-500 p-2">No projects available</p>
//           ) : (
//             projects.map((project) => (
//               <SelectItem key={project._id} value={project._id}>
//                 <div className="flex items-center gap-2">
//                   {project.imageUrl && (
//                     <Image
//                       src={project.imageUrl}
//                       alt={project.name}
//                       width={24}
//                       height={24}
//                       className="rounded"
//                     />
//                   )}
//                   <span className="truncate">{project.name}</span>
//                 </div>
//               </SelectItem>
//             ))
//           )}
//         </SelectContent>
//       </Select>

//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent>
//           <DialogTitle>Create a Project</DialogTitle>
//           <DialogDescription>
//             Enter a name and optionally upload an image for your project.
//           </DialogDescription>
//           <Input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Project name"
//             minLength={3}
//             required
//           />
//           <FileUpload
//             onUploadComplete={(id) => setImageId(id as Id<"_storage">)}
//           />
//           {previewImageUrl && (
//             <div className="mt-2">
//               <Image
//                 src={previewImageUrl}
//                 alt="Preview"
//                 width={100}
//                 height={100}
//                 className="rounded border"
//               />
//             </div>
//           )}
//           <Button
//             className="bg-[#48909b] hover:bg-[#3d7f87]"
//             onClick={handleCreate}
//           >
//             Create
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };







// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useQuery } from "convex/react";
// import { api } from "../../convex/_generated/api";
// import { RiAddCircleFill } from "react-icons/ri";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "./ui/dialog";
// import { Input } from "./ui/input";
// import FileUpload from "@/features/upload/fileUpload";
// import { useCreateProject } from "@/features/projects/api/use-create-project";
// import { Id } from "../../convex/_generated/dataModel";

// export const ProjectSwitcher = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const workspaceId = searchParams.get("workspaceId") as Id<"workspaces"> | null;
//   const projectId = searchParams.get("projectId") as Id<"projects"> | null;

//   const projects = useQuery(
//     api.projects.get,
//     workspaceId ? { workspaceId } : "skip"
//   );

//   const createProject = useCreateProject();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);

//   const previewImageUrl = useQuery(
//     api.upload.getImageUrl,
//     imageId ? { storageId: imageId } : "skip"
//   );

//   const handleCreate = async () => {
//     if (!workspaceId || name.trim().length < 3) return;
//     const newProjectId = await createProject({
//       workspaceId,
//       name,
//       image: imageId ?? undefined,
//     });
//     setName("");
//     setImageId(null);
//     setIsModalOpen(false);
//     router.push(`/?workspaceId=${workspaceId}&projectId=${newProjectId}`);
//   };

//   if (!workspaceId) {
//     return null; // Don't show if no workspace is selected
//   }

//   if (projects === undefined) {
//     return <p>Loading projects...</p>;
//   }

//   return (
//     <div className="flex flex-col gap-y-2">
//       <div className="flex items-center justify-between">
//         <p className="text-xs uppercase text-neutral-500">Projects</p>
//         <RiAddCircleFill
//           className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
//           onClick={() => setIsModalOpen(true)}
//         />
//       </div>
//       {projects.length === 0 ? (
//         <p className="text-sm text-neutral-500">No projects available</p>
//       ) : (
//         projects.map((project) => (
//           <Button
//             key={project._id}
//             variant={projectId === project._id ? "secondary" : "ghost"}
//             className="w-full justify-start p-2 mb-1"
//             onClick={() =>
//               router.push(`/?workspaceId=${workspaceId}&projectId=${project._id}`)
//             }
//           >
//             {project.imageUrl && (
//               <Image
//                 src={project.imageUrl}
//                 alt={project.name}
//                 width={24}
//                 height={24}
//                 className="rounded mr-2"
//               />
//             )}
//             <span className="truncate">{project.name}</span>
//           </Button>
//         ))
//       )}

//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent>
//           <DialogTitle>Create a Project</DialogTitle>
//           <DialogDescription>
//             Enter a name and optionally upload an image for your project.
//           </DialogDescription>
//           <Input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Project name"
//             minLength={3}
//             required
//           />
//           <FileUpload
//             onUploadComplete={(id) => setImageId(id as Id<"_storage">)}
//           />
//           {previewImageUrl && (
//             <div className="mt-2">
//               <Image
//                 src={previewImageUrl}
//                 alt="Preview"
//                 width={100}
//                 height={100}
//                 className="rounded border"
//               />
//             </div>
//           )}
//           <Button
//             className="bg-[#48909b] hover:bg-[#3d7f87]"
//             onClick={handleCreate}
//           >
//             Create
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };




"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { RiAddCircleFill } from "react-icons/ri";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import FileUpload from "@/features/upload/fileUpload";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { Id } from "../../convex/_generated/dataModel";

export const ProjectSwitcher = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId") as Id<"workspaces"> | null;
  const projectId = searchParams.get("projectId") as Id<"projects"> | null;

  const projects = useQuery(
    api.projects.get,
    workspaceId ? { workspaceId } : "skip"
  );

  const createProject = useCreateProject();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);

  const previewImageUrl = useQuery(
    api.upload.getImageUrl,
    imageId ? { storageId: imageId } : "skip"
  );

  const handleCreate = async () => {
    if (!workspaceId || name.trim().length < 3) {
      alert("Project name must be at least 3 characters long");
      return;
    }
    const newProjectId = await createProject({
      workspaceId,
      name,
      image: imageId ?? undefined,
    });
    setName("");
    setImageId(null);
    setIsModalOpen(false);
    router.push(`/?workspaceId=${workspaceId}&projectId=${newProjectId}`);
  };

  if (!workspaceId) {
    return null; // Don't show if no workspace is selected
  }

  if (projects === undefined) {
    return <p>Loading projects...</p>;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      {projects.length === 0 ? (
        <p className="text-sm text-neutral-500">No projects available</p>
      ) : (
        projects.map((project) => (
          <Button
            key={project._id}
            variant={projectId === project._id ? "secondary" : "ghost"}
            className="w-full justify-start p-2 mb-1"
            onClick={() =>
              router.push(`/?workspaceId=${workspaceId}&projectId=${project._id}`)
            }
          >
            {project.imageUrl && (
              <Image
                src={project.imageUrl}
                alt={project.name}
                width={24}
                height={24}
                className="rounded mr-2"
              />
            )}
            <span className="truncate">{project.name}</span>
          </Button>
        ))
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogTitle>Create a Project</DialogTitle>
          <DialogDescription>
            Enter a name and optionally upload an image for your project.
          </DialogDescription>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
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