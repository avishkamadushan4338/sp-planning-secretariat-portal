import React from "react";
import { motion } from "framer-motion";
import { FiCheck, FiClock, FiArchive, FiGlobe, FiEdit2 } from "react-icons/fi";
import type { CmsStatus } from "../cmsContentApi";

/**
 * Shared workflow indicator for CMS content.
 *
 * The badge is the primary signal that separates "saved" from "live". Because
 * `saveDraft` never touches the public copy, an editor needs to see at a glance
 * whether their change is actually on the site yet.
 */

const MAROON = "#4A0918";
const GOLD = "#C79A2B";

type BadgeVariant = "published" | "draft" | "unpublished" | "archived";

const VARIANTS: Record<
  BadgeVariant,
  { label: string; bg: string; text: string; dot: string; icon: React.ComponentType<{ size?: number }> }
> = {
  published: {
    label: "Live",
    bg: "rgba(22,101,52,0.1)",
    text: "#166534",
    dot: "#16a34a",
    icon: FiGlobe,
  },
  unpublished: {
    label: "Unpublished changes",
    bg: "rgba(180,83,9,0.1)",
    text: "#92400e",
    dot: "#d97706",
    icon: FiEdit2,
  },
  draft: {
    label: "Draft",
    bg: "rgba(100,116,139,0.12)",
    text: "#475569",
    dot: "#64748b",
    icon: FiClock,
  },
  archived: {
    label: "Archived",
    bg: "rgba(127,29,29,0.1)",
    text: "#7f1d1d",
    dot: "#dc2626",
    icon: FiArchive,
  },
};

/**
 * Derives the badge variant from an item's workflow state.
 *
 * `hasUnpublishedChanges` takes priority over `published` because a record can
 * be simultaneously live (an older version is published) and edited (the
 * working copy has moved on). Showing "Live" in that state would be misleading.
 */
export const badgeVariantFor = (item: {
  status: CmsStatus;
  hasUnpublishedChanges?: boolean;
}): BadgeVariant => {
  if (item.status === "archived") return "archived";
  if (item.hasUnpublishedChanges) return "unpublished";
  if (item.status === "published") return "published";
  return "draft";
};

export function CmsStatusBadge({
  item,
  compact = false,
}: {
  item: { status: CmsStatus; hasUnpublishedChanges?: boolean };
  compact?: boolean;
}) {
  const variant = badgeVariantFor(item);
  const { label, bg, text, dot, icon: Icon } = VARIANTS[variant];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: bg,
        color: text,
        borderRadius: 100,
        padding: compact ? "2px 8px" : "3px 10px",
        fontSize: compact ? "0.65rem" : "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={compact ? 9 : 11} />
      {label}
    </span>
  );
}

/**
 * Explanatory banner shown above a section when it holds unpublished edits.
 * Explains *why* the visitor may not be seeing the change yet.
 */
export function CmsDraftNotice({
  isLive,
  hasUnpublishedChanges,
}: {
  isLive: boolean;
  hasUnpublishedChanges?: boolean;
}) {
  if (!hasUnpublishedChanges) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 14px",
        borderRadius: 10,
        background: "rgba(180,83,9,0.07)",
        border: "1px solid rgba(180,83,9,0.22)",
        marginBottom: 14,
        fontSize: "0.76rem",
        color: "#92400e",
        lineHeight: 1.5,
      }}
    >
      <FiEdit2 size={14} style={{ marginTop: 1, flexShrink: 0 }} />
      <span>
        You have saved changes that are <strong>not yet live</strong>. The public
        site still shows the previously published version. Use{" "}
        <strong>Publish</strong> to push your edits to visitors.
        {!isLive && " (The site is currently in coming-soon mode.)"}
      </span>
    </div>
  );
}

/**
 * Version counter with optional publish action, for section headers.
 */
export function CmsVersionTag({
  currentVersion,
  publishedVersion,
}: {
  currentVersion: number;
  publishedVersion: number | null;
}) {
  return (
    <span
      title={
        publishedVersion === null
          ? "Never published"
          : `v${currentVersion} saved · v${publishedVersion} live`
      }
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: "0.66rem",
        color: "rgba(74,9,24,0.4)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <FiCheck size={9} color={GOLD} />
      v{currentVersion}
      {publishedVersion !== null && publishedVersion !== currentVersion && (
        <span style={{ color: "#b45309" }}>→ live v{publishedVersion}</span>
      )}
    </span>
  );
}

export { MAROON, GOLD };
