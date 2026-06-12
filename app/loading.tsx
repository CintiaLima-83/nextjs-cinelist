export default function Loading() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          style={{
            height: "350px",
            borderRadius: "12px",
            animation: "pulse 1.5s infinite",
          }}
        />
      ))}
    </div>
  );
}
