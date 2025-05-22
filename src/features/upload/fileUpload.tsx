// "use client";

// import { useMutation } from "convex/react";
// import { api } from "../../../convex/_generated/api";

// export default function FileUpload() {
//   const generateUploadUrl = useMutation(api.upload.generateUploadUrl);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const uploadUrl = await generateUploadUrl();

//     const result = await fetch(uploadUrl, {
//       method: "POST",
//       body: file,
//       headers: {
//         "Content-Type": file.type,
//       },
//     });

//     const { storageId } = await result.json();
//     console.log("File uploaded! Storage ID:", storageId);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//     </div>
//   );
// }

// es verjnakann er
// avelacnum enq image uploady

// src/features/upload/FileUpload.tsx

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



// import { useState } from "react";
// import { api } from "../../../convex/_generated/api";
// import { useMutation } from "convex/react";
// import { Id } from "../../../convex/_generated/dataModel";

// interface FileUploadProps {
//   workspaceId: Id<"workspaces">;
//   onUploadComplete: (imageId: Id<"_storage">) => void;
// }

// const FileUpload = ({ workspaceId, onUploadComplete }: FileUploadProps) => {
//   const [uploading, setUploading] = useState(false);

//   const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
//   const saveImageToWorkspace = useMutation(api.upload.saveImageToWorkspace);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);

//     try {
//       const uploadUrl = await generateUploadUrl();
//       const result = await fetch(uploadUrl, {
//         method: "POST",
//         body: file,
//         headers: {
//           "Content-Type": file.type,
//         },
//       });

//       const { storageId } = await result.json();
//       console.log("File uploaded! Storage ID:", storageId);

//       await saveImageToWorkspace({
//         workspaceId,
//         storageId: storageId as Id<"_storage">,
//       });

//       onUploadComplete(storageId as Id<"_storage">);
//     } catch (err) {
//       console.error("Upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} disabled={uploading} />
//       {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
//     </div>
//   );
// };

// export default FileUpload;




// "use client";

// import { useState } from "react";
// import { useMutation } from "convex/react";
// import { api } from "../../../convex/_generated/api";

// interface FileUploadProps {
//   onUploadComplete: (imageId: string) => void;
// }

// export default function FileUpload({ onUploadComplete }: FileUploadProps) {
//   const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setLoading(true);

//     const uploadUrl = await generateUploadUrl();

//     const result = await fetch(uploadUrl, {
//       method: "POST",
//       body: file,
//       headers: {
//         "Content-Type": file.type,
//       },
//     });

//     const { storageId } = await result.json();
//     console.log("File uploaded! Storage ID:", storageId);
//     onUploadComplete(storageId);
//     setLoading(false);
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       {loading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
//     </div>
//   );
// }
