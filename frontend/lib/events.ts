"use server";

export interface Event {
  id: number;
  club_name: string;
  name: string;
  location: string;
  date: string;
  host: string;
  club: number;
}

const API = "http://localhost:8000/api/events/";
export const getEvents = async () => {
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
