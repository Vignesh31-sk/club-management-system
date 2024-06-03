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
import { getClubs } from "@/lib/getClubs";
import { useToast } from "@/components/ui/use-toast";

export default function Clubs() {
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true })
  );

  let [clubs, setClubs] = React.useState([]);
  const { toast } = useToast();

  React.useEffect(() => {
    getClubs()
      .then((data: any) => {
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

  return (
    <div className="flex justify-center min-h-screen items-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-4xl h-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {clubs.map((club: any) => (
            <CarouselItem key={club.id}>
              <div className="flex justify-between h-full">
                <Card className="w-full h-full">
                  <CardContent className="h-full">
                    <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 h-full">
                      <img
                        alt=""
                        src={`https://source.unsplash.com/random/?sig=${club.id}`}
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

                        <a
                          className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white"
                          href="#"
                        >
                          Apply Now
                        </a>

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
  );
}
