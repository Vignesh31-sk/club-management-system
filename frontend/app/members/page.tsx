"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Update from "./update";
import { getMembers } from "@/lib/getMembers";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function Members() {
  let [members, setMembers] = useState([]);
  let [currentMember, setcurrentMember] = useState(null);
  const updateButtonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("UseEffect 1 !");
    getMembers()
      .then((items: any) => {
        setMembers(items);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.message,
        });
      });
    console.log(members);
  }, []);

  useEffect(() => {
    console.log("UseEffect 2!");
    if (currentMember !== null) {
      console.log("Current Member Updated:", currentMember);
      // Trigger the update button click
      if (updateButtonRef.current) {
        updateButtonRef.current.click();
      }
    }
  }, [currentMember]);

  return (
    <>
      <br></br>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
        {members.map((students: any, index) => (
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
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setcurrentMember(members[index]);
                  }}
                >
                  Update
                </Button>
              </CardBody>
            </Card>
          </div>
        ))}
        {currentMember && (
          <Update member={currentMember} triggerUpdate={updateButtonRef} />
        )}
      </div>
    </>
  );
}
