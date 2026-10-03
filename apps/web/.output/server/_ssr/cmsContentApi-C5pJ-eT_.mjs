import { client } from "./orpc-z2cWmUEA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cmsContentApi-C5pJ-eT_.js
var staffApi = {
	list: async () => ({ data: await client.portal.staff.list() }),
	get: async (id) => ({ data: await client.portal.staff.getById({ id }) }),
	create: async (d) => ({ data: await client.portal.staff.save(d) }),
	update: async (id, d) => ({ data: await client.portal.staff.save({
		...d,
		id
	}) }),
	remove: async (id) => ({ data: await client.portal.staff.delete({ id }) })
};
var faqsApi = { list: async () => ({ data: await client.portal.faqs.list() }) };
var homeContentApi = {
	get: async () => ({ data: await client.portal.homeContent.get() }),
	save: async (d) => ({ data: await client.portal.homeContent.get() })
};
var departmentsApi = {
	list: async () => ({ data: await client.portal.departments.list() }),
	get: async (slug) => ({ data: await client.portal.departments.getBySlug({ slug }) })
};
var siteSettingsApi = {
	get: async () => ({ data: await client.portal.siteSettings.get() }),
	save: async (d) => ({ data: await client.portal.siteSettings.update(d) })
};
var aboutOverviewApi = { get: async () => ({ data: await client.portal.about.getOverview() }) };
var aboutFunctionsApi = { get: async () => ({ data: await client.portal.about.getFunctions() }) };
var orgStructureApi = { get: async () => ({ data: await client.portal.about.getOrgStructure() }) };
var aboutHistoryApi = { get: async () => ({ data: await client.portal.about.getHistory() }) };
//#endregion
export { aboutFunctionsApi, aboutHistoryApi, aboutOverviewApi, departmentsApi, faqsApi, homeContentApi, orgStructureApi, siteSettingsApi, staffApi };
