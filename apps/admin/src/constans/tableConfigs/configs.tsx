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
    render: (row: any) => {
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
  {
    key: "hasWithdrawalRequest",
    title: "Withdraw request",
    width: "35%",
    render: (row) => {
      if ("hasWithdrawalRequest" in row && row.hasWithdrawalRequest) {
        return (
          <Link
            to={`/home/lists/translator/withdraw?name=${encodeURIComponent(row.name)}&id=${encodeURIComponent(row.id)}&from=translator`}
            className="view-btn request"
          >
            Request <MdArrowForwardIos className="view-icon" />
          </Link>
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
          to={`/home/lists/callHistory?name=${encodeURIComponent(row.name)}&id=${encodeURIComponent(row.id)}&from=translator`}
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
          to={`/home/lists/withdrawHistory?name=${encodeURIComponent(row.name)}&id=${encodeURIComponent(row.id)}&from=translator`}
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
      if ("hasDepositRequest" in row && row.hasDepositRequest) {
        return (
          <Link
            to={`/home/lists/user/deposit?name=${encodeURIComponent(row.name)}&phone=${encodeURIComponent(row.phone)}&id=${encodeURIComponent(row.id)}&from=user`}
            className="view-btn request"
          >
            Request <MdArrowForwardIos className="view-icon" />
          </Link>
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
          to={`/home/lists/callHistory?name=${encodeURIComponent(row.name)}&id=${encodeURIComponent(row.id)}&from=user`}
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
          to={`/home/lists/depositHistory?name=${encodeURIComponent(row.name)}&id=${encodeURIComponent(row.id)}&phone=${encodeURIComponent(row.phone)}&from=user`}
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
  {
    key: "call",
    title: "Call",
    width: "30%",
    marginLeft: "38px",
    render: (row) => {
      return <p>{row.name}</p>;
    },
  },
  { key: "date", title: "Data", width: "35%" },
  {
    key: "duration",
    title: "Duration",
    width: "35%",
    render: (row) => {
      return <p style={{ textTransform: "lowercase" }}>{row.duration}</p>;
    },
  },
  { key: "coins", title: "Coins", width: "20%" },
  { key: "theme", title: "Theme", width: "35%" },
  {
    key: "hasRequest",
    title: "Deposit request",
    width: "35%",
    render: (row) => {
      if ("hasRequest" in row && row.hasRequest) {
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
  {
    key: "select",
    renderHeader: () => <input type="checkbox" className="table-check-box" />,
    render: () => <input type="checkbox" className="table-check-box" />,
  },
  {
    key: "request",
    title: "Withdraw",
    width: "25%",
    render: () => {
      return <p>Withdraw</p>;
    },
  },
  { key: "date", title: "Data", width: "15%" },
  {
    key: "amount",
    title: "Coins",
    width: "15%",
  },
  {
    key: "status",
    title: "Withdraw request",
    width: "70%",
    render: (row) => {
      if ("status" in row && row.status === "PENDING") {
        return (
          <Link
            to={`/home/lists/translator/withdraw?name=${encodeURIComponent(row.name)}&id=${encodeURIComponent(row.userId)}&from=translator`}
            className="view-btn request"
          >
            Request <MdArrowForwardIos className="view-icon" />
          </Link>
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
  {
    key: "select",
    renderHeader: () => <input type="checkbox" className="table-check-box" />,
    render: () => <input type="checkbox" className="table-check-box" />,
  },
  {
    key: "request",
    title: "Deposit",
    width: "25%",
    render: () => {
      return <p>Deposit</p>;
    },
  },
  { key: "date", title: "Data", width: "15%" },
  { key: "amount", title: "Coins", width: "15%" },
  {
    key: "status",
    title: "Deposit request",
    width: "70%",
    render: (row) => {
      if ("status" in row && row.status === "PENDING") {
        return (
          <Link
            to={`/home/lists/user/deposit?name=${encodeURIComponent(row.name)}&id=${encodeURIComponent(row.id)}&from=user`}
            className="view-btn request"
          >
            Request <MdArrowForwardIos className="view-icon" />
          </Link>
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

type FieldConfig = {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  extra?: string; // доп. информация (например, баланс)
};

export type FormValues = {
  accountHolder: string;
  accountNumber: string;
  nameOfBank: string;
  sum: string;
};

export const FIELDS_WITHDRAW_CONFIG: FieldConfig[] = [
  {
    name: "accountNumber",
    label: "User Name",
    placeholder: "",
  },
  {
    name: "nameOfBank",
    label: "Bank Name",
    placeholder: "",
  },
  {
    name: "accountHolder",
    label: "Bank Account",
    placeholder: "",
  },

  {
    name: "sum",
    label: "Withdrawal Amount",
    placeholder: "",
    extra: "",
  },
];

export const FIELDS_DEPOSIT_CONFIG: FieldConfig[] = [
  {
    name: "accountHolder",
    label: "User",
    placeholder: "",
  },
  {
    name: "accountNumber",
    label: "Phone",
    placeholder: "",
  },

  {
    name: "sum",
    label: "Label",
    placeholder: "",
  },
];
