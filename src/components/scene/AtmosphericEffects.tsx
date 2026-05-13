export function AtmosphericEffects() {
  return (
    <>
      {/* Volumetric-like Fog */}
      <fog attach="fog" args={["#050505", 10, 35]} />

      {/* Large environmental gradient to prevent harsh horizon */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#050505"
          side={1} // BackSide
        />
      </mesh>
    </>
  );
}
