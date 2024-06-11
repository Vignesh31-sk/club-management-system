"use server";
const API = "http://localhost:8000/api/participants/";

export interface Participant {
  id: number;
  event_name?: string;
  name: string;
  email: string;
  mobile: string;
  semester: number;
  event: number;
}

export const createParticipant = async (participant: Participant) => {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: participant.name,
        email: participant.email,
        mobile: participant.mobile,
        semester: participant.semester,
        event: participant.event,
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
