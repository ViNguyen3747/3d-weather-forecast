import { Html, useGLTF } from "@react-three/drei";
import { useRef } from "react";
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

export default ({ isNight }) => {
  const { nodes } = useGLTF("./models.glb");
  const sceneRef = useRef();
  const { mouse } = useThree();
  useFrame(() => {
    // sceneRef.current.rotation.y =
    //   sceneRef.current.rotation.y +
    //   ((mouse.x * Math.PI * 2) / 80 - sceneRef.current.rotation.y);
    // sceneRef.current.rotation.x =
    //   sceneRef.current.rotation.x +
    //   ((mouse.y * Math.PI * 2) / 80 - sceneRef.current.rotation.x);
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
  });
  console.log(nodes);
  return (
    <group position={[0, -1.3, 0]} ref={sceneRef}>
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
        <mesh geometry={nodes.screen.geometry}>
          <meshBasicMaterial color={"#fbe4ff"} toneMapped={false} />
        </mesh>
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
      {[...Array(8)].map((_, i) => (
        <mesh
          key={`snow_roof${i + 1}`}
          geometry={nodes[`snow_roof${i + 1}`].geometry}
        >
          <meshBasicMaterial color={"#ffffff"} toneMapped={false} />
        </mesh>
      ))}
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
    </group>
  );
};
