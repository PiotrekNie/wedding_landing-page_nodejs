import React, { useState, useContext, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import ReactPlayer from "react-player/youtube";
import fluidType from "../fluid-typography";
import SCREENS from "../screens";
import ScrollDown from "../scrollDown";
import COLORS from "../colors";
import { MouseContext } from "../../context/mouse-context";

gsap.registerPlugin(ScrollTrigger);

const Mask: StyledComponent<"svg", Record<string, unknown>, {}, never> = styled.svg`
  ${tw`
      absolute top-0 left-0 w-full h-full flex justify-center pointer-events-none

    `}
`;

const Date: StyledComponent<"span", Record<string, unknown>, {}, never> = styled.span`
  ${fluidType("480px", SCREENS.xl, "28px", "40px")}

  ${tw`
    table mx-auto relative mb-12
  `}

  span {
    &:nth-of-type(2) {
      ${tw`
        px-8 relative
      `}

      &:before,
      &:after {
        content: "";
        transform: translateY(-50%);
        width: 2px;

        ${tw`
          block md:h-4 h-4 bg-black absolute top-1/2
          `}
      }

      &:before {
        left: 14px;
      }

      &:after {
        right: 14px;
      }
    }
  }
`;

const PlayButton: StyledComponent<"button", Record<string, unknown>, {}, never> = styled.button`
  transform: translate(-50%, calc(-50% + 10px));
  cursor: none;

  ${tw`
    bg-white shadow-darken hover:shadow-sm transition-shadow duration-150 ease-out rounded-full z-10 absolute left-1/2 top-1/2 flex items-center justify-center pl-1 xxl:w-20 md:w-16 xxl:h-20 md:h-16 w-10 h-10
  `}

  @media screen and (min-width: ${SCREENS.md}) {
    transform: translate(-50%, calc(-50% + 20px));
  }

  @media screen and (min-width: ${SCREENS.xxl}) {
    transform: translate(-50%, calc(-50% + 40px));
  }

  &:before {
    content: "";
    border-style: solid;
    border-color: transparent transparent transparent ${COLORS.yellow};
    border-width: 10px 0 10px 14px;

    ${tw`
      w-0 h-0
    `}

    @media (min-width: ${SCREENS.md}) {
      border-width: 15px 0 15px 22px;
    }
  }
`;

const Modal: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  ${tw`
    fixed w-full h-full top-0 left-0 flex items-center justify-center z-999 transition-opacity duration-300 ease-out
  `}
`;

const ModalContainer: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  max-width: 59rem;

  ${tw`
    bg-black mx-auto shadow-darken z-50 overflow-y-auto w-full
  `}
`;

const ModalClose: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  ${tw`
    absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50
  `}

  svg {
    ${tw`
      fill-current text-white
    `}
  }

  span {
    ${tw`
      text-sm
    `}
  }
`;

const ModalContent: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  padding-top: 56.25%;

  ${tw`
    relative overflow-hidden
  `}

  iframe {
    ${tw`
      border-none h-full left-0 absolute top-0  w-full
    `}
  }
`;

const ModalOverlay: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  ${tw`
    absolute w-full h-full bg-gray-900 opacity-50 backdrop-blur-xl
  `}
`;

const VideoDesktop: React.ComponentType<{}> = dynamic(() => import("./videoDesktop"), {
  ssr: false,
});
const VideoMobile: React.ComponentType<{}> = dynamic(() => import("./videoMobile"), { ssr: false });

export default function SectionVideo() {
  const {
    cursorChangeHandler,
  }: { cursorChangeHandler: (t: React.SetStateAction<string>) => void } = useContext(MouseContext);
  const sectionWrapper: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const isDesktop: boolean = useMediaQuery({ minWidth: SCREENS.md });
  const [currentVideo, setCurrentVideo]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState("");
  const [playing, setPlaying]: [
    boolean | undefined,
    React.Dispatch<React.SetStateAction<boolean | undefined>>,
  ] = useState();
  const [modal, setModal]: [
    boolean | undefined,
    React.Dispatch<React.SetStateAction<boolean | undefined>>,
  ] = useState();
  const url: string = `https://www.youtube.com/watch?v=${currentVideo}`;

  useEffect(() => {
    // GSAP
    const node: HTMLDivElement = sectionWrapper.current as HTMLDivElement;

    gsap.fromTo(
      node?.children,
      { y: "+=75", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: node,
          start: "top center",
        },
      },
    );
  }, []);

  return (
    <>
      <div ref={sectionWrapper}>
        <div className='relative'>
          {isDesktop && <VideoDesktop />}
          {!isDesktop && <VideoMobile />}
          <PlayButton
            onClick={() => {
              setCurrentVideo("uHgIJ0lOvPA");
              setPlaying(true);
              setModal(true);
            }}
            onMouseEnter={() => cursorChangeHandler("hovered-video")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </div>
        <Mask className='svg'>
          {/* eslint-disable max-len */}
          <clipPath id='mask' clipPathUnits='objectBoundingBox'>
            <path d='M0.991,0.543 q-0.008,0.017,-0.022,0.017 q-0.012,0,-0.019,-0.011 t-0.012,-0.036 l-0.003,0.007 q-0.017,0.039,-0.041,0.039 q-0.016,0,-0.027,-0.025 T0.854,0.473 q0,-0.036,0.011,-0.059 T0.913,0.366 q0.017,-0.012,0.025,-0.019 q0,-0.045,-0.008,-0.066 t-0.024,-0.02 q-0.026,0,-0.039,0.055 h-0.005 q0.005,-0.053,0.02,-0.082 t0.038,-0.029 q0.026,0,0.042,0.032 t0.016,0.091 v0.155 q0,0.044,0.008,0.044 q0.008,0,0.01,-0.031 h0.006 Q0.999,0.526,0.991,0.543 m-0.054,-0.178 q-0.026,0.028,-0.034,0.048 t-0.008,0.052 q0,0.027,0.005,0.043 a0.016,0.04,0,0,0,0.013,0.016 q0.011,0,0.024,-0.034 V0.365 M0.767,0.531 q0.011,-0.006,0.016,-0.019 t0.005,-0.04 v-0.136 q0,-0.037,-0.006,-0.058 T0.763,0.257 q-0.02,0,-0.032,0.057 v0.154 q0,0.029,0.004,0.042 t0.015,0.021 V0.546 H0.672 v-0.015 q0.011,-0.007,0.016,-0.02 t0.004,-0.037 v-0.184 q0,-0.028,-0.005,-0.041 t-0.018,-0.017 v-0.015 l0.056,-0.013 h0.006 v0.081 h0.001 q0.019,-0.081,0.049,-0.081 q0.019,0,0.032,0.033 t0.013,0.087 v0.144 q0,0.031,0.004,0.044 t0.016,0.02 V0.546 H0.767 v-0.015 m-0.06,0.153 H0.664 v0.19 q0,0.045,0.006,0.065 t0.018,0.02 q0.01,0,0.019,-0.026 l0.004,0.01 q-0.014,0.058,-0.042,0.058 q-0.021,0,-0.032,-0.027 t-0.012,-0.078 V0.684 H0.602 v-0.017 q0.024,-0.037,0.051,-0.121 H0.582 v-0.015 Q0.595,0.525,0.599,0.512 t0.004,-0.044 v-0.175 q0,-0.03,-0.005,-0.042 t-0.019,-0.019 v-0.015 l0.056,-0.013 h0.006 V0.475 q0,0.048,0.02,0.055 h0.002 v0.127 h0.043 v0.026 M0.623,0.114 a0.022,0.055,0,0,1,-0.016,-0.017 a0.023,0.059,0,0,1,-0.004,-0.015 l-0.013,0.04 h-0.006 c0,-0.004,0,-0.009,0,-0.013 q0,-0.038,-0.007,-0.062 T0.562,0.023 q-0.021,0,-0.021,0.096 v0.098 h0.029 v0.027 h-0.029 V0.456 q0,0.042,0.004,0.055 t0.022,0.02 V0.546 H0.477 v-0.015 q0.015,-0.005,0.02,-0.019 t0.005,-0.055 V0.244 H0.481 v-0.012 q0.011,-0.006,0.017,-0.022 t0.006,-0.06 q0.001,-0.045,0.005,-0.07 A0.053,0.135,0,0,1,0.521,0.038 Q0.537,0,0.571,0 q0.021,0,0.036,0.019 c0,-0.001,0.001,-0.001,0.001,-0.002 A0.022,0.056,0,0,1,0.623,0 a0.022,0.055,0,0,1,0.016,0.016 a0.021,0.054,0,0,1,0.007,0.04 a0.022,0.056,0,0,1,-0.007,0.041 A0.021,0.054,0,0,1,0.623,0.114 M0.571,0.696 q0.022,0.051,0.022,0.126 q0,0.076,-0.022,0.127 t-0.058,0.051 q-0.036,0,-0.059,-0.051 T0.431,0.822 q0,-0.047,0.01,-0.09 a0.067,0.171,0,0,1,0.028,-0.065 Q0.488,0.645,0.512,0.645 q0.036,0,0.059,0.051 M0.484,0.71 q-0.01,0.041,-0.01,0.119 q0,0.068,0.01,0.108 t0.028,0.04 q0.018,0,0.028,-0.041 t0.01,-0.114 q0,-0.073,-0.01,-0.114 t-0.028,-0.04 Q0.493,0.668,0.484,0.71 M0.38,0.555 a0.022,0.055,0,0,1,-0.016,-0.017 a0.023,0.058,0,0,1,-0.005,-0.019 c-0.002,0.003,-0.003,0.006,-0.005,0.009 a0.073,0.187,0,0,1,-0.025,0.026 a0.049,0.123,0,0,1,0.005,0.057 q0,0.065,-0.02,0.106 t-0.056,0.041 a0.199,0.506,0,0,1,-0.026,-0.004 v0.146 q0,0.034,0.005,0.05 t0.02,0.022 v0.015 H0.162 V0.972 q0.015,-0.008,0.02,-0.023 t0.005,-0.054 V0.561 q0,-0.035,-0.005,-0.048 a0.015,0.038,0,0,0,-0.003,-0.006 Q0.154,0.546,0.116,0.546 H0 v-0.015 q0.016,-0.011,0.021,-0.024 t0.005,-0.058 V0.123 q0,-0.034,-0.005,-0.048 T0,0.051 V0.036 H0.103 q0.056,0,0.089,0.072 t0.032,0.19 q0,0.112,-0.028,0.179 h0.055 Q0.241,0.436,0.241,0.384 q0,-0.077,0.021,-0.128 t0.051,-0.052 q0.028,0,0.046,0.04 t0.022,0.108 H0.283 c0,0.005,0,0.009,0,0.014 q0,0.067,0.013,0.109 a0.048,0.122,0,0,0,0.01,0.023 a0.059,0.151,0,0,1,0.006,0.009 A0.04,0.101,0,0,0,0.329,0.516 a0.048,0.123,0,0,0,0.029,-0.023 a0.021,0.054,0,0,1,0.007,-0.036 a0.022,0.056,0,0,1,0.016,-0.017 a0.022,0.055,0,0,1,0.016,0.016 A0.021,0.054,0,0,1,0.402,0.497 A0.022,0.057,0,0,1,0.4,0.523 a0.02,0.051,0,0,0,0.007,-0.011 q0.005,-0.014,0.005,-0.046 V0.09 q0,-0.035,-0.005,-0.05 t-0.019,-0.016 V0.009 L0.445,0 h0.006 V0.466 q0,0.033,0.004,0.045 t0.019,0.02 V0.546 H0.392 A0.021,0.054,0,0,1,0.38,0.555 M0.155,0.126 q-0.021,-0.061,-0.059,-0.061 H0.07 V0.457 q0,0.033,0.008,0.046 t0.025,0.014 q0.035,0,0.054,-0.059 t0.019,-0.166 Q0.176,0.187,0.155,0.126 M0.339,0.332 q-0.001,-0.046,-0.009,-0.076 T0.31,0.227 q-0.012,0,-0.019,0.029 t-0.008,0.076 M0.276,0.537 a0.068,0.174,0,0,1,-0.014,-0.026 a0.037,0.094,0,0,0,-0.013,-0.006 H0.232 V0.724 a0.051,0.129,0,0,0,0.015,0.006 q0.018,0,0.029,-0.03 t0.01,-0.084 Q0.286,0.568,0.276,0.537 M0.399,0.645 V0.916 q0,0.049,0.021,0.056 v0.015 H0.339 V0.972 q0.013,-0.006,0.017,-0.019 t0.004,-0.044 V0.734 q0,-0.03,-0.005,-0.042 t-0.019,-0.019 v-0.015 L0.393,0.645 m0.375,0 v0.105 h0.001 q0.018,-0.105,0.043,-0.105 q0.013,0,0.023,0.028 l-0.009,0.099 q-0.018,-0.043,-0.029,-0.043 a0.027,0.07,0,0,0,-0.015,0.01 q-0.006,0.01,-0.014,0.037 v0.135 q0,0.032,0.004,0.043 t0.018,0.018 v0.015 H0.713 V0.972 q0.013,-0.008,0.017,-0.02 t0.004,-0.041 V0.737 q0,-0.031,-0.006,-0.046 t-0.018,-0.018 v-0.015 L0.768,0.645' />
          </clipPath>
          {/* eslint-enable max-len */}
        </Mask>
        <Date>
          <span>15</span>
          <span>07</span>
          <span>22</span>
        </Date>
        <ScrollDown />
      </div>
      <Modal className={`modal ${modal ? "show" : "opacity-0 pointer-events-none"}`}>
        <ModalOverlay
          onClick={() => {
            setModal(false);
            setPlaying(false);
            setCurrentVideo("");
          }}
        />
        <ModalContainer className='modal-container'>
          <ModalClose
            onClick={() => {
              setModal(false);
              setPlaying(false);
              setCurrentVideo("");
            }}>
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'>
              <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z' />
            </svg>
            <span>(Zamknij)</span>
          </ModalClose>
          <ModalContent>
            <ReactPlayer
              className='react-player'
              url={url}
              playing={playing}
              controls={false}
              stopOnUnmount
              width='100%'
              height='100%'
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
}
// eslint-disable-next-line max-len
