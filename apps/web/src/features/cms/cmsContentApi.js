import { client } from "@/utils/orpc";

// Adapter translating previous axios responses ({ data: ... }) into oRPC calls
export const staffApi = {
  list: async () => ({ data: await client.portal.staff.list() }),
  get: async (id) => ({ data: await client.portal.staff.getById({ id }) }),
  create: async (d) => ({ data: await client.portal.staff.save(d) }),
  update: async (id, d) => ({ data: await client.portal.staff.save({ ...d, id }) }),
  remove: async (id) => ({ data: await client.portal.staff.delete({ id }) }),
};

export const faqsApi = {
  list: async () => ({ data: await client.portal.faqs.list() }),
};

export const homeContentApi = {
  get: async () => ({ data: await client.portal.homeContent.get() }),
  save: async (d) => ({ data: await client.portal.homeContent.get() }),
};

export const departmentsApi = {
  list: async () => ({ data: await client.portal.departments.list() }),
  get: async (slug) => ({ data: await client.portal.departments.getBySlug({ slug }) }),
};

export const siteSettingsApi = {
  get: async () => ({ data: await client.portal.siteSettings.get() }),
  save: async (d) => ({ data: await client.portal.siteSettings.update(d) }),
};

export const aboutOverviewApi = {
  get: async () => ({ data: await client.portal.about.getOverview() }),
};

export const aboutFunctionsApi = {
  get: async () => ({ data: await client.portal.about.getFunctions() }),
};

export const orgStructureApi = {
  get: async () => ({ data: await client.portal.about.getOrgStructure() }),
};

export const aboutHistoryApi = {
  get: async () => ({ data: await client.portal.about.getHistory() }),
};
