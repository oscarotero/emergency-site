import createCms from "@lumeland/cms";

const cms = createCms();

cms.document({
  name: "Settings",
  store: "src:_data.yml",
  fields: [
    {
      name: "metas",
      type: "object",
      fields: ["site: text!", "description: text!", "lang: text!", "color: color"],
    },
    {
      name: "contact",
      type: "object",
      fields: ["email: email", "telephone: text"],
    },
  ],
});

cms.collection({
  name: "Posts",
  store: "src:posts/*.md",
  fields: ["title: text!", "date: current-datetime", "content: markdown"],
});

cms.upload("Uploads", "src:static/images/uploads");

export default cms;
