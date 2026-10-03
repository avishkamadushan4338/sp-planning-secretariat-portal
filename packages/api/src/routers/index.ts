import {
  staffRouter,
  faqsRouter,
  homeContentRouter,
  departmentsRouter,
  siteSettingsRouter,
  aboutRouter,
  newsBarRouter,
  contactRouter,
} from "./portal/index";
import { smpRouter } from "./smp/index";
import { cmsRouter } from "./cms/index";

export const appRouter = {
  /** Unified draft/publish CMS content API. */
  cms: cmsRouter,
  portal: {
    staff: staffRouter,
    faqs: faqsRouter,
    homeContent: homeContentRouter,
    departments: departmentsRouter,
    siteSettings: siteSettingsRouter,
    about: aboutRouter,
    newsBar: newsBarRouter,
    contact: contactRouter,
  },
  smp: smpRouter,
};

export type AppRouter = typeof appRouter;
