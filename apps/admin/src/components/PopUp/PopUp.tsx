import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

import "../../assets/style/popUp.css";
import "@shared/styles/modals.css";

import { usePopUp, type PopUpInfo } from "./usePopUp";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCategoryById,
  getThemeById,
  getTranslatorById,
  getUserById,
} from "@shared/services/adminApi";
import FileUpload from "../FileUpload";
import { useModalStore } from "@shared/store/useStore";

interface Category {
  id: number;
  name: string;
  isActive: boolean;
}

interface Theme {
  id: number;
  name: string;
  isActive: boolean;
  iconId: number;
  categoryId: number;
  isPopular: boolean;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  balance: number;
  hasDepositRequest: boolean;
}

interface Translator {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isOnline: boolean;
  levelOfKorean: number;
  dateOfBirth: string;
  hasWithdrawalRequest: boolean;
}

// type PopUpData = User | Translator | Theme | Category;

function isPerson(d: unknown): d is User | Translator {
  return typeof d === "object" && d !== null && "firstName" in d;
}
function isTranslator(d: unknown): d is Translator {
  return typeof d === "object" && d !== null && "email" in d;
}
function isTheme(d: unknown): d is Theme {
  return typeof d === "object" && d !== null && "iconId" in d;
}
function isCategory(d: unknown): d is Category {
  return typeof d === "object" && d !== null && "name" in d && !("iconId" in d);
}

export default function PopUp() {
  const { pathname } = useLocation();
  const { loading } = useModalStore();
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  const { popUpData, setPopUpData, popUpStatus } = usePopUp();
  const [data, setData] = useState<PopUpInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (popUpStatus == "open" || !popUpData) return;
    let cancelled = false;
    (async () => {
      try {
        let popInfo: PopUpInfo | null = null;
        switch (popUpData.type) {
          case "user": {
            const res = await getUserById(popUpData.id);
            popInfo = res.data;
            break;
          }
          case "translator": {
            const res = await getTranslatorById(popUpData.id);
            popInfo = res.data;
            break;
          }
          case "themes": {
            const res = await getThemeById(popUpData.id);
            let category: Category | null = null;
            if (res.data.categoryId != null) {
              category = await getCategoryById(res.data.categoryId);
            }
            const popInfo: PopUpInfo = {
              ...res.data,
              categoryId: category?.id,
              category,
            };
            setData(popInfo);
            break;
          }
          case "categories": {
            const res = await getCategoryById(popUpData.id);
            popInfo = res;
            break;
          }
        }

        if (!cancelled && popInfo) {
          setData({ ...popInfo, id: popInfo.id });
        }
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [popUpData, popUpStatus]);

  if (!popUpData || popUpStatus == "open" || loading) return null;
  return (
    <div className="pop-up-wrapper" onClick={() => setPopUpData(null)}>
      <div className="pop-up" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-window-close-button"
          type="button"
          onClick={() => setPopUpData(null)}
        >
          <IoClose />
        </button>
        <div className="pop-up-header">
          <div className="pop-up-image">
            <FileUpload translatorAvatar={""}></FileUpload>
          </div>
          <div className="pop-up-setting">
            <button
              type="button"
              className="pop-up-setting-button"
              onClick={() => {
                if (popUpData && last !== "user" && last !== "translator") {
                  setPopUpData(null);
                  navigate(
                    `/home/translationTopics/${popUpData.type}/${popUpData.id}/upDate?from=${last}`,
                  );
                }
              }}
            >
              <p>Edit</p> <img src="/assets/arrow-right.png" alt="arrow right" />
            </button>

            {last !== "user" && last !== "translator" && (
              <button type="button" className="pop-up-setting-button">
                <p>Status</p>
                <img src="/assets/setting.png" alt="setting" />
              </button>
            )}
          </div>
        </div>
        <div className="pop-up-content">
          <div className="pop-up-content-left">
            {data && <h4>{data.name ? data.name : `${data.firstName} ${data.lastName}`}</h4>}
            {last === "translator" && (
              <div className="translations-themes">
                <h5>Translations:</h5>
                <ol className="themes-list">
                  {data?.themes?.map((i) => (
                    <li key={i.id}>{i.name}</li>
                  ))}
                </ol>
              </div>
            )}
            {last === "translator" && (
              <div className="translations-lang">
                <h5>Language:</h5>
                <ol className="languages-list">
                  {data?.languages?.map((i) => (
                    <li key={i.id}>{i.name}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="pop-up-content-right">
            {isPerson(data) && (
              <div>
                <h5>Phone:</h5>
                <p>
                  {data.phone
                    .replace(/\D/g, "")
                    .replace(/^(\d{3})(\d{0,4})(\d{0,2})(\d{0,2}).*/, (_, a, b, c, d) =>
                      [a, b, c, d].filter(Boolean).join(" "),
                    )}
                </p>
              </div>
            )}

            {isTranslator(data) && (
              <>
                <div>
                  <h5>Email:</h5>
                  <p>{data.email}</p>
                </div>
                <div>
                  <h5>TOPIK:</h5>
                  <p>{data.levelOfKorean} level</p>
                </div>
                <div>
                  <h5>Birth:</h5>
                  <p>{data.dateOfBirth}</p>
                </div>
              </>
            )}

            {isTheme(data) && (
              <div>
                <h5>Category:</h5>
                <p>{data.categoryId}</p>
              </div>
            )}

            {isPerson(data) && !isTranslator(data) && (
              <div>
                <h5>Coins:</h5>
                <p>{data.balance}</p>
              </div>
            )}

            {last !== "user" && (isTheme(data) || isCategory(data)) && (
              <div>
                <h5>Status:</h5>
                <p>{data.isActive ? "Active" : "Non active"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
