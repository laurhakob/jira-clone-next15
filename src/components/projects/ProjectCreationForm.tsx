"use client";

import { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/features/upload/fileUpload";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

interface ProjectCreationFormProps {
  workspaceId: Id<"workspaces">;
  onSubmit: (data: { name: string; image?: Id<"_storage">; workspaceId: Id<"workspaces"> }) => void;
  onClose: () => void;
}

export default function ProjectCreationForm({
  workspaceId,
  onSubmit,
  onClose,
}: ProjectCreationFormProps) {
  const [name, setName] = useState("");
  const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);

  const previewImageUrl = useQuery(
    api.upload.getImageUrl,
    imageId ? { storageId: imageId } : "skip"
  );

  const handleSubmit = () => {
    if (name.trim().length < 3) {
      toast.error("Project name must be at least 3 characters long");
      return;
    }
    // Pass workspaceId to onSubmit along with name and image
    onSubmit({ name, image: imageId ?? undefined, workspaceId });
    setName(""); // Reset form
    setImageId(null);
    onClose(); // Close the modal/form after submission
  };

  return (
    <div className="space-y-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
        minLength={3}
        required
      />
      <FileUpload onUploadComplete={(id) => setImageId(id as Id<"_storage">)} />
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
      <Button onClick={handleSubmit}>Create Project</Button>
    </div>
  );
}