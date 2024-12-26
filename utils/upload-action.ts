export async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileInput: any
  ) {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("file", fileInput?.current?.files?.[0]!);

    const response = await fetch("/api/uploadPatientFile", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log(result);
}