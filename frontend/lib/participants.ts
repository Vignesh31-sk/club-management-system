"use server";
const API = "http://localhost:8000/api/participants/";

export interface Participant {
  id: number;
  event_name: string;
  name: string;
  email: string;
  mobile: string;
  semester: number;
  event: number;
}

export const getParticipants = async () => {
  try {
    const response = await fetch(API, {
      cache: "no-cache",
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw Error(JSON.stringify(errorData));
    }
    console.log(response);
    return await response.json();
  } catch (e: any) {
    throw Error(e);
  }
};

export const deleteParticipant = async (id: number) => {
  try {
    const response = await fetch(API + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw Error(JSON.stringify(errorData));
    }
    return { message: "Deletion Successful" };
  } catch (error: any) {
    throw Error(error);
  }
};
