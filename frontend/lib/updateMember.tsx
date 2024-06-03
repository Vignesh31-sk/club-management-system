"use server";
export const updateMember = async (member: any, SRN: string) => {
  console.log("Email : ", member.email);
  console.log("Semester : ", member.semester);
  console.log("Membership : ", member.membership);
  console.log("SRN : ", SRN);
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
      if (errorData.non_field_errors) throw Error(errorData?.non_field_errors);
      else throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (!(contentType && contentType.includes("application/json"))) {
      throw new Error("Unexpected response format (not JSON).");
    }
    return { message: "Updation Success" };
  } catch (error: any) {
    throw Error(error);
  }
};
