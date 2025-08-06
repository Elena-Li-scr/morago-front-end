import { useParams } from "react-router-dom";
import { tableConfigs } from "../constans/tableConfigs/tableConfigs";
import FlexTable from "../components/FlexTable";
import type { TableType } from "../types/types";
import { dbData } from "../db/db";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { titleMap } from "../constans/titleMap/titleMap";
import { IoSearch } from "react-icons/io5";
import PopUp from "../components/PopUp";

const isTableType = (value: string): value is TableType => {
  return ["user", "translator", "call", "withdraw", "theme"].includes(value);
};

export const GenericTablePage = () => {
  const { type } = useParams();

  if (!type || !isTableType(type)) {
    return <div>Not found</div>;
  }
  const columns = tableConfigs[type];
  const data = dbData[type];
  const titlePage = titleMap[type];

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-info page-block">
          <h3 className="page-info-title">{titlePage}</h3>
          <Breadcrumbs />
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
      <FlexTable columns={columns} data={data} rowKey={(row) => row.id} type={type} />
      <PopUp type="categories" id="1" />
    </div>
  );
};
