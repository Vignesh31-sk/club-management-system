"use server";

export interface Club {
  id: number;
  name: string;
  description: string;
  president: string | null;
  president_name?: string;
}

const API = "http://localhost:8000/api/clubs/";

export const getClubs = async () => {
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
