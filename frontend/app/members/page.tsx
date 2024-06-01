import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { notFound } from "next/navigation";
export default async function App() {
  const getClubs = async () => {
    const API = "http://localhost:8000/api/students";
    try {
      //! Removed caching, so that notfound() is shown when api is not working.
      const response = await fetch(`${API}`, { cache: "no-store" });
      console.log(`response : ${response}`);
      return await response.json();
    } catch (error: any) {
      console.error(error.message);
      return notFound();
    }
  };

  const data: any = await getClubs();

  return (
    <>
      <br></br>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
        {data.map((students: any) => (
          <div>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">
                  {students.club_name}
                </p>
                <small className="text-default-500">{students.SRN}</small>
                <h4 className="font-bold text-large">{students.name}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  isZoomed
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://nextui.org/images/hero-card-complete.jpeg"
                  width={270}
                />
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
