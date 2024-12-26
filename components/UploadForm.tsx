'use client';
import { useRef } from "react";
// import { uploadFile } from "../utils/upload-action"; 

// export function UploadForm() {

//   return (
//     <form className="flex flex-col items-center justify-center" action={handleFormAction}>
//       <input name="file" type="file" required className="rounded-lg border-2 border-dashed p-4" />
//       <button type="submit" className="mt-4 rounded-lg bg-blue-500 p-2 text-white">
//         Upload
//       </button>
//     </form>
//   );
// } 

export default function UploadForm() {
  const fileInput = useRef<HTMLInputElement>(null);

  async function uploadFile(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (fileInput?.current?.files) {
        console.log(fileInput?.current?.files[0]);
    
        const formData = new FormData();
        Object.values(fileInput?.current?.files).forEach((file) => {
            formData.append("file", file);
        });
        
        const response = await fetch("/api/uploadPatientFile", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        console.log(result);
        if (result.success) {
          alert("Upload ok : " + result.name);
        } else {
          alert("Upload failed");
        }
    }
  }

  return (
    <form className="flex flex-col gap-4">
      <label>
        <span>Upload a file</span>
        <input type="file" name="file" ref={fileInput} />
      </label>
      <button type="submit" onClick={uploadFile}>
        Submit
      </button>
    </form>
  );
}