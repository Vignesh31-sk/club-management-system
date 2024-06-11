"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";
import CreateMember from "./create";
import { Club, getClubs } from "@/lib/clubs";

export default function Clubs() {
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true })
  );

  let [clubs, setClubs] = React.useState<Club[]>([]);
  let [currentClub, setcurrentClub] = React.useState<number | null>(null);
  const { toast } = useToast();
  const updateButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    getClubs()
      .then((data: Club[]) => {
        setClubs(data);
      })
      .catch((e) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: e?.message,
        });
      });
    console.log(clubs);
  }, []);

  React.useEffect(() => {
    console.log("UseEffect 2!");
    if (currentClub !== null) {
      console.log("Current Club Updated:", currentClub);
      // Trigger the update button click
      if (updateButtonRef.current) {
        updateButtonRef.current.click();
      }
    }
  }, [currentClub]);

  return (
    <>
      <div className="flex justify-center min-h-screen items-center">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-4xl h-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {clubs.map((club: Club) => (
              <CarouselItem key={club.id}>
                <div className="flex justify-between h-full">
                  <Card className="w-full h-full">
                    <CardContent className="h-full">
                      <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 h-full">
                        <img
                          alt=""
                          src={
                            club.image ||
                            `https://random-image-pepebigotes.vercel.app/api/random-image/`
                          }
                          className="h-full w-full object-cover md:h-full"
                        />

                        <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8 flex flex-col justify-center h-full">
                          <p className="text-sm font-semibold uppercase tracking-widest cursive">
                            {club?.president_name}
                          </p>

                          <h2 className="mt-6 font-black uppercase">
                            <span className="text-4xl font-black sm:text-5xl lg:text-6xl">
                              {club.name}
                            </span>

                            <span className="mt-2 block text-sm">
                              <p className="max-h-20 overflow-auto">
                                {club.description}
                              </p>
                            </span>
                          </h2>

                          <button
                            className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white"
                            onClick={() => {
                              setcurrentClub(club.id);
                            }}
                          >
                            Apply Now
                          </button>

                          <p className="mt-8 text-xs font-medium uppercase text-gray-400">
                            Offer valid until 24th March, 2021 *
                          </p>
                        </div>
                      </section>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {currentClub && (
        <CreateMember
          club_id={currentClub}
          triggerUpdate={updateButtonRef}
        ></CreateMember>
      )}
    </>
  );
}
