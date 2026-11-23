import createCms from "@lumeland/cms";
import type { Field } from "@lumeland/cms/types.ts";

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
  documentName(changes) {
    const date = changes.date as Temporal.PlainDateTime;
    return `/${date.toPlainDate()}-${changes.title}`;
  },
  fields: [
    "title: text!",
    {
      name: "date",
      type: "datetime",
      init(field: Field) {
        field.value = new Date();
      },
    },
    "content: markdown",
  ],
});

cms.upload("Uploads", "src:static/images/uploads");

export default cms;
