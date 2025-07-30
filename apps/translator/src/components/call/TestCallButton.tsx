import { FiPhoneCall } from "react-icons/fi";
import { useCall } from "./useCall";

export const TestCallButton = () => {
  const { setIncomingCall } = useCall();

  const simulateCall = () => {
    setIncomingCall({
      name: "Пугачева Алла",
      topic: "Банковское дело",
      coins: 1000,
      photoUrl: "/assets/images/user2.png",
    });
    document.body.style.overflow = "hidden";
  };

  return (
    <button
      style={{
        position: "fixed",
        bottom: "15%",
        left: "0px",
        zIndex: "88",
      }}
      onClick={simulateCall}
    >
      <FiPhoneCall
        style={{
          width: "50px",
          height: "50px",
          background: "#3AB500",
          color: "#fff",
          padding: "10px",
          borderRadius: "50%",
        }}
      />
    </button>
  );
};
