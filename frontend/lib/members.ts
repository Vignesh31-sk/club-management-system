"use server";

export interface Member {
  SRN: string;
  name: string;
  email: string;
  mobile: string;
  semester: number;
  membership: number;
  club_name?: string;
}

const API = "http://localhost:8000/api/students/";

export const createMember = async (member: Member) => {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SRN: member.SRN,
        name: member.name,
        email: member.email,
        mobile: member.mobile,
        semester: member.semester,
        membership: member.membership,
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

export const getMembers = async () => {
  try {
    const response = await fetch(API, { cache: "no-cache" });
    console.log(`response : ${response}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw Error(JSON.stringify(errorData));
    }
    return await response.json();
  } catch (e: any) {
    throw Error(e);
  }
};

export const updateMember = async (updated: Member, current: Member) => {
  console.log("Email : ", updated.email);
  console.log("Semester : ", updated.semester);
  console.log("Membership : ", updated.membership);
  console.log("SRN : ", current.SRN);
  try {
    const response = await fetch(`${API + current.SRN}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SRN: current.SRN,
        name: updated.name,
        email: updated.email,
        mobile: updated.mobile,
        semester: updated.semester,
        membership: updated.membership,
      }),
    });

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
