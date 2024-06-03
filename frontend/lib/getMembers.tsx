"use server";
const API = "http://localhost:8000/api/students";
export const getMembers = async () => {
  try {
    const response = await fetch(`${API}`, { cache: "no-cache" });
    console.log(`response : ${response}`);
    return await response.json();
  } catch (e: any) {
    throw Error(e);
  }
};

/**
 * https://www.youtube.com/watch?v=GgvE5fkIs9o
 */
