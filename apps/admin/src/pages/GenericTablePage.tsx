import { useParams } from "react-router-dom";
import { listsTableConfigs, topicTableConfigs } from "../constans/tableConfigs/tableConfigs";
import FlexTable from "../components/FlexTable";
import { dbData } from "../db/db";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { titleMapLists, titleMapTopics } from "../constans/titleMap/titleMap";
import { IoSearch } from "react-icons/io5";
import { isListsTableType, isTopicsType } from "../constans/tableConfigs/configs";
import type { ListsType, TopicsType } from "../types/types";
import { getAdminTranslators } from "../api/services/services";
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
};
export default function GenericTablePage({ section }: Props) {
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { type } = useParams();

  useEffect(() => {
    // примеры: подставь нужные загрузчики под другие типы
    async function load() {
      try {
        if (section === "lists" && type === "translator") {
          const page = await getAdminTranslators();
          const rows = (page.content ?? []).map((u: ApiUser) => ({
            ...u,
            name: [u.firstName, u.lastName].filter(Boolean).join(" ").trim(),
            role: "translator",
          }));
          setRows(rows);
          return;
        }

        // примеры для других страниц
        // if (section === "lists" && type === "translator") { ... }
        // if (section === "topics" && type === "themes") { ... }
      } catch (e: any) {
        setError(e?.message ?? "Load error");
      }
    }
    load();
  }, [section, type]);

  if (!type) return <div>Not found</div>;

  const isValid = section === "lists" ? isListsTableType(type) : isTopicsType(type);
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get("from") || undefined;
  const name = searchParams.get("name");

  const columns =
    section === "lists"
      ? listsTableConfigs[type as ListsType]
      : topicTableConfigs[type as TopicsType];

  const title =
    section === "lists" ? titleMapLists[type as ListsType] : titleMapTopics[type as TopicsType];

  if (!isValid) return <div>Not found</div>;

  return (
    <div className="container">
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
            <input type="text" placeholder="Search by name or company "></input>
          </div>
          <div className="page-search-filter">
            <input type="text" placeholder="Filter" />
            <input type="text" placeholder="Choose action" />
            <button className="page-search-btn">Apply</button>
          </div>
        </div>
      </div>
      <FlexTable columns={columns} data={rows} rowKey={(row) => row.id} tableType={type} />
    </div>
  );
}
