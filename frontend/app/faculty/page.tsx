"use client";
import React, { useEffect, useRef, useState } from "react";
// import Update from "./update";
import { useToast } from "@/components/ui/use-toast";
import { Faculty, getFaculty } from "@/lib/faculty";

export default function Facultys() {
  let [faculty, setFaculty] = useState<Faculty[]>([]);
  let [currentFaculty, setcurrentFaculty] = useState<Faculty | null>(null);
  const updateButtonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("UseEffect 1 !");
    getFaculty()
      .then((items: Faculty[]) => {
        setFaculty(items);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.message,
        });
      });
    console.log(faculty);
  }, []);

  useEffect(() => {
    console.log("UseEffect 2!");
    if (currentFaculty !== null) {
      console.log("Current Faculty Updated:", currentFaculty);
      // Trigger the update button click
      if (updateButtonRef.current) {
        updateButtonRef.current.click();
      }
    }
  }, [currentFaculty]);

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faculty.map((teacher) => (
            <article
              className="rounded-xl border border-neutral-700 bg-neutral-900 p-4"
              key={teacher.id}
            >
              <div className="flex items-center gap-4">
                <img
                  alt=""
                  src={
                    teacher.image ||
                    "https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                  }
                  className="h-20 w-20 rounded-full object-cover"
                />

                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-white">
                    {teacher.name}
                  </h3>

                  <div className="flow-root mt-1">
                    <ul className="-m-1 flex flex-wrap">
                      <li className="p-1 leading-none">
                        <a
                          href="#"
                          className="text-xs font-medium text-neutral-400"
                        >
                          {" "}
                          Twitter{" "}
                        </a>
                      </li>

                      <li className="p-1 leading-none">
                        <a
                          href="#"
                          className="text-xs font-medium text-neutral-400"
                        >
                          {" "}
                          GitHub{" "}
                        </a>
                      </li>

                      <li className="p-1 leading-none">
                        <a
                          href="#"
                          className="text-xs font-medium text-neutral-400"
                        >
                          Website
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <ul className="mt-4 space-y-1">
                {teacher.club_names.map((club, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block h-full rounded-lg border border-neutral-700 p-3 hover:border-primary"
                    >
                      <strong className="font-medium text-white">{club}</strong>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-4">
                <button
                  ref={updateButtonRef}
                  className="rounded-lg bg-red-600 p-2 text-xs font-medium text-white hover:bg-red-700"
                  onClick={() => setcurrentFaculty(teacher)}
                >
                  Update
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
