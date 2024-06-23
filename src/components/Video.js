import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Typography } from "@material-tailwind/react";

const VideoContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: calc(100vh - 20vh);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
`;

const OverlayContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
`;

const VideoHeading = styled(Typography)`
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
`;

const VideoParagraph = styled(Typography)`
`;

const Video = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.controls = false;
    }
  }, []);

  return (
    <VideoContainer>
      <StyledVideo ref={videoRef} autoPlay loop muted playsInline>
        <source src="/video/bg_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </StyledVideo>

      <OverlayContent>
        <VideoHeading color="white" className="text-5xl font-black">
          Cultivating Connections, Harvesting Prosperity
        </VideoHeading>
        <VideoParagraph color="white" className="opacity-90 mt-5">
          Join us on a transformative journey into the intricate world of life,
          where fertile land meets purposeful cultivation. Together, we sow the
          seeds of prosperity, nurturing sustainable growth and shared abundance.
        </VideoParagraph>
      </OverlayContent>
    </VideoContainer>
  );
};

export default Video;