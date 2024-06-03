"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Update from "./update";
import { getMembers } from "@/lib/getMembers";
export default function App() {
  let [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers().then((data: any) => {
      if (!data || data.error) {
        return console.error(data?.error);
      }
      setMembers(data);
      console.log("Members  : ", data);
    });
  }, []);

  return (
    <>
      <br></br>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
        {members.map((students: any) => (
          <div key={students.SRN}>
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
                  src={`https://source.unsplash.com/random/?sig=${students.SRN}`}
                  width={270}
                  height={180}
                  style={{
                    width: "270px",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
                <br></br>
                <Update member={students}></Update>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
