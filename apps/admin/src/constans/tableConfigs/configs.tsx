import { IoEyeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import type {
  CallHistory,
  Categories,
  Column,
  ListsType,
  RequestPage,
  Themes,
  TopicsType,
  Translator,
  User,
} from "../../types/types";
import { Link } from "react-router-dom";
import { StarRating } from "../../components/StarRating";
import { ViewButton } from "../../components/PopUp/PopUpBtn";

// Тип одной колонки

const baseListsColumns = [
  {
    key: "select",
    renderHeader: () => <input type="checkbox" className="table-check-box" />,
    render: () => <input type="checkbox" className="table-check-box" />,
  },
  {
    key: "eye",
    title: "",
    render: (row) => {
      if (!row) return null;
      return <ViewButton row={row} />;
    },
  },
] as const;

// Конфиг колонок Translator
export const translatorTableConfig: Column<Translator>[] = [
  ...baseListsColumns,
  {
    key: "name",
    title: "Name",
    width: "40%",
    marginLeft: "38px",
  },
  { key: "phone", title: "Phone", width: "35%" },
  {
    key: "email",
    title: "Email",
    width: "35%",
    render: (row) => {
      return row.email ? row.email : "не указон";
    },
  },
  {
    key: "levelOfKorean",
    title: "TOPIK",
    width: "35%",
    render: (row) => <p>{row.levelOfKorean} Level</p>,
  },
  { key: "status", title: "Status", width: "35%" },
  {
    key: "hasWithdrawalRequest",
    title: "Withdraw request",
    width: "35%",
    render: (row) => {
      if ("hasWithdrawalRequest" in row && row.hasWithdrawalRequest === "Request") {
        return (
          <button className="view-btn request">
            Request <MdArrowForwardIos className="view-icon" />
          </button>
        );
      }
      return <div className={`table-item`}>None</div>;
    },
  },
  {
    key: "call",
    title: "Call",
    width: "35%",
    render: (row) =>
      row.phone ? (
        <Link
          to={`/home/lists/callHistory?name=${encodeURIComponent(row.name)}&from=translator`}
          className="view-btn"
        >
          View <MdArrowForwardIos className="view-icon" />
        </Link>
      ) : null,
  },
  {
    key: "withdraw",
    title: "Withdraw",
    width: "40%",
    render: (row) =>
      "hasWithdrawalRequest" in row ? (
        <Link
          to={`/home/lists/withdrawHistory?name=${encodeURIComponent(row.name)}&from=translator`}
          className="view-btn"
        >
          View <MdArrowForwardIos className="view-icon" />
        </Link>
      ) : null,
  },
];

// Конфиг колонок User
export const userTableConfig: Column<User>[] = [
  ...baseListsColumns,
  { key: "name", title: "Name", width: "40%", marginLeft: "38px" },
  { key: "phone", title: "Phone", width: "35%" },
  { key: "balance", title: "Balance", width: "35%" },
  {
    key: "hasDepositRequest",
    title: "Deposit Request",
    width: "40%",
    render: (row) => {
      if ("depositRequest" in row && row.depositRequest === "Request") {
        return (
          <button className="view-btn request">
            Request <MdArrowForwardIos className="view-icon" />
          </button>
        );
      }
      return <div className={`table-item`}>None</div>;
    },
  },
  {
    key: "call",
    title: "Call",
    width: "35%",
    render: (row) =>
      "hasDepositRequest" in row ? (
        <Link
          to={`/home/lists/callHistory?name=${encodeURIComponent(row.name)}&from=user`}
          className="view-btn"
        >
          View <MdArrowForwardIos className="view-icon" />
        </Link>
      ) : null,
  },
  {
    key: "deposit",
    title: "Deposit",
    width: "40%",
    render: (row) =>
      "hasDepositRequest" in row ? (
        <Link
          to={`/home/lists/depositHistory?name=${encodeURIComponent(row.name)}&from=user`}
          className="view-btn"
        >
          View <MdArrowForwardIos className="view-icon" />
        </Link>
      ) : null,
  },
];

export const callHistoryTableConfig: Column<CallHistory>[] = [
  {
    key: "select",
    renderHeader: () => <input type="checkbox" className="table-check-box" />,
    render: () => <input type="checkbox" className="table-check-box" />,
  },
  { key: "call", title: "Call", width: "40%", marginLeft: "38px" },
  { key: "date", title: "Data", width: "35%" },
  { key: "duration", title: "Duration", width: "35%" },
  { key: "coins", title: "Coins", width: "35%" },
  { key: "theme", title: "Theme", width: "35%" },
  {
    key: "depositRequest",
    title: "Deposit request",
    width: "35%",
    render: (row) => {
      if ("depositRequest" in row && row.depositRequest === "Request") {
        return (
          <button className="view-btn request">
            Request <MdArrowForwardIos className="view-icon" />
          </button>
        );
      }
      return <div className={`table-item`}>None</div>;
    },
  },
  {
    key: "rating",
    title: "Rating",
    width: "40%",
    render: (row) => {
      return <StarRating rating={Number(row.rating)} />;
    },
  },
];

export const withdrawRequestTableConfig: Column<RequestPage>[] = [
  ...baseListsColumns,
  { key: "request", title: "Withdraw", width: "25%" },
  { key: "date", title: "Data", width: "15%" },
  { key: "coins", title: "Coins", width: "15%" },
  {
    key: "status",
    title: "Withdraw request",
    width: "70%",
    render: (row) => {
      if ("status" in row && row.request === "Request") {
        return (
          <button className="view-btn request">
            Request <MdArrowForwardIos className="view-icon" />
          </button>
        );
      }
      return (
        <div className={`table-item`}>
          Transfer completed <span className="view-icon" />
        </div>
      );
    },
  },
];

export const depositRequestTableConfig: Column<RequestPage>[] = [
  ...baseListsColumns,
  { key: "request", title: "Deposit", width: "25%" },
  { key: "date", title: "Data", width: "15%" },
  { key: "coins", title: "Coins", width: "15%" },
  {
    key: "status",
    title: "Deposit request",
    width: "70%",
    render: (row) => {
      if ("status" in row && row.status === "Request") {
        return (
          <button className="view-btn request">
            Request <MdArrowForwardIos className="view-icon" />
          </button>
        );
      }
      return (
        <div className={`table-item`}>
          Transfer completed <span className="view-icon" />
        </div>
      );
    },
  },
];

export const isListsTableType = (value: string): value is ListsType => {
  return [
    "user",
    "translator",
    "callHistory",
    "withdrawHistory",
    "depositHistory",
    "theme",
  ].includes(value);
};

export const themesTableConfig: Column<Themes>[] = [
  ...baseListsColumns,
  {
    key: "name",
    title: "Theme",
    width: "25%",
  },
  {
    key: "categories",
    title: "Categories",
    width: "25%",
    render: (row) => {
      return row.categories?.name ?? "-";
    },
  },

  {
    key: "isActive",
    title: "Status",
    width: "25%",
    render: (row) => row.isActive && "Active",
  },

  {
    key: "icon",
    title: "Icon",
    width: "70%",
    render: (row) => {
      if ("categorie" in row && row.imgIcon) {
        return (
          <div className="themes-icon-block">
            <img className="themes-icon" src={`/assets/Icon_mock_theme.png`} alt="" />
            <span>{row.icon}</span>
          </div>
        );
      }
    },
  },
];

export const categoriesTableConfig: Column<Categories>[] = [
  ...baseListsColumns,
  {
    key: "name",
    title: "Categories",
    width: "25%",
  },
  {
    key: "isActive",
    title: "Status",
    width: "70%",
    render: (row) => row.isActive && "Active",
  },
];

export const isTopicsType = (v: string): v is TopicsType => ["themes", "categories"].includes(v);
