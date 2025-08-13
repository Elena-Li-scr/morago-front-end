import { Breadcrumbs } from "./Breadcrumbs";
import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/style/addPage.css";

interface Props {
  type: "theme" | "category";
}

interface Form {
  theme?: string;
  category?: string;
  image?: FileList;
  categoryIds: (number | string)[];
}

interface Option {
  id: number;
  label: string;
}

const categoryOptions: Option[] = [
  { id: 1, label: "Name Category 1" },
  { id: 2, label: "Name Category 2" },
  { id: 3, label: "Name Category 3" },
  { id: 4, label: "Name Category 4" },
];

export default function AddPage({ type }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Form>({ mode: "onChange", defaultValues: { categoryIds: [] } });

  useEffect(() => {
    register("image");
  }, [register]);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const from = searchParams.get("from") || undefined;
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

  const onSubmit = (data: Form) => {
    console.log(data);
  };

  return (
    <div className="add-page-wrapper">
      <h3 className="page-info-title">{type === "theme" ? "Themes" : "Category"}</h3>
      <Breadcrumbs from={from} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="add-item-form">
          <div className="file-upload-wrapper">
            <label htmlFor="theme-upload" className="upload-theme">
              <div className="upload-theme-left">
                {type === "theme" ? (
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

          <label>{type === "theme" ? "Theme name" : "Category name"}</label>

          {type === "theme" && (
            <input
              type="text"
              placeholder="Theme name"
              className="add-item-input"
              {...register("theme", {
                required: "Введите название новой темы",
              })}
            />
          )}

          {type === "category" && (
            <input
              type="text"
              placeholder="Category name"
              className="add-item-input"
              {...register("category", {
                required: "Введите название новой категории",
              })}
            />
          )}

          {type === "theme" && (
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
                                  <span>{o.label}</span>
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
  );
}
