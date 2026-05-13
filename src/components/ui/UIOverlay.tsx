import { ViewKey} from "../scene/CameraAnimation";

interface UIOverlayProps {
  activeView: ViewKey;
  onViewChange: (view: ViewKey) => void;
}

export function UIOverlay({ activeView, onViewChange }: UIOverlayProps) {
  return (
    <>
      {/* Back button that appears only when zoomed in to go back to overview */}
      {activeView === "computer" && (
        <button
          onClick={() => onViewChange("yourViewName")}
          style={{
            position: "fixed",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            zIndex: 100,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "black";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "white";
          }}
        >
          Exit View
        </button>
      )}
    </>
  );
}