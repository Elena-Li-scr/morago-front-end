import "../assets/style/header.css";
interface Props {
  start?: boolean;
}
export default function MainHeader({ start }: Props) {
  return (
    <div className="main-header">
      <div className="main-header-logo">
        <img src="/assets/logo.png" alt="logo" />
      </div>
      <div className="main-header-main">
        {!start && (
          <div>
            <img src="/assets/avatar.png" alt="avatar" />
            <p>Admin</p>
          </div>
        )}
      </div>
    </div>
  );
}
