import "../../assets/style/loading.css";
import { useModalStore } from "@shared/store/useStore";

const Loading = () => {
  const isLoading = useModalStore((state) => state.loading);

  if (!isLoading) return null;
  return (
    <div className="logo-wrapper">
      <div className="square">
        <div className="circle blue"></div>
        <div className="circle red"></div>
        <div className="circle orange"></div>
      </div>
      <div className="brand-text">morago</div>
    </div>
  );
};

export default Loading;
