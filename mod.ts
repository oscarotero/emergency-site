import basePath from "@lumeland/plugin-base-path";
import sitemap from "@lumeland/plugin-sitemap";
import robots from "@lumeland/plugin-robots";
import pwa from "@lumeland/plugin-pwa";
import metas from "@lumeland/plugin-metas";
import feed from "@lumeland/plugin-feed";
import favicon from "@lumeland/plugin-favicon";
import date from "@lumeland/plugin-date";
import inline from "@lumeland/plugin-inline";
import lightningcss from "@lumeland/plugin-lightningcss";
import lumeCms from "@lumeland/plugin-cms";
import { enUS } from "date-fns/locale/en-US";
import cms from "./cms.ts";

export interface Options {
  offline: boolean;
}

export default function (options?: Options) {
  return (site: Lume.Site) => {
    site.use(basePath());
    site.use(sitemap());
    site.use(pwa());
    site.use(metas());
    site.use(
      feed({
        output: ["/feed.xml", "/feed.json"],
        query: "type=post",
        info: {
          title: "=metas.site",
          description: "=metas.description",
        },
      }),
    );
    site.use(favicon());
    site.use(
      date({
        locales: { enUS },
      }),
    );
    site.use(lightningcss());
    site.use(inline());
    site.use(
      robots({
        allow: "*",
      }),
    );
    site.add("static");
    site.add("style.css");
    site.use(lumeCms({ cms }));
    site.data("offline", options?.offline);

    // Add remote files
    site.remote("/", import.meta.resolve("./src"), ["_includes/**", "static/scripts", "posts/_data.yml", "*.vto", "*.css"]);
  };
}

export const setup: Lume.Archetype = function* () {
  yield {
    url: import.meta.resolve("./src"),
    files: ["_data.yml", "posts/*.md", "static/images/**"],
  };
};
