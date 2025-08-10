import { useParams } from "react-router-dom";
import { listsTableConfigs, topicTableConfigs } from "../constans/tableConfigs/tableConfigs";
import FlexTable from "../components/FlexTable";
import { dbData } from "../db/db";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { titleMapLists, titleMapTopics } from "../constans/titleMap/titleMap";
import { IoSearch } from "react-icons/io5";
import { isListsTableType, isTopicsType } from "../constans/tableConfigs/configs";
import type { ListsType, TopicsType } from "../types/types";

type Props = { section: string };
export default function GenericTablePage({ section }: Props) {
  const { type } = useParams();

  if (!type) return <div>Not found</div>;

  const isValid = section === "lists" ? isListsTableType(type) : isTopicsType(type);

  if (!isValid) return <div>Not found</div>;
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get("from") || undefined;
  const name = searchParams.get("name");

  const columns =
    section === "lists"
      ? listsTableConfigs[type as ListsType]
      : topicTableConfigs[type as TopicsType];

  const title =
    section === "lists" ? titleMapLists[type as ListsType] : titleMapTopics[type as TopicsType];

  const data = dbData[type];

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-info page-block ">
          <h3 className="page-info-title">
            {title} {name}
          </h3>
          <Breadcrumbs from={from} />
        </div>
        <div className="page-search page-block ">
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
      <FlexTable columns={columns} data={data} rowKey={(row) => row.id} type={type} />
    </div>
  );
}
