"use server";
export const createMember = async (member: any, id: number) => {
  console.log("Name : ", member.Name);
  console.log("SRN : ", member.SRN);
  console.log("Email : ", member.email);
  console.log("Semester : ", member.semester);
  console.log("Membership : ", id);
  try {
    const response = await fetch(`http://localhost:8000/api/students/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SRN: member.SRN,
        name: member.Name,
        email: member.email,
        semester: member.semester,
        membership: id,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw Error(JSON.stringify(errorData));
    }
    return {
      tittle: "Congradulations !",
      message: "We have added you to the CLub !",
    };
  } catch (error: any) {
    throw Error(error);
  }
};
