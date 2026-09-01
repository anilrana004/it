/** Insert snippets for the admin blog content toolbar. */
export const BLOG_CONTENT_SNIPPETS = {
  h2: '\n\n## \n\n',
  h3: '\n\n### \n\n',
  h4: '\n\n#### \n\n',
  bullet: '\n* First point\n* Second point\n* Third point\n',
  steps: '\n1. **Prepare** — training and gear\n2. **Plan** — dates and permits\n3. **Trek** — pace and hydration\n',
  table:
    '\n| Item | Details |\n| --- | --- |\n| Best season | Oct–Apr |\n| Difficulty | Moderate |\n| Duration | 5N/6D |\n',
  note: '\n> **Note:** Important information for trekkers.\n',
  tip: '\n> **Tip:** Practical advice from our trek leaders.\n',
  important: '\n> **Important:** Must-read before you book.\n',
  warning: '\n> **Warning:** Safety or weather advisory.\n',
  boldLine: '\n\n**Your key takeaway**\n\nSupporting paragraph…\n',
  divider: '\n---\n\n',
  image: '\n\n![Trek photo](https://res.cloudinary.com/your-cloud/image/upload/photo.jpg "Describe what this photo shows")\n\n',
} as const;

export type BlogSnippetKey = keyof typeof BLOG_CONTENT_SNIPPETS;
