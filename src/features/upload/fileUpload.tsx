"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface FileUploadProps {
  onUploadComplete: (imageId: string) => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadUrl = await generateUploadUrl();

    const result = await fetch(uploadUrl, {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    const { storageId } = await result.json();
    console.log("File uploaded! Storage ID:", storageId);

    onUploadComplete(storageId); // notify parent
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}

