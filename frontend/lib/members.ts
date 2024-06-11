"use server";
import axios from "axios";
export interface Member {
  SRN: string;
  name: string;
  email: string;
  mobile: string;
  semester: number;
  membership: number;
  club_name?: string;
  image: string | null;
}

const API = "http://localhost:8000/api/students/";

export const createMember = async (form: FormData) => {
  try {
    await axios
      .post(API, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch(async (error: any) => {
        throw Error(error);
      });

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

export const updateMember = async (updated: FormData, current: Member) => {
  try {
    await axios
      .put(`${API + current.SRN}/`, updated, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        throw Error(error);
      });
    return { tittle: "Congraulations !", message: "Updation Success" };
  } catch (error: any) {
    throw Error(error);
  }
};
