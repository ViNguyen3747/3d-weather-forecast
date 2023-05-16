import { useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import Models from "./Models";

const DAY_SKY = `linear-gradient(
    0deg,
  hsl(301deg 100% 88%) 0%,
  hsl(297deg 94% 86%) 10%,
  hsl(292deg 93% 84%) 18%,
  hsl(288deg 93% 83%) 24%,
  hsl(284deg 94% 81%) 29%,
  hsl(280deg 94% 80%) 35%,
  hsl(276deg 95% 78%) 41%,
  hsl(272deg 97% 77%) 49%,
  hsl(268deg 98% 76%) 59%,
  hsl(264deg 100% 75%) 88%
  )`;
const NIGHT_SKY = `linear-gradient(
    0deg,
  hsl(301deg 100% 69%) 0%,
  hsl(297deg 97% 67%) 10%,
  hsl(293deg 97% 67%) 18%,
  hsl(289deg 98% 66%) 24%,
  hsl(285deg 98% 65%) 29%,
  hsl(281deg 99% 65%) 35%,
  hsl(277deg 99% 64%) 41%,
  hsl(273deg 100% 64%) 49%,
  hsl(268deg 100% 64%) 59%,
  hsl(263deg 100% 64%) 88%
  )`;
const Rig = ({ isNight }) => {
  const { camera, mouse } = useThree();
  const vec = new Vector3();

  useFrame(() => {
    const canvas = document.querySelector("canvas");
    if (isNight) canvas.style.background = NIGHT_SKY;
    else canvas.style.background = DAY_SKY;
    camera.position.lerp(
      vec.set(mouse.x * 0.05, mouse.y * 0.05, camera.position.z),
      0.02
    );
  });
  return <></>;
};

function App() {
  const [isNight, setNight] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=27cc0f9e54d73d8e67bfafb8beef78e4"
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <>
      <button
        className="Overlay"
        onClick={() => setNight((isNight) => !isNight)}
      >
        Night
      </button>
      <Form />
      {/* <div className="data-container">
        <div className="data-box">
          <div id="degree">
            {isNight ? "75" : "20"}&deg;{isNight ? "F" : "C"}
          </div>
          <div id="greeting">Good {isNight ? "Night" : "Morning"}</div>
          <div id="condition">{isNight ? "Clear Sky" : "Cloudy"}</div>
        </div>
      </div> */}
      <Canvas camera={{ position: [0, 0, 10], fov: 10 }}>
        <ambientLight intensity={isNight ? 0.3 : 1} />
        <directionalLight
          intensity={isNight ? 0.3 : 1}
          position={[20, 0, 10]}
        />
        <Models isNight={isNight} />
        <Rig isNight={isNight} />
      </Canvas>
    </>
  );
}

export default App;

const Form = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="top-container">
      <div className={`form-container  ${isOpen && "toggle-active"}`}>
        <div className="box">
          <input placeholder="City" className="input" type="text" />
          <input placeholder="Celsius" className="input" type="text" />

          <button className="btn">Submit</button>
        </div>
      </div>
      <div className="line" />
      <div className={`toggle-button `} onClick={(e) => handleToggle(e)} />
    </div>
  );
};
const draft = () => (
  <>
    <div className="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="64"
        height="64"
        viewBox="0 0 64 64"
      >
        <linearGradient
          id="zwGrHip4POkuB1hRgx1tZa_3z12MdpLMw_z_gr1"
          x1="41.956"
          x2="41.956"
          y1="7.936"
          y2="36.631"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6dc7ff"></stop>
          <stop offset="1" stopColor="#e6abff"></stop>
        </linearGradient>
        <path
          fill="url(#zwGrHip4POkuB1hRgx1tZa_3z12MdpLMw_z_gr1)"
          d="M55.534,27.878c-1.076,0.075-2.18,0.05-3.304-0.087c-7.801-0.953-14.11-7.263-15.063-15.064	c-0.137-1.124-0.162-2.228-0.087-3.303c0.13-1.868-1.879-3.123-3.438-2.086c-5.234,3.483-8.463,9.736-7.581,16.671	c0.028,0.223,0.076,0.439,0.113,0.659c0.431-0.104,0.873-0.167,1.326-0.167c4.142,0,7.5,4.532,7.5,10.122	c0,0.023-0.002,0.045-0.003,0.068C36.072,33.07,37.91,32,40,32c3.314,0,6,2.686,6,6c0,0.281-0.026,0.556-0.064,0.827	c4.87-0.769,9.062-3.571,11.684-7.511C58.658,29.758,57.402,27.748,55.534,27.878z"
        ></path>
        <linearGradient
          id="zwGrHip4POkuB1hRgx1tZb_3z12MdpLMw_z_gr2"
          x1="28"
          x2="28"
          y1="464.167"
          y2="428.333"
          gradientTransform="matrix(1 0 0 -1 0 486)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1a6dff"></stop>
          <stop offset="1" stopColor="#c822ff"></stop>
        </linearGradient>
        <path
          fill="url(#zwGrHip4POkuB1hRgx1tZb_3z12MdpLMw_z_gr2)"
          d="M46.121,41.387C46.695,40.355,47,39.195,47,38c0-3.859-3.141-7-7-7	c-0.262,0-0.52,0.02-0.777,0.047c-0.082,0.012-0.168,0.023-0.25,0.035c-0.172,0.027-0.344,0.059-0.516,0.098	c-0.094,0.02-0.188,0.043-0.277,0.066c-0.18,0.047-0.355,0.105-0.531,0.168c-0.156,0.055-0.309,0.121-0.457,0.188	c-0.117,0.051-0.234,0.102-0.348,0.16c-0.133,0.063-0.258,0.137-0.383,0.211c-0.082,0.047-0.16,0.094-0.238,0.145	c-0.086,0.055-0.176,0.102-0.262,0.16C35.59,27.102,31.27,23,26,23c-5.516,0-10,4.484-10,10v2h-1c-4.965,0-9,4.035-9,9s4.035,9,9,9	h29c3.309,0,6-2.691,6-6C50,44.438,48.387,42.246,46.121,41.387z M44,51H15c-3.859,0-7-3.141-7-7s3.141-7,7-7h5v-2h-2v-2	c0-4.41,3.59-8,8-8s8,3.59,8,8v3h2v-0.984c0.195-0.262,0.406-0.508,0.645-0.723l0.004,0.004c0.223-0.199,0.461-0.375,0.711-0.535	c0.023-0.012,0.043-0.023,0.063-0.035c0.484-0.297,1.02-0.5,1.574-0.617c0.059-0.012,0.121-0.023,0.18-0.031	C39.445,33.031,39.723,33,40,33c2.758,0,5,2.242,5,5c0,1.086-0.355,2-1.008,3H43v2h1c2.207,0,4,1.793,4,4S46.207,51,44,51z"
        ></path>
        <linearGradient
          id="zwGrHip4POkuB1hRgx1tZc_3z12MdpLMw_z_gr3"
          x1="28"
          x2="28"
          y1="464.167"
          y2="428.333"
          gradientTransform="matrix(1 0 0 -1 0 486)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1a6dff"></stop>
          <stop offset="1" stopColor="#c822ff"></stop>
        </linearGradient>
        <path
          fill="url(#zwGrHip4POkuB1hRgx1tZc_3z12MdpLMw_z_gr3)"
          d="M15,55h26v2H15V55z"
        ></path>
        <linearGradient
          id="zwGrHip4POkuB1hRgx1tZd_3z12MdpLMw_z_gr4"
          x1="11"
          x2="11"
          y1="21.543"
          y2="26.394"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6dc7ff"></stop>
          <stop offset="1" stopColor="#e6abff"></stop>
        </linearGradient>
        <path
          fill="url(#zwGrHip4POkuB1hRgx1tZd_3z12MdpLMw_z_gr4)"
          d="M11.459,21.345l0.2,0.694c0.181,0.629,0.673,1.12,1.301,1.301l0.694,0.2	c0.461,0.133,0.461,0.785,0,0.918l-0.694,0.2c-0.629,0.181-1.12,0.673-1.301,1.301l-0.2,0.694c-0.133,0.461-0.785,0.461-0.918,0	l-0.2-0.694c-0.181-0.629-0.673-1.12-1.301-1.301l-0.694-0.2c-0.461-0.133-0.461-0.785,0-0.918l0.694-0.2	c0.629-0.181,1.12-0.673,1.301-1.301l0.2-0.694C10.674,20.885,11.326,20.885,11.459,21.345z"
        ></path>
        <linearGradient
          id="zwGrHip4POkuB1hRgx1tZe_3z12MdpLMw_z_gr5"
          x1="16.446"
          x2="16.446"
          y1="11.911"
          y2="18.284"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6dc7ff"></stop>
          <stop offset="1" stopColor="#e6abff"></stop>
        </linearGradient>
        <path
          fill="url(#zwGrHip4POkuB1hRgx1tZe_3z12MdpLMw_z_gr5)"
          d="M16.982,12.445l0.234,0.811c0.211,0.734,0.785,1.308,1.519,1.519l0.811,0.234	c0.538,0.155,0.538,0.917,0,1.072l-0.811,0.234c-0.734,0.211-1.308,0.785-1.519,1.519l-0.234,0.811	c-0.155,0.538-0.917,0.538-1.072,0l-0.234-0.811c-0.211-0.734-0.785-1.308-1.519-1.519l-0.811-0.234	c-0.538-0.155-0.538-0.917,0-1.072l0.811-0.234c0.734-0.211,1.308-0.785,1.519-1.519l0.234-0.811	C16.065,11.907,16.827,11.907,16.982,12.445z"
        ></path>
      </svg>
    </div>{" "}
    <div className="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="64"
        height="64"
        viewBox="0 0 64 64"
      >
        <linearGradient
          id="t5V8vu4qZXgo5nUdNDQFra_49461_gr1"
          x1="43.565"
          x2="43.565"
          y1="10"
          y2="39.671"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop offset="0" stopColor="#6dc7ff"></stop>
          <stop offset="1" stopColor="#e6abff"></stop>
        </linearGradient>
        <path
          fill="url(#t5V8vu4qZXgo5nUdNDQFra_49461_gr1)"
          d="M45,35.481c3.497-1.23,6-4.56,6-8.481c0-4.97-4.03-9-9-9c-4.04,0-7.46,2.66-8.59,6.32 L29.13,20c0.45-0.33,0.99-0.52,1.54-0.57c-0.22-0.7-0.65-1.92-0.65-2.89c0-0.47,0.1-0.88,0.37-1.15c0.83-0.82,3-0.05,4.04,0.28 c0.09-1.08,0.76-2.08,1.83-2.53c1.07-0.44,2.25-0.21,3.08,0.5C39.84,12.67,40.84,11,42,11s2.16,1.67,2.66,2.64 c0.83-0.71,2.01-0.94,3.08-0.5c1.08,0.45,1.74,1.45,1.83,2.53c0.7-0.22,1.92-0.65,2.89-0.65c0.47,0,0.88,0.1,1.15,0.37 c0.82,0.83,0.05,3-0.28,4.04c1.08,0.09,2.08,0.76,2.53,1.83c0.44,1.07,0.21,2.25-0.5,3.08C56.33,24.84,58,25.84,58,27 s-1.67,2.16-2.64,2.66c0.71,0.83,0.94,2.01,0.5,3.08c-0.45,1.07-1.45,1.74-2.53,1.83c0.22,0.7,0.65,1.92,0.65,2.89 c0,0.47-0.1,0.88-0.37,1.15c-0.83,0.82-3,0.05-4.04-0.28c-0.05,0.61-0.28,1.2-0.67,1.67L45,37 C45.145,36.957,44.858,35.531,45,35.481"
        ></path>
        <linearGradient
          id="t5V8vu4qZXgo5nUdNDQFrb_49461_gr2"
          x1="28"
          x2="28"
          y1="17.833"
          y2="53.667"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop offset="0" stopColor="#1a6dff"></stop>
          <stop offset="1" stopColor="#c822ff"></stop>
        </linearGradient>
        <path
          fill="url(#t5V8vu4qZXgo5nUdNDQFrb_49461_gr2)"
          d="M46.121,37.387C46.694,36.357,47,35.195,47,34c0-3.86-3.141-7-7-7 c-0.261,0-0.519,0.019-0.776,0.048c-0.085,0.009-0.168,0.023-0.252,0.035c-0.173,0.026-0.344,0.058-0.514,0.097 c-0.094,0.021-0.188,0.041-0.28,0.066c-0.179,0.048-0.354,0.106-0.529,0.169c-0.156,0.055-0.308,0.119-0.459,0.185 c-0.117,0.051-0.234,0.102-0.348,0.16c-0.13,0.066-0.257,0.138-0.383,0.212c-0.08,0.047-0.159,0.096-0.237,0.146 c-0.086,0.055-0.176,0.102-0.26,0.161C35.591,23.102,31.271,19,26,19c-5.514,0-10,4.486-10,10v2h-1c-4.963,0-9,4.037-9,9 s4.037,9,9,9h29c3.309,0,6-2.691,6-6C50,40.438,48.386,38.246,46.121,37.387z M44,47H15c-3.859,0-7-3.14-7-7s3.141-7,7-7h5v-2h-2v-2 c0-4.411,3.589-8,8-8s8,3.589,8,8v3h2v-0.984c0.195-0.262,0.407-0.508,0.645-0.723l0.005,0.005c0.222-0.201,0.461-0.378,0.711-0.535 c0.02-0.012,0.04-0.025,0.06-0.037c0.487-0.296,1.02-0.501,1.576-0.616c0.059-0.012,0.119-0.023,0.179-0.033 C39.446,29.031,39.721,29,40,29c2.757,0,5,2.243,5,5c0,1.086-0.354,2-1.008,3H43v2h1c2.206,0,4,1.794,4,4S46.206,47,44,47z"
        ></path>
        <linearGradient
          id="t5V8vu4qZXgo5nUdNDQFrc_49461_gr3"
          x1="28"
          x2="28"
          y1="17.833"
          y2="53.667"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop offset="0" stopColor="#1a6dff"></stop>
          <stop offset="1" stopColor="#c822ff"></stop>
        </linearGradient>
        <path
          fill="url(#t5V8vu4qZXgo5nUdNDQFrc_49461_gr3)"
          d="M15 51H41V53H15z"
        ></path>
      </svg>
    </div>
  </>
);
