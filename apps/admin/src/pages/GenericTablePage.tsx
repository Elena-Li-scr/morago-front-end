import { useParams } from "react-router-dom";
import { listsTableConfigs, topicTableConfigs } from "../constans/tableConfigs/tableConfigs";
import FlexTable from "../components/FlexTable";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { titleMapLists, titleMapTopics } from "../constans/titleMap/titleMap";
import { IoSearch } from "react-icons/io5";
import type { ListsType, TopicsType } from "../types/types";
import {
  getAdminCategories,
  getAdminThemes,
  getAdminTranslators,
  getAdminUsers,
  getCallHistoryid,
  getCategoryById,
  getDepositHistoryid,
  getWithdrawHistoryid,
} from "../api/services/services";
import { useEffect, useState } from "react";

type Props = { section?: string };

type ApiUser = {
  id: number;
  firstName: string;
  lastName?: string;
  phone: string;
  levelOfKorean: string;
  email: string;
  dateOfBirth: string;
  hasWithdrawalRequest: string;
  categoryId: number;
  duration: number;
};

type SortDir = "ASC" | "DESC" | "";
export default function GenericTablePage({ section }: Props) {
  const [rows, setRows] = useState<any[]>([]);

  const [page, setPage] = useState(0); // 0-based
  const [size, setSize] = useState(5); // сколько на странице
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { type } = useParams();
  const [query, setQuery] = useState("");
  const [sortDir, setSortDir] = useState<SortDir>();

  //  Sort Data List - ASC or DESC input
  const sortByName = (list: Row[], dir: SortDir) => {
    const collator = new Intl.Collator(["ru", "en"], {
      sensitivity: "base",
      ignorePunctuation: true,
      numeric: true,
    });

    return [...list].sort((a, b) => {
      const an = (a.name ?? "").trim();
      const bn = (b.name ?? "").trim();
      const cmp = collator.compare(an, bn);
      return dir === "DESC" ? -cmp : cmp;
    });
  };

  const handleSort = () => {
    setRows((prev) => sortByName(prev, sortDir || ""));
  };

  // Define path for "Breadcrumbs"
  const searchParams = new URLSearchParams(location.search);

  const from = searchParams.get("from") || undefined;
  const name = searchParams.get("name");
  const userId = searchParams.get("id");
  const userPhone = searchParams.get("phone");

  const duration = (total: number) => {
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    const result: string[] = [];
    if (hours > 0) result.push(`${hours} h`);
    if (minutes > 0) result.push(`${minutes} min`);
    if (seconds > 0) result.push(`${seconds} sec`);

    return result.join(" ");
  };
  // Load Data List
  useEffect(() => {
    async function load() {
      try {
        let data;
        let rows;
        if (section === "lists" && type === "user") {
          data = await getAdminUsers(page, size, query);
          rows = (data.content ?? []).map((u: ApiUser) => ({
            ...u,
            phone: u.phone.replace(/(\d{3})(\d{4})(\d{2})(\d{2})/, "$1 $2 $3 $4"),
            name: [u.firstName, u.lastName].filter(Boolean).join(" ").trim(),
          }));
        }
        if (section === "lists" && type === "translator") {
          data = await getAdminTranslators(page, size, query);
          rows = (data.content ?? []).map((u: ApiUser) => ({
            ...u,
            phone: u.phone.replace(/(\d{3})(\d{4})(\d{2})(\d{2})/, "$1 $2 $3 $4"),
            name: [u.firstName, u.lastName].filter(Boolean).join(" ").trim(),
          }));
        }
        if (section === "lists" && type === "callHistory" && userId) {
          data = await getCallHistoryid(userId, page, size);
          rows = (data.content ?? []).map((u: ApiUser) => ({
            ...u,
            id: u.duration,
            duration: duration(u.duration),
          }));
        }
        if (section === "lists" && type === "depositHistory" && userId) {
          data = await getDepositHistoryid(userId, page, size);
          rows = (data.content ?? []).map((u: ApiUser) => ({
            ...u,
            amount: u.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
            name: userPhone,
            id: userId,
          }));
        }
        if (section === "lists" && type === "withdrawHistory" && userId) {
          data = await getWithdrawHistoryid(Number(userId), page, size);
          rows = (data.content ?? []).map((u: ApiUser) => ({
            ...u,
            amount: u.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
            name: name,
            id: userId,
          }));
        }
        if (section === "topics" && type === "categories") {
          data = await getAdminCategories(page, size, query);
          rows = data.content ?? [];
        }
        if (section === "topics" && type === "themes") {
          data = await getAdminThemes(page, size, query);
          rows = await Promise.all(
            data.content.map(async (u: ApiUser) => ({
              ...u,
              categories: await getCategoryById(u.categoryId),
            })),
          );
        }
        setTotalPages(data.totalPages);
        setRows(rows);
      } catch (e: any) {
        setError(e?.message ?? "Load error");
      }
    }
    load();
  }, [section, type, page, size, query, userId]);

  useEffect(() => {
    setPage(0);
  }, [type]);

  if (!type) return <div>Not found</div>;

  // Define the type for COLUMNS of Tables
  const columns =
    section === "lists"
      ? listsTableConfigs[type as ListsType]
      : topicTableConfigs[type as TopicsType];

  // Define the TITLE for page
  const title =
    section === "lists" ? titleMapLists[type as ListsType] : titleMapTopics[type as TopicsType];

  // Search function
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

  const filtered = rows.filter((item) => {
    if (item.name) return normalize(item.name).startsWith(normalize(query));
    else return item;
  });

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div className="container">
      <div className="generic-table-page">
        <div className="generic-table-data">
          <div className="page-header">
            <div className="page-info page-block">
              <h3 className="page-info-title">
                {title} {name}
              </h3>
              <Breadcrumbs from={from} />
            </div>
            <div className="page-search page-block">
              <div className="page-search-name">
                <IoSearch className="search-icon" />
                <input
                  type="text"
                  value={query}
                  placeholder="Search by name or company "
                  onChange={(e) => setQuery(e.target.value)}
                ></input>
              </div>
              <div className="page-search-filter">
                <input type="text" placeholder="Filter" />
                <label>
                  Имя:
                  <select
                    value={sortDir}
                    onChange={(e) => setSortDir(e.target.value as SortDir)}
                    className={`select ${sortDir !== undefined ? "select-asc" : ""}`}
                  >
                    <option value="">Choose action</option>
                    <option value="ASC">По возрастанию</option>
                    <option value="DESC">По убыванию </option>
                  </select>
                </label>
                <button
                  className="page-search-btn"
                  disabled={sortDir === undefined}
                  onClick={handleSort}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          <FlexTable
            columns={columns}
            data={filtered || rows}
            rowKey={(row) => row.id}
            tableType={type}
          />
        </div>
        <div className="pagination-row">
          {rows.length > 1 && (
            <div className="pagination">
              <button onClick={prev} disabled={page === 0}>
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)} className={i === page ? "active" : ""}>
                  {i + 1}
                </button>
              ))}
              <button onClick={next} disabled={page + 1 >= totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
