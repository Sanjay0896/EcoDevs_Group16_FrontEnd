import React, { useRef, useEffect } from "react";
import FeatureCard from "./components/feature-card";
import featuresData from "./data/features-data";
import Video from "./components/Video";

// import ExploreButton from "./components/explore-button";

export function Home() {
  const handleScroll = (anchor) => (e) => {
    e.preventDefault();
    document.querySelector(anchor).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* <Header /> */}
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
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
