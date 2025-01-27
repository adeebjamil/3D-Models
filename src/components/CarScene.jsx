import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Environment, Stage } from "@react-three/drei";
import Car from "./Car";
// import Phoenix from "./Phoenix";

export default function CarScene() {
return (
<Canvas
camera={{ position: [5, 2, 5], fov: 50 }}
gl={{ antialias: true }}
>
<color attach="background" args={['#17171b']} />
<Suspense fallback={null}>
<Environment preset="city" />
<Stage environment={null} intensity={1} contactShadow shadows>
{/* <Phoenix/> */}
<Car />
</Stage>
<OrbitControls
enablePan={true}
enableZoom={true}
minDistance={3}
maxDistance={10}
minPolarAngle={0}
maxPolarAngle={Math.PI / 1.5}
/>
</Suspense>
</Canvas>
);
}