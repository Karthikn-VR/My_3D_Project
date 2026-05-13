import { Text } from "@react-three/drei";

export function SceneText() {
  return (
    <group position={[0, -0.79, 4]} rotation={[-Math.PI / 2, 0, 0]}>
      <Text
        fontSize={1.8}
        color="#ffffff"
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/syncopate/v22/pe0pMIuPIYBCpEV5eFdKvtKqBP5p.woff" // Premium geometric font
      >
        MOCHAA
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </Text>
      
      {/* Floor Glow Interaction */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[12, 4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
      </mesh>
    </group>
  );
}
