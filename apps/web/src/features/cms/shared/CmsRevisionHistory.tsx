import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  FiClock,
  FiRefreshCw,
  FiX,
  FiRotateCcw,
  FiGitCommit,
  FiEye,
} from "react-icons/fi";
import { cmsApi, type CmsRevision } from "../cmsContentApi";

/**
 * ── Revision history & rollback ───────────────────────────────────────────────
 *
 * Lists every saved version of a content item and lets an editor compare a past
 * revision against the current working copy before restoring it.
 *
 * Restore deliberately writes to the working copy only. The restored content
 * comes back as a new draft revision so the editor can review it and publish
 * deliberately — a rollback that instantly went live would defeat the point of
 * the draft/publish split.
 */

const MAROON = "#4A0918";
const GOLD = "#C79A2B";

/** Recursively collect differing leaf paths between two JSON values. */
const diffPaths = (a: unknown, b: unknown, prefix = ""): string[] => {
  if (JSON.stringify(a) === JSON.stringify(b)) return [];

  const isObj = (v: unknown): v is Record<string, unknown> =>
    typeof v === "object" && v !== null && !Array.isArray(v);

  // Arrays are compared as whole values: item-level diffing on arrays of
  // objects is noisy and rarely how an editor reads a change.
  if (Array.isArray(a) || Array.isArray(b)) {
    return [prefix || "(root)"];
  }
  if (!isObj(a) || !isObj(b)) {
    return [prefix || "(root)"];
  }

  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const out: string[] = [];
  for (const key of keys) {
    const path = prefix ? `${prefix}.${key}` : key;
    out.push(...diffPaths(a[key], b[key], path));
  }
  return out;
};

const formatValue = (v: unknown): string => {
  if (v === undefined) return "—";
  if (typeof v === "string") return v.length > 160 ? `${v.slice(0, 160)}…` : v;
  const s = JSON.stringify(v);
  return s.length > 160 ? `${s.slice(0, 160)}…` : s;
};

/** Walks a dotted path into a nested object, returning undefined if absent. */
const readPath = (obj: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>(
    (acc, key) =>
      acc && typeof acc === "object"
        ? (acc as Record<string, unknown>)[key]
        : undefined,
    obj
  );

function RevisionHistoryPanel({
  contentId,
  onClose,
  onRestored,
}: {
  contentId: string;
  onClose: () => void;
  onRestored?: () => void;
}) {
  const [revisions, setRevisions] = useState<CmsRevision[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<Record<string, unknown> | null>(null);
  const [current, setCurrent] = useState<Record<string, unknown> | null>(null);
  const [changes, setChanges] = useState<string[]>([]);
  const [restoring, setRestoring] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRevisions(await cmsApi.revisions(contentId));
    } catch {
      toast.error("Failed to load revision history.");
    } finally {
      setLoading(false);
    }
  }, [contentId]);

  useEffect(() => {
    load();
  }, [load]);

  /** Load a revision and diff it against the live working copy. */
  const handlePreview = useCallback(
    async (revisionId: string) => {
      setSelected(revisionId);
      setPreview(null);
      setCurrent(null);
      setChanges([]);
      try {
        const [revision, item] = await Promise.all([
          cmsApi.revisionData(revisionId),
          cmsApi.get(contentId),
        ]);
        if (revision) {
          const currentData = (item?.data ?? {}) as Record<string, unknown>;
          setPreview(revision.data as Record<string, unknown>);
          setCurrent(currentData);
          setChanges(diffPaths(revision.data, currentData));
        }
      } catch {
        toast.error("Failed to load that revision.");
      }
    },
    [contentId]
  );

  const handleRestore = useCallback(async () => {
    if (!selected) return;
    setRestoring(true);
    try {
      await cmsApi.restore(selected);
      toast.success("Revision restored to draft", {
        description: "Review your changes, then publish to make them live.",
      });
      await load();
      setSelected(null);
      setPreview(null);
      setCurrent(null);
      setChanges([]);
      onRestored?.();
    } catch {
      toast.error("Failed to restore that revision.");
    } finally {
      setRestoring(false);
    }
  }, [selected, load, onRestored]);

  const fmt = (d: Date | string | null) =>
    d ? new Date(d).toLocaleString() : "—";

  const body = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(20,4,12,0.55)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 12 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 780,
          maxHeight: "84vh",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 30px 70px rgba(0,0,0,0.32)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.1rem 1.4rem",
            borderBottom: "1px solid rgba(74,9,24,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <FiGitCommit size={16} color={GOLD} />
            <h3
              style={{
                margin: 0,
                fontSize: "0.95rem",
                fontWeight: 700,
                color: MAROON,
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.04em",
              }}
            >
              VERSION HISTORY
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close history"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(74,9,24,0.45)",
              display: "flex",
              padding: 4,
            }}
          >
            <FiX size={17} />
          </button>
        </div>

        {/* Content */}
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          {/* Revision list */}
          <div
            style={{
              width: 280,
              flexShrink: 0,
              borderRight: "1px solid rgba(74,9,24,0.08)",
              overflowY: "auto",
              padding: "0.6rem",
            }}
          >
            {loading && (
              <div
                style={{
                  padding: "2rem 1rem",
                  textAlign: "center",
                  color: "rgba(74,9,24,0.4)",
                  fontSize: "0.78rem",
                }}
              >
                <FiRefreshCw
                  size={16}
                  style={{ marginBottom: 8, animation: "spin 1s linear infinite" }}
                />
                <div>Loading history…</div>
              </div>
            )}

            {!loading && revisions.length === 0 && (
              <div
                style={{
                  padding: "2rem 1rem",
                  textAlign: "center",
                  color: "rgba(74,9,24,0.4)",
                  fontSize: "0.78rem",
                  lineHeight: 1.6,
                }}
              >
                No saved versions yet.
                <br />
                Saving a draft creates the first one.
              </div>
            )}

            {revisions.map((rev, idx) => (
              <button
                key={rev.id}
                onClick={() => handlePreview(rev.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "9px 11px",
                  borderRadius: 9,
                  border:
                    selected === rev.id
                      ? `1px solid ${GOLD}`
                      : "1px solid transparent",
                  background: selected === rev.id ? "rgba(199,154,43,0.07)" : "none",
                  cursor: "pointer",
                  marginBottom: 3,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      color: MAROON,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    v{rev.version}
                  </span>
                  {idx === 0 && (
                    <span
                      style={{
                        fontSize: "0.58rem",
                        background: "rgba(199,154,43,0.16)",
                        color: "#8A6A15",
                        padding: "1px 6px",
                        borderRadius: 100,
                        fontWeight: 700,
                      }}
                    >
                      CURRENT
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "0.66rem",
                    color: "rgba(74,9,24,0.42)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <FiClock size={9} />
                  {fmt(rev.createdAt)}
                </div>
                {rev.note && (
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "rgba(74,9,24,0.6)",
                      marginTop: 3,
                      fontStyle: "italic",
                    }}
                  >
                    {rev.note}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Diff preview */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1.1rem 1.3rem" }}>
            {!selected && (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(74,9,24,0.35)",
                  fontSize: "0.8rem",
                  gap: 9,
                  textAlign: "center",
                }}
              >
                <FiEye size={22} />
                Select a version to preview its contents
              </div>
            )}

            {selected && !preview && (
              <div
                style={{
                  color: "rgba(74,9,24,0.5)",
                  fontSize: "0.8rem",
                  padding: "1rem 0",
                }}
              >
                Loading revision…
              </div>
            )}

            {selected && preview && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.9rem",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ fontSize: "0.76rem", color: "rgba(74,9,24,0.6)" }}>
                    {changes.length === 0 ? (
                      <span>Identical to the current draft.</span>
                    ) : (
                      <>
                        <strong>{changes.length}</strong> field
                        {changes.length === 1 ? "" : "s"} differ from the current
                        draft
                      </>
                    )}
                  </div>
                  <button
                    onClick={handleRestore}
                    disabled={restoring || changes.length === 0}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 14px",
                      borderRadius: 8,
                      border: "none",
                      background:
                        changes.length === 0
                          ? "rgba(74,9,24,0.12)"
                          : `linear-gradient(135deg, ${MAROON}, #6E1528)`,
                      color: changes.length === 0 ? "rgba(74,9,24,0.35)" : "#fff",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      cursor:
                        changes.length === 0 || restoring ? "not-allowed" : "pointer",
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    <FiRotateCcw size={12} />
                    {restoring ? "Restoring…" : "Restore to draft"}
                  </button>
                </div>

                {changes.length === 0 ? (
                  <div
                    style={{
                      padding: "1.4rem",
                      textAlign: "center",
                      fontSize: "0.78rem",
                      color: "rgba(74,9,24,0.45)",
                      background: "rgba(74,9,24,0.02)",
                      borderRadius: 10,
                      lineHeight: 1.6,
                    }}
                  >
                    This version matches your current draft.
                    <br />
                    Nothing to restore.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {changes.map((path) => (
                      <>
                        <div
                          key={path}
                          style={{
                            border: "1px solid rgba(74,9,24,0.08)",
                            borderRadius: 9,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              padding: "6px 11px",
                              background: "rgba(74,9,24,0.03)",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              color: MAROON,
                              fontFamily: "ui-monospace, monospace",
                            }}
                          >
                            {path}
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                            <div style={{ padding: "0.6rem 0.75rem", borderRight: "1px solid rgba(74,9,24,0.07)" }}>
                              <div
                                style={{
                                  fontSize: "0.6rem",
                                  fontWeight: 700,
                                  color: "#166534",
                                  letterSpacing: "0.08em",
                                  marginBottom: 3,
                                }}
                              >
                                THIS VERSION
                              </div>
                              <div style={{ fontSize: "0.72rem", color: "rgba(74,9,24,0.7)", wordBreak: "break-word", lineHeight: 1.5 }}>
                                {formatValue(readPath(preview, path))}
                              </div>
                            </div>
                            <div style={{ padding: "0.6rem 0.75rem" }}>
                              <div
                                style={{
                                  fontSize: "0.6rem",
                                  fontWeight: 700,
                                  color: "#b45309",
                                  letterSpacing: "0.08em",
                                  marginBottom: 3,
                                }}
                              >
                                CURRENT DRAFT
                              </div>
                              <div style={{ fontSize: "0.72rem", color: "rgba(74,9,24,0.7)", wordBreak: "break-word", lineHeight: 1.5 }}>
                                {formatValue(readPath(current, path))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (!mounted) return null;
  return createPortal(<AnimatePresence>{body}</AnimatePresence>, document.body);
}

export default RevisionHistoryPanel;
