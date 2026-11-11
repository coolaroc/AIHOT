import { defineServerModule } from "@aihot/backend/modules";

export default defineServerModule({
  name: "main-site",
  trustedEditorialSources: ["feixiaohao-flash", "feixiaohao-article"],
});
