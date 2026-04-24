import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useState,
} from "react";
import type {
  Course,
  CourseFormatPoint,
  CourseInput,
  CourseModule,
  CourseOutcome,
  CoursePart,
  CourseStat,
} from "../types";
import { CloseIcon, PlusIcon } from "./icons";
import styles from "./CourseForm.module.css";

interface Props {
  initial?: Course | null;
  submitLabel?: string;
  onSubmit: (input: CourseInput) => void;
  onCancel?: () => void;
}

function uid(): string {
  return crypto.randomUUID();
}

function emptyStat(): CourseStat {
  return { id: uid(), label: "", value: "" };
}

function emptyOutcome(): CourseOutcome {
  return { id: uid(), title: "", description: "" };
}

function emptyModule(): CourseModule {
  return {
    id: uid(),
    number: "",
    duration: "",
    title: "",
    description: "",
    tags: [],
  };
}

function emptyPart(): CoursePart {
  return {
    id: uid(),
    eyebrow: "",
    title: "",
    subtitle: "",
    modules: [emptyModule()],
  };
}

function emptyFormatPoint(): CourseFormatPoint {
  return { id: uid(), number: "", title: "", description: "" };
}

function initialState(course: Course | null | undefined): CourseInput {
  if (!course) {
    return {
      eyebrow: "",
      name: "",
      tagline: "",
      stats: [emptyStat()],
      audience: [],
      outcomes: [emptyOutcome()],
      forYouIf: { title: "", body: "", items: [] },
      tools: [],
      parts: [emptyPart()],
      format: [emptyFormatPoint()],
      aiHelper: undefined,
      certificate: undefined,
      finalOutcomes: [],
    };
  }
  const { id: _id, createdAt: _createdAt, ...rest } = course;
  return rest;
}

export function CourseForm({
  initial,
  submitLabel = "Saqlash",
  onSubmit,
  onCancel,
}: Props) {
  const [state, setState] = useState<CourseInput>(() => initialState(initial));
  const [showAiHelper, setShowAiHelper] = useState<boolean>(
    Boolean(initial?.aiHelper),
  );
  const [showCertificate, setShowCertificate] = useState<boolean>(
    Boolean(initial?.certificate),
  );

  const patch = <K extends keyof CourseInput>(key: K, value: CourseInput[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed: CourseInput = {
      ...state,
      name: state.name.trim(),
      tagline: state.tagline.trim(),
      eyebrow: state.eyebrow.trim(),
      aiHelper: showAiHelper ? state.aiHelper : undefined,
      certificate: showCertificate ? state.certificate : undefined,
    };
    if (!trimmed.name) return;
    onSubmit(trimmed);
  };

  const canSubmit = state.name.trim() !== "";

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Basics --------------------------------------------------------- */}
      <Section title="Asoslar" subtitle="Kurs nomi va qisqa tavsif.">
        <Field
          label="Eyebrow / yorliq"
          hint="Masalan: ISH UCHUN AI · 2026"
        >
          <input
            className={styles.input}
            type="text"
            value={state.eyebrow}
            onChange={(e) => patch("eyebrow", e.target.value)}
            placeholder="ISH UCHUN AI · 2026"
          />
        </Field>
        <Field label="Nomi" required>
          <input
            className={styles.input}
            type="text"
            value={state.name}
            onChange={(e) => patch("name", e.target.value)}
            placeholder="Kurs nomi"
            required
          />
        </Field>
        <Field label="Qisqa tavsif">
          <textarea
            className={styles.textarea}
            value={state.tagline}
            onChange={(e) => patch("tagline", e.target.value)}
            placeholder="1–3 gap — kurs nima haqida va kim uchun"
            rows={3}
          />
        </Field>
      </Section>

      {/* Stats ---------------------------------------------------------- */}
      <Section
        title="Statistika"
        subtitle="Hero ostida ko'rinadi — davomiyligi, haftalik yuklama, modullar soni va h.k."
      >
        <RepeatableList
          items={state.stats}
          onChange={(next) => patch("stats", next)}
          makeEmpty={emptyStat}
          addLabel="Statistika qo'shish"
          renderItem={(item, onItemChange) => (
            <div className={styles.rowPair}>
              <input
                className={styles.input}
                type="text"
                value={item.label}
                onChange={(e) =>
                  onItemChange({ ...item, label: e.target.value })
                }
                placeholder="Yorliq (Davomiyligi)"
              />
              <input
                className={styles.input}
                type="text"
                value={item.value}
                onChange={(e) =>
                  onItemChange({ ...item, value: e.target.value })
                }
                placeholder="Qiymat (2 oy)"
              />
            </div>
          )}
        />
      </Section>

      {/* Audience ------------------------------------------------------- */}
      <Section
        title="Auditoriya"
        subtitle="Kurs kimlar uchun — chiplar ko'rinishida."
      >
        <ChipInput
          values={state.audience}
          onChange={(v) => patch("audience", v)}
          placeholder="Marketologlar, Menejerlar…"
        />
      </Section>

      {/* Outcomes ------------------------------------------------------- */}
      <Section
        title="Natijalar"
        subtitle="4 ga yaqin asosiy natija — nima o'rganasiz."
      >
        <RepeatableList
          items={state.outcomes}
          onChange={(next) => patch("outcomes", next)}
          makeEmpty={emptyOutcome}
          addLabel="Natija qo'shish"
          renderItem={(item, onItemChange) => (
            <div className={styles.stack}>
              <input
                className={styles.input}
                type="text"
                value={item.title}
                onChange={(e) =>
                  onItemChange({ ...item, title: e.target.value })
                }
                placeholder="Nomi"
              />
              <textarea
                className={styles.textarea}
                value={item.description}
                onChange={(e) =>
                  onItemChange({ ...item, description: e.target.value })
                }
                placeholder="Tavsifi"
                rows={2}
              />
            </div>
          )}
        />
      </Section>

      {/* For you if ----------------------------------------------------- */}
      <Section
        title="Kurs siz uchun, agar..."
        subtitle="Qora fonli callout — potensial o'quvchilarga qaratilgan."
      >
        <Field label="Sarlavha">
          <input
            className={styles.input}
            type="text"
            value={state.forYouIf.title}
            onChange={(e) =>
              patch("forYouIf", { ...state.forYouIf, title: e.target.value })
            }
            placeholder="Kurs sizga yordam beradi, agar..."
          />
        </Field>
        <Field
          label="Bandlar"
          hint="Har bir bandni Enter bilan qo'shing; bekor qilish uchun × bosing."
        >
          <StringListInput
            values={state.forYouIf.items}
            onChange={(v) =>
              patch("forYouIf", { ...state.forYouIf, items: v })
            }
            placeholder="Masalan: qayerdan boshlashni bilmasangiz..."
          />
        </Field>
      </Section>

      {/* Tools ---------------------------------------------------------- */}
      <Section
        title="Vositalar"
        subtitle="Kursda ishlatiladigan AI vositalar — chiplar."
      >
        <ChipInput
          values={state.tools}
          onChange={(v) => patch("tools", v)}
          placeholder="ChatGPT, Claude, Gemini…"
        />
      </Section>

      {/* Parts + Modules ----------------------------------------------- */}
      <Section
        title="Kurs dasturi"
        subtitle="Qismlar va ular ichidagi modullar."
      >
        <RepeatableList
          items={state.parts}
          onChange={(next) => patch("parts", next)}
          makeEmpty={emptyPart}
          addLabel="Qism qo'shish"
          removeLabel="Qismni o'chirish"
          renderItem={(part, onPartChange) => (
            <div className={styles.partBlock}>
              <div className={styles.rowPair}>
                <input
                  className={styles.input}
                  type="text"
                  value={part.eyebrow}
                  onChange={(e) =>
                    onPartChange({ ...part, eyebrow: e.target.value })
                  }
                  placeholder="Yorliq (I QISM)"
                />
                <input
                  className={styles.input}
                  type="text"
                  value={part.title}
                  onChange={(e) =>
                    onPartChange({ ...part, title: e.target.value })
                  }
                  placeholder="Qism nomi"
                />
              </div>
              <textarea
                className={styles.textarea}
                value={part.subtitle}
                onChange={(e) =>
                  onPartChange({ ...part, subtitle: e.target.value })
                }
                placeholder="Qism tavsifi (ixtiyoriy)"
                rows={2}
              />

              <div className={styles.nestedHeader}>
                <span className={styles.nestedLabel}>Modullar</span>
              </div>
              <RepeatableList
                items={part.modules}
                onChange={(next) =>
                  onPartChange({ ...part, modules: next })
                }
                makeEmpty={emptyModule}
                addLabel="Modul qo'shish"
                removeLabel="Modulni o'chirish"
                renderItem={(module, onModuleChange) => (
                  <div className={styles.moduleBlock}>
                    <div className={styles.rowPair}>
                      <input
                        className={styles.input}
                        type="text"
                        value={module.number}
                        onChange={(e) =>
                          onModuleChange({
                            ...module,
                            number: e.target.value,
                          })
                        }
                        placeholder="Raqam (00)"
                      />
                      <input
                        className={styles.input}
                        type="text"
                        value={module.duration}
                        onChange={(e) =>
                          onModuleChange({
                            ...module,
                            duration: e.target.value,
                          })
                        }
                        placeholder="Davomiyligi (1 HAFTA)"
                      />
                    </div>
                    <input
                      className={styles.input}
                      type="text"
                      value={module.title}
                      onChange={(e) =>
                        onModuleChange({ ...module, title: e.target.value })
                      }
                      placeholder="Modul nomi"
                    />
                    <textarea
                      className={styles.textarea}
                      value={module.description}
                      onChange={(e) =>
                        onModuleChange({
                          ...module,
                          description: e.target.value,
                        })
                      }
                      placeholder="Modul tavsifi"
                      rows={2}
                    />
                    <ChipInput
                      values={module.tags}
                      onChange={(v) =>
                        onModuleChange({ ...module, tags: v })
                      }
                      placeholder="Teglar — Enter bilan qo'shing"
                    />
                    <label className={styles.checkboxRow}>
                      <input
                        type="checkbox"
                        checked={Boolean(module.final)}
                        onChange={(e) =>
                          onModuleChange({
                            ...module,
                            final: e.target.checked || undefined,
                          })
                        }
                      />
                      <span>Yakuniy (capstone) modul</span>
                    </label>
                  </div>
                )}
              />
            </div>
          )}
        />
      </Section>

      {/* Format --------------------------------------------------------- */}
      <Section
        title="Format"
        subtitle="Kurs qanday o'tadi — workshop, ish daftari, platforma va boshqalar."
      >
        <RepeatableList
          items={state.format}
          onChange={(next) => patch("format", next)}
          makeEmpty={emptyFormatPoint}
          addLabel="Format nuqtasi qo'shish"
          renderItem={(item, onItemChange) => (
            <div className={styles.stack}>
              <div className={styles.rowPair}>
                <input
                  className={styles.input}
                  type="text"
                  value={item.number}
                  onChange={(e) =>
                    onItemChange({ ...item, number: e.target.value })
                  }
                  placeholder="Raqam (01)"
                />
                <input
                  className={styles.input}
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    onItemChange({ ...item, title: e.target.value })
                  }
                  placeholder="Nomi"
                />
              </div>
              <textarea
                className={styles.textarea}
                value={item.description}
                onChange={(e) =>
                  onItemChange({ ...item, description: e.target.value })
                }
                placeholder="Tavsifi"
                rows={2}
              />
            </div>
          )}
        />
      </Section>

      {/* Optional callouts --------------------------------------------- */}
      <Section
        title="Qo'shimcha callout'lar"
        subtitle="AI yordamchi va sertifikat haqida qisqa bloklar — ixtiyoriy."
      >
        <CalloutToggle
          label="AI yordamchi bloki"
          enabled={showAiHelper}
          onToggle={setShowAiHelper}
          value={state.aiHelper ?? { title: "", body: "" }}
          onChange={(v) => patch("aiHelper", v)}
        />
        <CalloutToggle
          label="Sertifikat bloki"
          enabled={showCertificate}
          onToggle={setShowCertificate}
          value={state.certificate ?? { title: "", body: "" }}
          onChange={(v) => patch("certificate", v)}
        />
      </Section>

      {/* Final outcomes ------------------------------------------------ */}
      <Section
        title="Yakuniy natijalar"
        subtitle="Kurs oxirida nima qila olasiz — checklist ko'rinishida."
      >
        <StringListInput
          values={state.finalOutcomes}
          onChange={(v) => patch("finalOutcomes", v)}
          placeholder="Masalan: 10+ ta neyron tarmoqdan foydalanish"
        />
      </Section>

      {/* Actions -------------------------------------------------------- */}
      <div className={styles.actions}>
        {onCancel && (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onCancel}
          >
            Bekor qilish
          </button>
        )}
        <button
          type="submit"
          className={styles.primaryButton}
          disabled={!canSubmit}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

/* ---------- Helpers ------------------------------------------------------ */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
      </header>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </span>
      {children}
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}

interface RepeatableListProps<T extends { id: string }> {
  items: T[];
  onChange: (next: T[]) => void;
  makeEmpty: () => T;
  addLabel: string;
  removeLabel?: string;
  renderItem: (item: T, onChange: (next: T) => void) => ReactNode;
}

function RepeatableList<T extends { id: string }>({
  items,
  onChange,
  makeEmpty,
  addLabel,
  removeLabel = "O'chirish",
  renderItem,
}: RepeatableListProps<T>) {
  const updateAt = (index: number, next: T) => {
    const copy = items.slice();
    copy[index] = next;
    onChange(copy);
  };
  const removeAt = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };
  const add = () => onChange([...items, makeEmpty()]);

  return (
    <div className={styles.repeatable}>
      {items.map((item, i) => (
        <div key={item.id} className={styles.repeatableItem}>
          <div className={styles.repeatableBody}>
            {renderItem(item, (next) => updateAt(i, next))}
          </div>
          <button
            type="button"
            className={styles.repeatableRemove}
            onClick={() => removeAt(i)}
            aria-label={removeLabel}
            title={removeLabel}
          >
            <CloseIcon width={14} height={14} />
          </button>
        </div>
      ))}
      <button type="button" className={styles.addButton} onClick={add}>
        <PlusIcon width={13} height={13} />
        {addLabel}
      </button>
    </div>
  );
}

function ChipInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const v = draft.trim();
    if (!v) return;
    if (!values.includes(v)) onChange([...values, v]);
    setDraft("");
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && !draft && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  };

  return (
    <div className={styles.chipWrap}>
      {values.map((value) => (
        <span key={value} className={styles.chip}>
          {value}
          <button
            type="button"
            className={styles.chipRemove}
            onClick={() => onChange(values.filter((v) => v !== value))}
            aria-label={`${value} ni olib tashlash`}
          >
            <CloseIcon width={11} height={11} />
          </button>
        </span>
      ))}
      <input
        className={styles.chipInput}
        type="text"
        value={draft}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
        onKeyDown={handleKey}
        onBlur={commit}
        placeholder={
          values.length === 0 ? placeholder : "Yana qo'shish…"
        }
      />
    </div>
  );
}

function StringListInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...values, v]);
    setDraft("");
  };

  const updateAt = (index: number, next: string) => {
    const copy = values.slice();
    copy[index] = next;
    onChange(copy);
  };

  return (
    <div className={styles.stringList}>
      {values.map((value, i) => (
        <div key={i} className={styles.stringRow}>
          <input
            className={styles.input}
            type="text"
            value={value}
            onChange={(e) => updateAt(i, e.target.value)}
          />
          <button
            type="button"
            className={styles.stringRemove}
            onClick={() => onChange(values.filter((_, idx) => idx !== i))}
            aria-label="O'chirish"
          >
            <CloseIcon width={13} height={13} />
          </button>
        </div>
      ))}
      <div className={styles.stringRow}>
        <input
          className={styles.input}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
            }
          }}
          onBlur={commit}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function CalloutToggle({
  label,
  enabled,
  onToggle,
  value,
  onChange,
}: {
  label: string;
  enabled: boolean;
  onToggle: (next: boolean) => void;
  value: { title: string; body: string };
  onChange: (next: { title: string; body: string }) => void;
}) {
  return (
    <div className={styles.calloutBlock}>
      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <span>{label}</span>
      </label>
      {enabled && (
        <div className={styles.stack}>
          <input
            className={styles.input}
            type="text"
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
            placeholder="Sarlavha"
          />
          <textarea
            className={styles.textarea}
            value={value.body}
            onChange={(e) => onChange({ ...value, body: e.target.value })}
            placeholder="Matn"
            rows={3}
          />
        </div>
      )}
    </div>
  );
}
