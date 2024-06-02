"use server";
export const updateMember = async (member: any, SRN: string) => {
  console.log(member.email);
  console.log(member.semester);
  console.log(member.membership);
  console.log(SRN);
  try {
    const response = await fetch(`http://localhost:8000/api/students/${SRN}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: member.email,
        semester: member.semester,
        membership: member.membership,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.non_field_errors)
        return { message: errorData?.non_field_errors };
      else return { mesage: response.statusText };
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return { message: "Updation Success" };
    } else {
      throw new Error("Unexpected response format (not JSON).");
    }
  } catch (error: any) {
    console.log(error);
  }
};
