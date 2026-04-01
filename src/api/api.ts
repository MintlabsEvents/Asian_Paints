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