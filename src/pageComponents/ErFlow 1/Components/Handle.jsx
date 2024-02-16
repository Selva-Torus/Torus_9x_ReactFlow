const positionStyles = {
  [Position.Left]: {
    left: "-16px",
    top: "51%",
    transform: "translateY(-50%)",
  },
  [Position.Right]: {
    right: "-16px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  [Position.Top]: {
    top: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  [Position.Bottom]: {
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
  },
};

const customHandleLeft = {
  width: "16px",
  height: "37px",
  position: "absolute",
  cursor: "crosshair",
  background: "#D3D3D3",
  borderRadius: "8px 0 0 8px",
  border: "2px solid gray",
  transition: "0.3s ease-in-out",
};

const customHandleRight = {
  width: "16px",
  height: "37px",
  position: "absolute",
  cursor: "crosshair",
  background: "#D3D3D3",
  borderRadius: "0 8px 8px 0",
  border: "2px solid gray",
  transition: "0.3s ease-in-out",
};
