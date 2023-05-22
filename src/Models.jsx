import { Html, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const BUILDING_COLORS = [
  "#936bff",
  "#fcd6f9",
  "#a06ec4",
  "#ffa9cb",
  "#f992ad",
  "#fa8893",
  "#e0cefd",
  "#f2a8ff",
];

const DOOR_COLORS = [
  "#7d57e5",
  "#ebbbe7",
  "#9362b6",
  "#e093b2",
  "#dd839b",
  "#ef7a85",
  "#bfa9e4",
  "#d28dde",
];
const RobotFaces = ({ nodes }) => {
  const [faceNumber, setFace] = useState(1);
  const handleClick = (e) => {
    e.stopPropagation();
    if (faceNumber === 4) {
      setFace(1);
    } else {
      setFace((prev) => prev + 1);
    }
  };
  return (
    <group onClick={handleClick}>
      <mesh geometry={nodes.screen.geometry}>
        <meshBasicMaterial color={"#fbe4ff"} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes[`face${faceNumber}`].geometry}>
        <meshBasicMaterial color={"#ffffff"} toneMapped={false} />
      </mesh>
    </group>
  );
};
export default ({ isNight }) => {
  const { nodes } = useGLTF("./models.glb");
  const sceneRef = useRef();
  const sunRayRef = useRef();
  const thunderFlash = useRef();
  const { mouse } = useThree();
  console.log(nodes);
  useFrame(({ clock }) => {
    sunRayRef.current.rotation.z = -clock.getElapsedTime() / 5;
    sceneRef.current.rotation.y = MathUtils.lerp(
      sceneRef.current.rotation.y,
      (mouse.x * Math.PI * 2) / 80,
      0.1
    );
    sceneRef.current.rotation.x = MathUtils.lerp(
      sceneRef.current.rotation.x,
      (mouse.y * Math.PI * 2) / 80,
      0.1
    );
    if (Math.random() > 0.8 || thunderFlash.current.power > 8) {
      if (thunderFlash.current.power < 1)
        thunderFlash.current.position.set(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 4 - 7
        );
      thunderFlash.current.power = Math.random() * 10;
    }
  });

  const particles = new Array(200).fill().map(() => ({
    position: [
      (Math.random() - 0.5) * 2,
      Math.random() * 4,
      (Math.random() - 0.5) * 2,
    ],
  }));

  return (
    <>
      <group position={[0, -1.3, 0]} ref={sceneRef}>
        <ambientLight intensity={isNight ? 0.2 : 0.3} />
        <directionalLight
          intensity={isNight ? 0.1 : 0.3}
          position={[20, 0, 10]}
        />
        <spotLight
          intensity={isNight ? 0.1 : 0.7}
          angle={Math.PI}
          position={[0, 2, -4]}
        />
        {/* <Html
        transform
        occlude
        position={[-0.178, 0.81, -0.524]}
        rotation={[0, Math.PI / 9, 0]}
        scale={0.5}
      >
        <div className="content">
          <div id="degree-screen">
            {isNight ? "75" : "20"}&deg;{isNight ? "F" : "C"}
          </div>
          <div id="greeting-screen">Good {isNight ? "Night" : "Morning"}</div>
          <div id="condition-screen">{isNight ? "Clear Sky" : "Cloudy"}</div>
        </div>
      </Html> */}
        <mesh geometry={nodes.wall.geometry}>
          <meshStandardMaterial color={"#c2a0ef"} />
        </mesh>
        <mesh geometry={nodes.window_frame_left.geometry}>
          <meshStandardMaterial color={"#ceb3f2"} />
        </mesh>
        <mesh geometry={nodes.window_frame_right.geometry}>
          <meshStandardMaterial color={"#ceb3f2"} />
        </mesh>
        <mesh geometry={nodes.glass_left.geometry}>
          <meshStandardMaterial color={"#af99ff"} transparent opacity={0.5} />
        </mesh>
        <mesh geometry={nodes.glass_right.geometry}>
          <meshStandardMaterial color={"#af99ff"} transparent opacity={0.5} />
        </mesh>
        <mesh geometry={nodes.table.geometry}>
          <meshStandardMaterial color={"#ffa9cb"} />
        </mesh>
        <group rotation={[0, Math.PI / 30, 0]}>
          <mesh geometry={nodes.computer.geometry}>
            <meshStandardMaterial color={"#b388eb"} />
          </mesh>

          <RobotFaces nodes={nodes} />
          {/* <Html
          transform
          occlude
          position={[-0.13, 0.82, -0.54]}
          rotation={[0, Math.PI / 20, 0]}
        >
          <div className="content">
            <div id="degree">
              {isNight ? "75" : "20"}&deg;{isNight ? "F" : "C"}
            </div>
            <div id="greeting">Good {isNight ? "Night" : "Morning"}</div>
            <div id="condition">{isNight ? "Clear Sky" : "Cloudy"}</div>
          </div>
        </Html> */}
        </group>
        <mesh geometry={nodes.keyboard.geometry}>
          <meshStandardMaterial color={"#c2a0ef"} />
        </mesh>
        <mesh geometry={nodes.mouse.geometry}>
          <meshStandardMaterial color={"#c2a0ef"} />
        </mesh>
        <mesh geometry={nodes.cubic.geometry}>
          <meshStandardMaterial color={"#ff90b3"} />
        </mesh>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} geometry={nodes[`building${i + 1}`].geometry}>
            <meshStandardMaterial color={BUILDING_COLORS[i]} />
          </mesh>
        ))}
        {/* {[...Array(8)].map((_, i) => (
        <mesh
          key={`snow_roof${i + 1}`}
          geometry={nodes[`snow_roof${i + 1}`].geometry}
        >
          <meshBasicMaterial color={"#ffffff"} toneMapped={false} />
        </mesh>
      ))} */}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={`door_dark${i + 1}`}
            geometry={nodes[`door_dark${i + 1}`].geometry}
          >
            <meshStandardMaterial color={DOOR_COLORS[i]} />
          </mesh>
        ))}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={`door_light${i + 1}`}
            geometry={nodes[`door_light${i + 1}`].geometry}
          >
            {isNight ? (
              <meshBasicMaterial color={"#fffae5"} toneMapped={false} />
            ) : (
              <meshStandardMaterial color={DOOR_COLORS[i]} />
            )}
          </mesh>
        ))}
        {/* Clouds */}
        <group position={[0, 0.2, 0]}>
          <group position={[-0.1, 0.2, -3]}>
            <mesh geometry={nodes.cloud1.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud3.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud5.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud6.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud7.geometry} position={[0.3, 0.2, 0]}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud10.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud11.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <group position={[0, 0.1, 0]}>
              <mesh geometry={nodes.cloud2.geometry}>
                <meshToonMaterial color={"#ffffff"} />
              </mesh>
              <mesh geometry={nodes.cloud4.geometry}>
                <meshToonMaterial color={"#ffffff"} />
              </mesh>
              <mesh geometry={nodes.cloud8.geometry}>
                <meshToonMaterial color={"#ffffff"} />
              </mesh>
              <mesh geometry={nodes.cloud9.geometry}>
                <meshToonMaterial color={"#ffffff"} />
              </mesh>
              <mesh geometry={nodes.cloud12.geometry}>
                <meshToonMaterial color={"#ffffff"} />
              </mesh>
            </group>
            {/* <mesh geometry={nodes.thunder1.geometry}>
              <meshBasicMaterial color={"#fff2b2"} toneMapped={false} />
            </mesh>
            <mesh geometry={nodes.thunder2.geometry}>
              <meshBasicMaterial color={"#fff2b2"} toneMapped={false} />
            </mesh> */}
          </group>
          <group position={[0, 0.6, -2]}>
            <mesh geometry={nodes.cloud1.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud3.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud5.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud6.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud7.geometry} position={[0.3, -0.1, 0]}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud10.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud11.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
          </group>
          <group position={[0, 0.8, -2]}>
            <mesh geometry={nodes.cloud4.geometry}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud9.geometry} position={[0, -0.8, -0.5]}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud12.geometry} position={[0, -0.8, -0.4]}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud12.geometry} position={[0, -0.8, -0.2]}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
            <mesh geometry={nodes.cloud1.geometry} position={[1, -0.1, -0.1]}>
              <meshToonMaterial color={"#ffffff"} />
            </mesh>
          </group>
        </group>

        <group position={[-0.6, 0.5, -8]} scale={0.9}>
          <mesh geometry={nodes.sun.geometry}>
            <meshToonMaterial color={"#fb8500"} />
          </mesh>
          <mesh
            geometry={nodes.sun_ray.geometry}
            scale={0.07}
            position={[0.55, 2.48, -5.2]}
            ref={sunRayRef}
          >
            <meshToonMaterial color={"#e76f51"} />
          </mesh>
        </group>
        {/* <mesh
        geometry={nodes.moon.geometry}
        scale={0.2}
        position={[-0.1, 2.7, -12]}
        ref={sunRayRef}
      >
        <meshBasicMaterial color={"#ffffff"} toneMapped={false} />
      </mesh> */}
        <group
          position={[0, 3, -4]}
          // visible={["rainy", "snowy", "storm"].includes(condition)}
        >
          {particles.map((particle, index) => (
            <RainParticle
              key={index}
              position={particle.position}
              isRainy={true}
            />
          ))}
        </group>
      </group>
      <spotLight
        color="#C5EFFD"
        position={[0, 1, -3]}
        ref={thunderFlash}
        distance={2.5}
        decay={1}
        angle={Math.PI}
      />
    </>
  );
};

const RainParticle = ({ position, isRainy }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    ref.current.position.y = isRainy
      ? // ? -((elapsedTime + position[1]) % 3)
        -((elapsedTime * 2.5 + position[1]) % 3)
      : -((elapsedTime / 2 + position[1]) % 2.115);
  });
  return (
    <mesh
      ref={ref}
      position={position}
      scale={[0.2, (Math.random() + 0.2) * 6, 0.2]}
    >
      <sphereBufferGeometry args={[0.01, 16, 16]} />
      <meshBasicMaterial
        // color={isRainy || isStorm ? "#caf0f8" : "#ffffff"}
        color={"#edede9"}
        toneMapped={false}
      />
    </mesh>
  );
};
