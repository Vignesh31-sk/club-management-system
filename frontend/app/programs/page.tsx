"use client";
import { Event, getEvents } from "@/lib/events";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import CreateParticipants from "./create";

const Events = () => {
  let [events, setEvents] = useState<Event[]>([]);
  let [currentEvent, setcurrentEvent] = useState<number | null>(null);
  const updateButtonRef = React.useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("UseEffect 1 !");
    getEvents()
      .then((items: Event[]) => {
        setEvents(items);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.message,
        });
      });
    console.log(events);
  }, []);

  React.useEffect(() => {
    console.log("UseEffect 2!");
    if (currentEvent !== null) {
      console.log("Current Event Updated:", currentEvent);
      // Trigger the update button click
      if (updateButtonRef.current) {
        updateButtonRef.current.click();
      }
    }
  }, [currentEvent]);

  return (
    <>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
          {events.map((item) => (
            <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 sm:px-8">
                <h2 className="text-lg font-medium text-red-900">
                  {item.club_name}
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 text-gray-700">{item.name}</p>

                {/* <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {" "}
                    20${" "}
                  </strong>

                  <span className="text-sm font-medium text-gray-700">
                    /month
                  </span>
                </p> */}

                <button
                  className="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                  onClick={() => setcurrentEvent(item.id)}
                >
                  Apply now
                </button>
              </div>

              <div className="p-6 sm:px-8">
                <p className="text-lg font-medium text-gray-900 sm:text-xl">
                  What's included:
                </p>

                <ul className="mt-2 space-y-2 sm:mt-4">
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700">
                      {" "}
                      Networking Oppurtunities{" "}
                    </span>
                  </li>

                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700"> Attendence </span>
                  </li>

                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700"> Faculty support </span>
                  </li>

                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700"> Industrial Exposure </span>
                  </li>

                  {/* <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>

                    <span className="text-gray-700"> Phone support </span>
                  </li>

                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>

                    <span className="text-gray-700"> Community access </span>
                  </li> */}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {currentEvent && (
        <CreateParticipants
          event_id={currentEvent}
          triggerUpdate={updateButtonRef}
        ></CreateParticipants>
      )}
    </>
  );
};

export default Events;
