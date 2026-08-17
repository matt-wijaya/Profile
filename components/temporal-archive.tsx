"use client";

import { useReducedMotion } from "framer-motion";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type SectorId = "about" | "work" | "experience" | "others" | "contact";
export type FragmentId = 1 | 2 | 3 | 4;

const SECTOR_IDS: SectorId[] = ["about", "work", "experience", "others", "contact"];
const SECTOR_LABELS: Record<SectorId, string> = {
  about: "IDENTIFICATION",
  work: "CASE FILES",
  experience: "FIELD EXPERIENCE",
  others: "OFF-RECORD",
  contact: "TRANSMISSIONS",
};
const STORAGE_KEY = "temporal-archive-fragments";

type TemporalContextValue = {
  activeSector: SectorId;
  sectorLabel: string;
  reducedMotion: boolean;
  fragments: FragmentId[];
  message: string | null;
  pushMessage: (message: string, duration?: number) => void;
  recoverFragment: (fragment: FragmentId) => void;
};

const TemporalContext = createContext<TemporalContextValue | null>(null);

function isFragmentId(value: unknown): value is FragmentId {
  return value === 1 || value === 2 || value === 3 || value === 4;
}

export function TemporalProvider({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);
  const [activeSector, setActiveSector] = useState<SectorId>("about");
  const [fragments, setFragments] = useState<FragmentId[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const fragmentRef = useRef<FragmentId[]>([]);
  const messageTimerRef = useRef<number | null>(null);

  const pushMessage = useCallback((nextMessage: string, duration = 1400) => {
    if (messageTimerRef.current) window.clearTimeout(messageTimerRef.current);
    setMessage(nextMessage);
    messageTimerRef.current = window.setTimeout(() => setMessage(null), duration);
  }, []);

  const recoverFragment = useCallback(
    (fragment: FragmentId) => {
      let storedFragments: FragmentId[] = [];
      try {
        const parsed = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "[]");
        if (Array.isArray(parsed)) storedFragments = parsed.filter(isFragmentId) as FragmentId[];
      } catch {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }

      const currentFragments = Array.from(new Set([...fragmentRef.current, ...storedFragments])) as FragmentId[];
      if (currentFragments.includes(fragment)) return;

      const nextFragments = [...currentFragments, fragment].sort((a, b) => a - b) as FragmentId[];
      fragmentRef.current = nextFragments;
      setFragments(nextFragments);
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextFragments));
      pushMessage(
        nextFragments.length === 4
          ? "CLEARANCE LEVEL 04 GRANTED"
          : `FRAGMENT ${fragment.toString().padStart(2, "0")} RECOVERED`,
        nextFragments.length === 4 ? 2600 : 1500,
      );
    },
    [pushMessage],
  );

  useEffect(() => {
    const loadStoredFragments = window.setTimeout(() => {
      try {
        const parsed = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "[]");
        if (!Array.isArray(parsed)) return;
        const stored = Array.from(new Set(parsed.filter(isFragmentId))) as FragmentId[];
        fragmentRef.current = stored;
        setFragments(stored);
      } catch {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    }, 0);

    return () => window.clearTimeout(loadStoredFragments);
  }, []);

  useEffect(() => {
    const updateActiveSector = () => {
      const activationPoint = window.scrollY + Math.min(190, window.innerHeight * 0.28);
      const bottomReached = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      if (bottomReached) {
        setActiveSector("contact");
        return;
      }

      const current = SECTOR_IDS.reduce<SectorId>((active, id) => {
        const element = document.getElementById(id);
        if (!element) return active;

        const documentTop = element.getBoundingClientRect().top + window.scrollY;
        return documentTop <= activationPoint ? id : active;
      }, "about");
      setActiveSector(current);
    };

    updateActiveSector();
    window.addEventListener("scroll", updateActiveSector, { passive: true });
    window.addEventListener("resize", updateActiveSector);
    window.addEventListener("hashchange", updateActiveSector);
    return () => {
      window.removeEventListener("scroll", updateActiveSector);
      window.removeEventListener("resize", updateActiveSector);
      window.removeEventListener("hashchange", updateActiveSector);
    };
  }, []);

  useEffect(
    () => () => {
      if (messageTimerRef.current) window.clearTimeout(messageTimerRef.current);
    },
    [],
  );

  return (
    <TemporalContext.Provider
      value={{
        activeSector,
        sectorLabel: SECTOR_LABELS[activeSector],
        reducedMotion,
        fragments,
        message,
        pushMessage,
        recoverFragment,
      }}
    >
      {children}
    </TemporalContext.Provider>
  );
}

export function useTemporal() {
  const context = useContext(TemporalContext);
  if (!context) throw new Error("useTemporal must be used within TemporalProvider");
  return context;
}

export function TemporalStatus({ routeLabel }: { routeLabel?: string }) {
  const { message, sectorLabel } = useTemporal();

  return (
    <span className="temporal-status" aria-live="polite" aria-atomic="true">
      <span className="temporal-status-lamp" aria-hidden="true" />
      {message ?? routeLabel ?? sectorLabel}
    </span>
  );
}

export function FragmentIndicator() {
  const { fragments } = useTemporal();
  const [noteOpen, setNoteOpen] = useState(false);
  const unlocked = fragments.length === 4;

  return (
    <div className="relative">
      <button
        type="button"
        className={`fragment-indicator ${unlocked ? "fragment-indicator--unlocked" : ""}`}
        aria-expanded={unlocked ? noteOpen : undefined}
        aria-controls={unlocked ? "designer-dossier" : undefined}
        disabled={!unlocked}
        onClick={() => setNoteOpen((current) => !current)}
      >
        CLEARANCE // {fragments.length} OF 4
      </button>
      {unlocked && noteOpen ? (
        <aside id="designer-dossier" className="designer-dossier" aria-label="Unlocked designer note">
          <p className="meta-label text-[9px] text-[var(--accent)]">DOSSIER 04 // DESIGNER NOTE</p>
          <p>
            The archive is a small argument for interfaces with memory: controls should feel physical, feedback should feel earned,
            and the work should remain clearer than the system around it.
          </p>
        </aside>
      ) : null}
    </div>
  );
}

export function ContextCursor() {
  const { reducedMotion } = useTemporal();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const findTarget = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>("[data-cursor-label]") : null;
    const move = (event: PointerEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX + 14}px, ${event.clientY + 14}px, 0)`;
      }
    };
    const enter = (event: PointerEvent) => {
      const target = findTarget(event.target);
      if (!target) return;
      setLabel(target.dataset.cursorLabel ?? "ACCESS");
      setVisible(true);
    };
    const leave = (event: PointerEvent) => {
      if (findTarget(event.relatedTarget)) return;
      setVisible(false);
    };
    const focus = (event: FocusEvent) => {
      const target = findTarget(event.target);
      if (!target || !cursorRef.current) return;
      const bounds = target.getBoundingClientRect();
      cursorRef.current.style.transform = `translate3d(${bounds.right + 8}px, ${bounds.top}px, 0)`;
      setLabel(target.dataset.cursorLabel ?? "ACCESS");
      setVisible(true);
    };
    const blur = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", enter);
    document.addEventListener("pointerout", leave);
    document.addEventListener("focusin", focus);
    document.addEventListener("focusout", blur);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", enter);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("focusout", blur);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={cursorRef}
      className={`context-cursor ${visible ? "context-cursor--visible" : ""}`}
      aria-hidden="true"
    >
      {label}
    </div>
  );
}

export function ScanOverlay({ active = true }: { active?: boolean }) {
  return <span className={`scan-overlay ${active ? "scan-overlay--active" : ""}`} aria-hidden="true" />;
}

export function TemporalSection({
  id,
  className,
  children,
  as = "section",
  attachId = true,
}: {
  id: SectorId;
  className?: string;
  children: ReactNode;
  as?: "section" | "footer";
  attachId?: boolean;
}) {
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12%", threshold: 0.04 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const Element = as;

  return (
    <Element ref={sectionRef} id={attachId ? id : undefined} className={`temporal-section ${entered ? "temporal-section--entered" : ""} ${className ?? ""}`}>
      <ScanOverlay active={entered} />
      {children}
    </Element>
  );
}
