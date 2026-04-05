const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

/* =============================
   SUBMIT FORM DATA
============================= */
export const submitForm = async (formData: any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to submit form");
    }

    return await res.json();
  } catch (error) {
    console.error("Submit Error:", error);
    throw error;
  }
};


/* =============================
   DOWNLOAD PDF
============================= */
export const downloadPdf = async (fileId: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/download/${fileId}`);

    if (!res.ok) {
      throw new Error("Download failed");
    }

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "file.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Download error:", error);
  }
};