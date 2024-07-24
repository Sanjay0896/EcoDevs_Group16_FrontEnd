import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";

// import { PageTitle, Footer } from "@/widgets/layout";
import FeatureCard from "./components/feature-card";
import featuresData from "./data/features-data";
import farmData from "./data/farm-data";

import teamData from "./data/team-data";
import contactData from "./data/contact-data";
import PageTitle from "./layout/page-title";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Video from "./components/Video";
import ContactUs from "./ContactUs";


export function Home() {
  const handleScroll = (anchor) => (e) => {
    e.preventDefault();
    document.querySelector(anchor).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div>
        <Video />
      </div>
      <div className="bg-sky-50">
        <div>
          <section className="-mt-32 bg-white px-4 pt-4">
            <div className="container mx-auto">
              <div className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuresData.map(
                  ({ color, title, icon, description }) => (
                    console.log(icon),
                    (
                      <FeatureCard
                        key={title}
                        color={color}
                        title={title}
                        icon={React.createElement(icon, {
                          className: "w-5 h-5 text-white",
                        })}
                        description={description}
                      />
                    )
                  )
                )}
              </div>
              <div className="mt-32 flex flex-wrap items-center">
                <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                    <FingerPrintIcon className="h-8 w-8 text-white " />
                  </div>
                  <Typography
                    variant="h3"
                    className="mb-3 font-bold"
                    color="blue-gray"
                    style={{ marginTop: "20px", fontSize: "35px" }}
                  >
                    Our Goal
                  </Typography>
                  <Typography className="mb-8 font-normal text-blue-gray-500">
                    In the heart of our mission lies the commitment to nurturing
                    a community where land and ambition thrive in unison. We are
                    building a platform that transforms every idle acre into a
                    beacon of sustainability and every harvest into a triumph of
                    shared prosperity. Our endeavor is to create a robust
                    network that extends from the soil to the dining table,
                    guaranteeing that the diligent work of every farmer is met
                    with just rewards.
                    <br />
                    <br />
                    At the forefront of our objectives is the battle against
                    hunger, striving to achieve the Sustainable Development Goal
                    of zero hunger. By integrating advanced digital storage
                    solutions and providing precise crop recommendations through
                    market and demographic analysis, we are paving the path to a
                    future where food security is guaranteed for everyone.
                  </Typography>
                  <Button variant="filled">read more</Button>
                </div>
                <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
                  <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                    <CardHeader floated={false} className="relative h-49">
                      <img
                        alt="Card Image"
                        src="/img/happy.jpg"
                        className="object-cover h-full w-full rounded-t-lg"
                        style={{ objectPosition: "center" }}
                      />
                    </CardHeader>
                    <CardBody>
                  
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-3 mt-2 font-bold text-center"
                      >
                        Nourishing the Future
                      </Typography>
                      {/* <Typography className="font-normal text-blue-gray-500">
                        The Arctic Ocean freezes every winter and much of the
                        sea-ice then thaws every summer, and that process will
                        continue whatever happens.
                      </Typography> */}
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="relative bg-white mt-28">
          <div className="container mx-auto">
            <PageTitle
              section="Start with Sustainability"
              heading="Embracing Sustainability"
            >
              In the face of today's climate challenges, experts like Ted
              Scambos from the National Oceanic and Atmospheric Administration
              inspire our commitment to sustainable land management. Our
              platform encourages practices that nourish our planet, leveraging
              cutting-edge agricultural technology to reduce environmental
              impact and pave the way for a sustainable future for all.{" "}
            </PageTitle>
            <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
              {contactData.map(({ title, icon, description }) => (
                <Card
                  key={title}
                  color="transparent"
                  shadow={false}
                  className="text-center text-blue-gray-900"
                >
                  <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                    {React.createElement(icon, {
                      className: "w-5 h-5 text-white",
                    })}
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {title}
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    {description}
                  </Typography>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section id="contact" className="h-screen">
        <ContactUs />
      </section>
    </>
  );
}

export default Home;
