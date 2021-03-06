import React from "react";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";

const Video: StyledComponent<"video", Record<string, unknown>, {}, never> = styled.video`
  transform: translate(-50%, -50%);

  ${tw`
    block mx-auto w-full absolute left-1/2 top-1/2
  `}
`;

const VideoContainer: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  clip-path: url(#mask);
  padding-top: 41.25%;

  ${tw`
    relative w-full lg:mb-8 mb-6
  `}
`;

export default function VideoMobile() {
  return (
    <VideoContainer>
      <Video autoPlay playsInline muted loop preload='true' poster='images/video.webp'>
        <source src='/videos/noWedding-Folwark.mp4' />
      </Video>
    </VideoContainer>
  );
}
