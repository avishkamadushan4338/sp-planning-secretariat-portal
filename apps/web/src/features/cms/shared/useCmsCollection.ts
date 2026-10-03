import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { cmsApi, type CmsContentType, type CmsEditorItem } from "../cmsContentApi";

/**
 * Shared behaviour for every CMS collection section (news, notices, gallery,
 * downloads, events, FAQs, departments…).
 *
 * These sections previously each implemented their own CRUD against
 * `localStorage`, which meant content existed only in the browser that created
 * it: a second admin saw an empty site, and nothing was backed up. Routing them
 * all through this hook gives them one consistent, durable, versioned write
 * path with draft/publish semantics.
 *
 * The hook owns loading, saving, publishing, and deleting. Components only
 * supply the content type and decide how to render.
 */

export type UseCmsCollectionOptions = {
  contentType: CmsContentType;
  /** Human-readable noun used in toasts, e.g. "news article". */
  label: string;
};

export function useCmsCollection({ contentType, label }: UseCmsCollectionOptions) {
  const [items, setItems] = useState<CmsEditorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems((await cmsApi.list(contentType)) as CmsEditorItem[]);
    } catch {
      toast.error(`Failed to load ${label}.`);
    } finally {
      setLoading(false);
    }
  }, [contentType, label]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Creates a new draft. Not visible to visitors until `publish` is called.
   */
  const create = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        await cmsApi.saveDraft({ contentType, data });
        toast.success(`${label} saved as draft`, {
          description: "Publish it to make it visible on the site.",
        });
        await load();
        return true;
      } catch {
        toast.error(`Failed to save ${label} draft.`);
        return false;
      }
    },
    [contentType, label, load]
  );

  /**
   * Saves edits into the working copy. The live version is left untouched, so
   * an in-progress edit never leaks to visitors by accident.
   */
  const update = useCallback(
    async (id: string, data: Record<string, unknown>) => {
      setSavingId(id);
      try {
        await cmsApi.saveDraft({ contentType, id, data });
        toast.success("Draft updated", {
          description: "Publish to push these changes to the live site.",
        });
        await load();
        return true;
      } catch {
        toast.error(`Failed to update ${label}.`);
        return false;
      } finally {
        setSavingId(null);
      }
    },
    [contentType, label, load]
  );

  /** Publishes the current working copy. The only action visitors observe. */
  const publish = useCallback(
    async (id: string) => {
      try {
        await cmsApi.publish(id);
        toast.success(`Published to the live site`);
        await load();
        return true;
      } catch {
        toast.error(`Failed to publish ${label}.`);
        return false;
      }
    },
    [label, load]
  );

  /** Withdraws from the site while preserving the draft. */
  const unpublish = useCallback(
    async (id: string) => {
      try {
        await cmsApi.unpublish(id);
        toast.success("Removed from the live site", {
          description: "The draft is preserved.",
        });
        await load();
        return true;
      } catch {
        toast.error(`Failed to unpublish ${label}.`);
        return false;
      }
    },
    [label, load]
  );

  /**
   * Convenience toggle for table rows: publish when there is anything to
   * publish, otherwise take it down.
   */
  const togglePublish = useCallback(
    async (item: CmsEditorItem) => {
      if (item.status === "published" && !item.hasUnpublishedChanges) {
        return unpublish(item.id);
      }
      return publish(item.id);
    },
    [publish, unpublish]
  );

  const remove = useCallback(
    async (id: string) => {
      try {
        await cmsApi.remove(id);
        toast.success(`${label} deleted`);
        await load();
        return true;
      } catch {
        toast.error(`Failed to delete ${label}.`);
        return false;
      }
    },
    [label, load]
  );

  return {
    items,
    loading,
    savingId,
    reload: load,
    create,
    update,
    publish,
    unpublish,
    togglePublish,
    remove,
  };
}

export default useCmsCollection;