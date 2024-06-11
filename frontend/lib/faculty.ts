"use server";

export interface Faculty {
  id: number;
  club_names: string[];
  name: string;
  department: string;
  email: string;
  mobile: string;
  image: string | null;
  clubs: number[];
}

const API = "http://localhost:8000/api/faculties/";
export const getFaculty = async () => {
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
