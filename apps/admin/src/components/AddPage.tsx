import { Breadcrumbs } from "./Breadcrumbs";
import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/style/addPage.css";
import {
  getAdminCategories,
  postAdminCategories,
  postAdminThemes,
  getCategoryById,
  getThemeById,
  updateCategory,
  updateTheme,
  getWithdrawHistory,
  getDepositHistory,
} from "../api/services/services";
import { FIELDS_DEPOSIT_CONFIG, FIELDS_WITHDRAW_CONFIG } from "../constans/tableConfigs/configs";

interface Form {
  theme?: string;
  category?: string;
  image?: FileList;
  categoryIds: (number | string)[];
  isActive?: boolean;
  withdraw?: string;
  accountHolder?: string;
  accountNumber?: string;
  nameOfBank?: string;
  sum?: string;
}

interface Option {
  id: number;
  label: string;
}

export default function AddPage() {
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Form>({ mode: "onChange", defaultValues: { categoryIds: [], isActive: true } });

  useEffect(() => {
    (async () => {
      try {
        const cats = await getAdminCategories();
        setCategoryOptions(cats.content.map((c) => ({ id: c.id, label: c.name })));
      } catch (e) {
        console.error("Не удалось загрузить данные", e);
      }
    })();
    register("image");
  }, [register]);

  const { request } = useParams();
  const { type } = useParams();
  const { id } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get("from") || undefined;
  const userId = searchParams.get("id");
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");

  const navigate = useNavigate();
  const imageFiles = watch("image");
  const fileName = imageFiles?.[0]?.name ?? "";
  const [openCat, setOpenCat] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!catRef.current?.contains(e.target as Node)) setOpenCat(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const server = async () => {
      try {
        if (type === "categories" && id) {
          const data = await getCategoryById(id);
          setValue("category", data.name);
        }
        if (type === "themes" && id) {
          const data = await getThemeById(id);
          setValue("theme", data.name);
        }
        if (request === "withdraw" && userId) {
          const data = await getWithdrawHistory(userId);
          const rows = {
            ...data,
            sum: data.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
            accountNumber: name,
          };
          FIELDS_WITHDRAW_CONFIG.forEach((field) => {
            if (rows[field.name]) {
              setValue(field.name, rows[field.name]);
            }
          });
        }
        if (request === "deposit" && userId) {
          const data = await getDepositHistory(userId);
          const rows = {
            ...data,
            sum: data.coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
            accountNumber: phone ?? name,
          };
          FIELDS_DEPOSIT_CONFIG.forEach((field) => {
            if (rows[field.name]) {
              setValue(field.name, rows[field.name]);
            }
          });
        }
      } catch (e) {
        console.error("Ошибка при загрузке:", e);
      }
    };

    server();
  }, [id, type, setValue, request, userId]);

  const onSubmit = async (data: Form) => {
    if (type === "categories" && data.category && !id) {
      await postAdminCategories(data.category);
    } else if (type === "categories" && data && id) {
      const category = {
        name: String(data.category),
        isActive: Boolean(data.isActive),
      };
      await updateCategory(id, category);
    }

    if (type === "themes") {
      const upData = {
        name: data.theme,
        title: data.theme,
        price: 15000,
        description: "string",
        nightPrice: 18000,
        isPopular: false,
        isActive: Boolean(data.isActive),
        iconId: 0,
        categoryId: Number(data.categoryIds),
      };
      try {
        if (!id) {
          const res = await postAdminThemes(upData);
          // if (data.image?.[0] && res?.id) {
          //   const formData = new FormData();
          //   formData.append("icon", data.image[0]);
          //   const iconRes = await postAdminThemesIcon({ id: res.id, formData });
          //   console.log(iconRes);
          // }
          console.log(res);
        } else if (id) {
          await updateTheme(id, upData);
        }
      } catch (e) {
        console.log(e);
      }
    }
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="add-page-wrapper">
        <h3 className="page-info-title">{request ? request : type}</h3>
        <Breadcrumbs from={from} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="add-item-form">
            {/* {type !== ""} */}
            {!request && (
              <>
                <div className="file-upload-wrapper">
                  <label htmlFor="theme-upload" className="upload-theme">
                    <div className="upload-theme-left">
                      {type === "themes" ? (
                        fileName ? (
                          <p className="selected-file-name">Выбран файл: {fileName}</p>
                        ) : (
                          <img src="/assets/arrow-line-up.png" alt="upload" />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="upload-theme-right"></div>
                  </label>
                  <input
                    id="theme-upload"
                    type="file"
                    accept="image/*"
                    className="hidden-file-input"
                    onChange={(e) => {
                      if (e.target.files?.length) {
                        setValue("image", e.target.files, { shouldValidate: true });
                      }
                    }}
                  />
                </div>
                <label>{type}</label>
              </>
            )}
            {type === "themes" && (
              <input
                type="text"
                placeholder="Theme name"
                className="add-item-input"
                {...register("theme", {
                  required: "Введите название новой темы",
                })}
              />
            )}
            {type === "categories" && (
              <input
                type="text"
                placeholder="Category name"
                className="add-item-input"
                {...register("category", {
                  required: "Введите название новой категории",
                })}
              />
            )}
            {type === "themes" && (
              <>
                <label>Categories</label>
                <Controller
                  name="categoryIds"
                  control={control}
                  rules={{
                    validate: (v) => (v && v.length > 0) || "Выберите хотя бы одну категорию",
                  }}
                  render={({ field }) => {
                    const selectedLabels = categoryOptions
                      .filter((o) => field.value.includes(o.id))
                      .map((o) => o.label);
                    const toggle = (id: number | string) => {
                      const next = field.value.includes(id)
                        ? field.value.filter((v) => v !== id)
                        : [...field.value, id];
                      field.onChange(next);
                    };
                    return (
                      <div className="ms-inline" ref={catRef} style={{ position: "relative" }}>
                        <button
                          type="button"
                          className="add-item-input"
                          onClick={() => setOpenCat((o) => !o)}
                          aria-haspopup="listbox"
                          aria-expanded={openCat}
                        >
                          <span style={{ color: selectedLabels.length ? "inherit" : "#8a8a8a" }}>
                            {selectedLabels.length ? selectedLabels.join(", ") : "Choose..."}
                          </span>
                          <img src="/assets/drop.png" alt="open" />
                        </button>
                        {openCat && (
                          <div className="ms-popover" role="listbox" aria-multiselectable="true">
                            <ul className="add-item-ul">
                              {categoryOptions.map((o) => (
                                <li key={o.id}>
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={field.value.includes(o.id)}
                                      onChange={() => toggle(o.id)}
                                    />
                                    <span className="category-option">{o.label}</span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
                {errors.categoryIds && <span className="error">{errors.categoryIds.message}</span>}
              </>
            )}
            {id && (
              <div className="checkbox">
                <input type="checkbox" {...register("isActive")} />
                <label>Is Active?</label>
              </div>
            )}
            {request === "withdraw" && (
              <>
                {FIELDS_WITHDRAW_CONFIG.map((field) => (
                  <div key={field.name}>
                    <label>{field.label}</label>
                    {field.extra && <p>{field.extra}</p>}
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      disabled
                      className="add-item-input"
                      {...register(field.name, { required: `Введите ${field.label}` })}
                    />
                  </div>
                ))}
              </>
            )}
            {request === "deposit" && (
              <>
                {FIELDS_DEPOSIT_CONFIG.map((field) => (
                  <div key={field.name}>
                    <label>{field.label}</label>
                    {field.extra && <p>{field.extra}</p>}
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      disabled
                      className="add-item-input"
                      {...register(field.name, { required: `Введите ${field.label}` })}
                    />
                  </div>
                ))}
              </>
            )}
            {errors.theme && <span className="error">{errors.theme.message}</span>}
            {errors.category && <span className="error">{errors.category.message}</span>}
          </div>
          <div className="add-item-buttons">
            <button
              type="button"
              className="add-item-button cancel-button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="add-item-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
