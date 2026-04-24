import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
} from "../components/icons";
import { getSocialIcon, normalizeSocialHref } from "../components/socialMeta";
import { useCourses } from "../hooks/useCourses";
import { useProfile } from "../hooks/useProfile";
import type { Course } from "../types";
import styles from "./CourseDetailPage.module.css";

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { courses, remove } = useCourses();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Kurs topilmadi</h1>
        <p className={styles.notFoundText}>
          Bunday kurs mavjud emas yoki o'chirilgan.
        </p>
        <Link to="/courses" className={styles.back}>
          <ArrowLeftIcon width={14} height={14} />
          Kurslar ro'yxatiga
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    const ok = window.confirm(
      `"${course.name}" kursini o'chirishni xohlaysizmi? Buni qaytarib bo'lmaydi.`,
    );
    if (!ok) return;
    remove(course.id);
    navigate("/courses");
  };

  const hasContact = Boolean(profile && profile.socials.length > 0);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/courses" className={styles.back}>
          <ArrowLeftIcon width={14} height={14} />
          Kurslar
        </Link>
        <div className={styles.topActions}>
          <Link
            to={`/courses/${course.id}/edit`}
            className={styles.editButton}
          >
            <PencilIcon width={13} height={13} />
            Tahrirlash
          </Link>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            <TrashIcon width={13} height={13} />
            O'chirish
          </button>
        </div>
      </div>

      <Hero course={course} />
      {course.outcomes.length > 0 && <OutcomesSection course={course} />}
      {course.forYouIf.items.length > 0 && <ForYouSection course={course} />}
      {course.tools.length > 0 && <ToolsSection course={course} />}
      {course.parts.length > 0 && <CurriculumSection course={course} />}
      {(course.format.length > 0 ||
        course.aiHelper ||
        course.certificate) && <FormatSection course={course} />}
      {course.finalOutcomes.length > 0 && (
        <FinalOutcomesSection course={course} />
      )}
      {hasContact && profile && <ContactSection profile={profile} />}
    </div>
  );
}

function Hero({ course }: { course: Course }) {
  return (
    <section className={styles.hero}>
      {course.eyebrow && (
        <span className={styles.eyebrow}>{course.eyebrow}</span>
      )}
      <h1 className={styles.heroTitle}>{course.name}</h1>
      {course.tagline && <p className={styles.heroLede}>{course.tagline}</p>}

      {course.stats.length > 0 && (
        <div className={styles.stats}>
          {course.stats.map((stat) => (
            <div key={stat.id} className={styles.stat}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {course.audience.length > 0 && (
        <div className={styles.audience}>
          <span className={styles.audienceLabel}>Kurs kimlar uchun</span>
          <div className={styles.audienceChips}>
            {course.audience.map((item) => (
              <span key={item} className={styles.audienceChip}>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className={styles.sectionHeading}>
      <span className={styles.sectionEyebrow}>{eyebrow}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
    </header>
  );
}

function OutcomesSection({ course }: { course: Course }) {
  return (
    <section className={styles.section}>
      <SectionHeading
        eyebrow="Natijalar"
        title="Ishingizga kerakli narsalarni o'rganing"
        subtitle="Kurs nazariy bo'lmaydi — har bir mashg'ulot real ish vazifalari ustida bo'ladi."
      />
      <div className={styles.outcomeGrid}>
        {course.outcomes.map((outcome, i) => (
          <article key={outcome.id} className={styles.outcomeCard}>
            <div className={styles.outcomeNumber}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className={styles.outcomeTitle}>{outcome.title}</h3>
            <p className={styles.outcomeBody}>{outcome.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ForYouSection({ course }: { course: Course }) {
  const { forYouIf } = course;
  return (
    <aside className={styles.callout}>
      {forYouIf.title && (
        <h3 className={styles.calloutTitle}>{forYouIf.title}</h3>
      )}
      <ul className={styles.calloutList}>
        {forYouIf.items.map((item) => (
          <li key={item} className={styles.calloutItem}>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function ToolsSection({ course }: { course: Course }) {
  return (
    <section className={styles.section}>
      <SectionHeading
        eyebrow="Vositalar"
        title={`${course.tools.length}+ neyron tarmoqni o'zlashtirasiz`}
        subtitle="Har bir vosita — o'z vazifasi uchun. Qaysi holatda qaysi AI ni tanlashni bilib olasiz."
      />
      <div className={styles.toolsGrid}>
        {course.tools.map((tool) => (
          <span key={tool} className={styles.toolChip}>
            {tool}
          </span>
        ))}
      </div>
    </section>
  );
}

function CurriculumSection({ course }: { course: Course }) {
  const moduleCount = course.parts.reduce(
    (sum, part) => sum + part.modules.length,
    0,
  );
  return (
    <section className={styles.section}>
      <SectionHeading
        eyebrow="Kurs dasturi"
        title={`${moduleCount} modul — boshidan yakuniy loyihagacha`}
      />
      <div className={styles.parts}>
        {course.parts.map((part) => (
          <div key={part.id} className={styles.part}>
            <header className={styles.partHeader}>
              {part.eyebrow && (
                <span className={styles.partEyebrow}>{part.eyebrow}</span>
              )}
              {part.title && (
                <h3 className={styles.partTitle}>{part.title}</h3>
              )}
              {part.subtitle && (
                <p className={styles.partSubtitle}>{part.subtitle}</p>
              )}
            </header>

            {part.modules.length > 0 && (
              <ol className={styles.moduleList}>
                {part.modules.map((module) => (
                  <li key={module.id} className={styles.module}>
                    <div className={styles.moduleNumber} aria-hidden="true">
                      {module.number}
                    </div>
                    <div className={styles.moduleBody}>
                      {module.duration && (
                        <span
                          className={`${styles.modulePill} ${
                            module.final ? styles.modulePillFinal : ""
                          }`}
                        >
                          {module.duration}
                        </span>
                      )}
                      <h4 className={styles.moduleTitle}>{module.title}</h4>
                      {module.description && (
                        <p className={styles.moduleDescription}>
                          {module.description}
                        </p>
                      )}
                      {module.tags.length > 0 && (
                        <div className={styles.moduleTags}>
                          {module.tags.map((tag) => (
                            <span key={tag} className={styles.moduleTag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function FormatSection({ course }: { course: Course }) {
  return (
    <section className={styles.section}>
      <SectionHeading
        eyebrow="Format"
        title="Kurs qanday o'tadi"
        subtitle="Asosiy yo'nalish amaliyotga qaratilgan — nazariya faqat kerakli miqdorda beriladi."
      />
      {course.format.length > 0 && (
        <div className={styles.formatGrid}>
          {course.format.map((point) => (
            <article key={point.id} className={styles.formatCard}>
              {point.number && (
                <div className={styles.formatNumber}>{point.number}</div>
              )}
              <h3 className={styles.formatTitle}>{point.title}</h3>
              {point.description && (
                <p className={styles.formatBody}>{point.description}</p>
              )}
            </article>
          ))}
        </div>
      )}

      {(course.aiHelper || course.certificate) && (
        <div className={styles.calloutRow}>
          {course.aiHelper && (
            <aside className={styles.callout}>
              <h3 className={styles.calloutTitle}>{course.aiHelper.title}</h3>
              <p className={styles.calloutBody}>{course.aiHelper.body}</p>
            </aside>
          )}
          {course.certificate && (
            <aside className={styles.callout}>
              <h3 className={styles.calloutTitle}>{course.certificate.title}</h3>
              <p className={styles.calloutBody}>{course.certificate.body}</p>
            </aside>
          )}
        </div>
      )}
    </section>
  );
}

function FinalOutcomesSection({ course }: { course: Course }) {
  return (
    <section className={styles.section}>
      <SectionHeading
        eyebrow="Kurs tugagach"
        title="Siz nima qila olasiz"
        subtitle="Kurs yakunida sizda real ko'nikmalar va amaliyotda sinab ko'rilgan vositalar bo'ladi — ertaga ishga kelgach, birinchi kunidan foydalanish uchun tayyor."
      />
      <ul className={styles.checkList}>
        {course.finalOutcomes.map((item) => (
          <li key={item} className={styles.checkItem}>
            <span className={styles.checkBadge} aria-hidden="true">
              <CheckIcon width={12} height={12} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ContactSection({
  profile,
}: {
  profile: NonNullable<ReturnType<typeof useProfile>["profile"]>;
}) {
  return (
    <section className={styles.contact}>
      <h2 className={styles.contactTitle}>Bog'lanish</h2>
      <p className={styles.contactSubtitle}>
        Savollar bo'lsa yoki ro'yxatdan o'tmoqchi bo'lsangiz — yozing.
      </p>
      <div className={styles.contactLinks}>
        {profile.socials.map((social) => {
          const Icon = getSocialIcon(social.kind);
          const href = normalizeSocialHref(social.kind, social.url);
          const isEmail = social.kind === "email";
          return (
            <a
              key={social.id}
              href={href}
              target={isEmail ? undefined : "_blank"}
              rel={isEmail ? undefined : "noopener noreferrer"}
              className={styles.contactLink}
            >
              <Icon width={15} height={15} />
              <span>{social.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
