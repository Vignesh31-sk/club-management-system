"use server";
export const updateMember = async (updated: any, current: any) => {
  console.log("Email : ", updated.email);
  console.log("Semester : ", updated.semester);
  console.log("Membership : ", updated.membership);
  console.log("SRN : ", current.SRN);
  try {
    const response = await fetch(
      `http://localhost:8000/api/students/${current.SRN}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SRN: current.SRN,
          name: current.name,
          email: updated.email,
          semester: updated.semester,
          membership: updated.membership,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw Error(JSON.stringify(errorData));
    }
    return { tittle: "Congraulations !", message: "Updation Success" };
  } catch (error: any) {
    throw Error(error);
  }
};
