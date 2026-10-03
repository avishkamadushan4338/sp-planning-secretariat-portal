import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FiSave,
  FiGlobe,
  FiClock,
  FiGitCommit,
  FiCheckCircle,
} from "react-icons/fi";
import { cmsApi, type CmsEditorItem } from "../cmsContentApi";
import { CmsStatusBadge, CmsDraftNotice, CmsVersionTag } from "./CmsStatusBadge";
import RevisionHistoryPanel from "./CmsRevisionHistory";

/**
 * ── Save / Publish control bar ────────────────────────────────────────────────
 *
 * Centralises the draft/publish workflow so every section behaves identically
 * and an editor always knows whether their work is live.
 *
 * The distinction this enforces, which the previous CMS got wrong:
 *
 *   Save draft  → writes the working copy only. Visitors see no change.
 *   Publish     → copies the working copy live. This is the only public action.
 *
 * Sections that previously "saved" by calling a read-only method (or silently
 * called `get`) now go through here, so a save can never again be a no-op that
 * reports success.
 */

const MAROON = "#4A0918";
const GOLD = "#C79A2B";

export type CmsPublishBarProps = {
  /** The item being edited, or null for a not-yet-created record. */
  item: CmsEditorItem | null;
  /** Persists the working copy. Receives the editor's payload. */
  onSave: (note?: string) => Promise<void>;
  /** Whether the site is currently in coming-soon mode. */
  isLive?: boolean;
  /** Called after publish/unpublish/restore so the caller can refetch. */
  onChanged?: () => void;
  /** Hide the bar for read-only placements. */
  readOnly?: boolean;
};

export function CmsPublishBar({
  item,
  onSave,
  isLive = true,
  onChanged,
  readOnly = false,
}: CmsPublishBarProps) {
  const [busy, setBusy] = useState<"save" | "publish" | "unpublish" | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleSave = async () => {
    setBusy("save");
    try {
      await onSave();
    } finally {
      setBusy(null);
    }
  };

  const handlePublish = async () => {
    if (!item) return;
    setBusy("publish");
    try {
      await cmsApi.publish(item.id);
      toast.success("Published to live site", {
        description: "Visitors can now see this content.",
      });
      onChanged?.();
    } catch {
      toast.error("Failed to publish. Check that you have access and try again.");
    } finally {
      setBusy(null);
    }
  };

  const handleUnpublish = async () => {
    if (!item) return;
    setBusy("unpublish");
    try {
      await cmsApi.unpublish(item.id);
      toast.success("Removed from the live site", {
        description: "Your draft is preserved and can be published again.",
      });
      onChanged?.();
    } catch {
      toast.error("Failed to unpublish.");
    } finally {
      setBusy(null);
    }
  };

  const hasUnpublishedChanges = item?.hasUnpublishedChanges ?? false;
  const isPublished = item?.status === "published" && item.publishedData !== null;

  if (readOnly) {
    return item ? (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <CmsStatusBadge item={item} />
        {item.currentVersion > 1 && (
          <CmsVersionTag
            currentVersion={item.currentVersion}
            publishedVersion={item.publishedVersion}
          />
        )}
      </div>
    ) : null;
  }

  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 8,
    fontSize: "0.73rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    fontFamily: "'Cinzel', serif",
    cursor: busy ? "not-allowed" : "pointer",
    opacity: busy ? 0.6 : 1,
    transition: "all 0.15s",
    border: "none",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <CmsDraftNotice isLive={isLive} hasUnpublishedChanges={hasUnpublishedChanges} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          padding: "10px 13px",
          borderRadius: 11,
          background: "rgba(74,9,24,0.025)",
          border: "1px solid rgba(74,9,24,0.07)",
        }}
      >
        {/* Status */}
        {item ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginRight: "auto",
            }}
          >
            <CmsStatusBadge item={item} />
            {item.currentVersion > 1 && (
              <CmsVersionTag
                currentVersion={item.currentVersion}
                publishedVersion={item.publishedVersion}
              />
            )}
          </div>
        ) : (
          <div
            style={{
              marginRight: "auto",
              fontSize: "0.73rem",
              color: "rgba(74,9,24,0.45)",
            }}
          >
            Not saved yet — saving creates version 1
          </div>
        )}

        {/* History */}
        {item && item.currentVersion > 0 && (
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            title="View version history"
            style={{
              ...btnBase,
              background: "rgba(74,9,24,0.06)",
              color: MAROON,
            }}
          >
            <FiGitCommit size={12} />
            History
          </button>
        )}

        {/* Save draft */}
        <button
          type="button"
          onClick={handleSave}
          disabled={busy !== null}
          style={{
            ...btnBase,
            background: "rgba(74,9,24,0.09)",
            color: MAROON,
          }}
        >
          <FiSave size={12} />
          {busy === "save" ? "Saving…" : item ? "Save draft" : "Create draft"}
        </button>

        {/* Publish / Unpublish */}
        {isPublished ? (
          <>
            <button
              type="button"
              onClick={handlePublish}
              disabled={busy !== null}
              title="Push the saved draft to the live site"
              style={{
                ...btnBase,
                background: hasUnpublishedChanges
                  ? `linear-gradient(135deg, ${GOLD}, #A87C1E)`
                  : "rgba(199,154,43,0.16)",
                color: hasUnpublishedChanges ? "#fff" : "#8A6A15",
              }}
            >
              {busy === "publish" ? (
                <FiClock size={12} />
              ) : hasUnpublishedChanges ? (
                <FiGlobe size={12} />
              ) : (
                <FiCheckCircle size={12} />
              )}
              {hasUnpublishedChanges ? "Publish changes" : "Up to date"}
            </button>

            <button
              type="button"
              onClick={handleUnpublish}
              disabled={busy !== null}
              title="Remove from the live site, keeping the draft"
              style={{
                ...btnBase,
                background: "transparent",
                color: "rgba(74,9,24,0.42)",
                border: "1px solid rgba(74,9,24,0.12)",
              }}
            >
              {busy === "unpublish" ? "…" : "Unpublish"}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handlePublish}
            disabled={busy !== null || !item}
            title={
              item
                ? "Make this content visible on the public site"
                : "Save a draft first"
            }
            style={{
              ...btnBase,
              background: item
                ? `linear-gradient(135deg, ${MAROON}, #6E1528)`
                : "rgba(74,9,24,0.12)",
              color: item ? "#fff" : "rgba(74,9,24,0.35)",
            }}
          >
            {busy === "publish" ? <FiClock size={12} /> : <FiGlobe size={12} />}
            Publish
          </button>
        )}
      </div>

      {item && historyOpen && (
        <RevisionHistoryPanel
          contentId={item.id}
          onClose={() => setHistoryOpen(false)}
          onRestored={onChanged}
        />
      )}
    </>
  );
}

export default CmsPublishBar;