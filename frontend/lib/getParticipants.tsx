"use server";
export const getParticipants = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/participants", {
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
