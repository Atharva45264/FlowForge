import html2pdf from "html2pdf.js";

import { Page } from "@/hooks/usePages";

export async function exportAsHTML(page: Page) {
  const blob = new Blob([page.content], {
    type: "text/html",
  });

  download(blob, `${page.title}.html`);
}

export async function exportAsMarkdown(page: Page) {
  // Simple HTML → Markdown conversion
  const markdown = page.content
    .replace(/<h1>/g, "# ")
    .replace(/<\/h1>/g, "\n")
    .replace(/<h2>/g, "## ")
    .replace(/<\/h2>/g, "\n")
    .replace(/<strong>/g, "**")
    .replace(/<\/strong>/g, "**")
    .replace(/<em>/g, "*")
    .replace(/<\/em>/g, "*")
    .replace(/<br>/g, "\n")
    .replace(/<[^>]+>/g, "");

  const blob = new Blob([markdown], {
    type: "text/markdown",
  });

  download(blob, `${page.title}.md`);
}

export async function exportAsPDF(page: Page) {
  const element = document.createElement("div");

  element.style.padding = "40px";
  element.innerHTML = `
      <h1>${page.title}</h1>
      ${page.content}
    `;

  await html2pdf()
    .set({
      filename: `${page.title}.pdf`,
      margin: 0.5,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
      },
    })
    .from(element)
    .save();
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = filename;

  a.click();

  URL.revokeObjectURL(url);
}