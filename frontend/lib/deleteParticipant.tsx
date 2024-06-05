"use server";
export const deleteParticipant = async (id: number) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/participants/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
