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

export const appRouter = {
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
