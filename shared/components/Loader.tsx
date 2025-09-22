import "../styles/loader.css";
import { useModalStore } from "../store/useStore";

type props = {
  role?: string;
};
export default function Loader({ role }: props) {
  const isLoading = useModalStore((state) => state.loading);
  if (!isLoading) return null;
  return (
    <div className={`${role ? "admin-logo-wrapper" : "logo-wrapper"}`}>
      <div className="square">
        <div className="circle blue"></div>
        <div className="circle red"></div>
        <div className="circle orange"></div>
      </div>
      <div className="brand-text">morago</div>
    </div>
  );
}
