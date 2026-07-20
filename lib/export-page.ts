import { Page } from "@/hooks/usePages";

export async function exportAsHTML(page: Page) {
  if (typeof window === "undefined") return;

  const blob = new Blob([page.content], {
    type: "text/html",
  });

  download(blob, `${page.title}.html`);
}

export async function exportAsMarkdown(page: Page) {
  if (typeof window === "undefined") return;

  const markdown = page.content
    .replace(/<h1>/g, "# ")
    .replace(/<\/h1>/g, "\n")
    .replace(/<h2>/g, "## ")
    .replace(/<\/h2>/g, "\n")
    .replace(/<strong>/g, "**")
    .replace(/<\/strong>/g, "**")
    .replace(/<em>/g, "*")
    .replace(/<\/em>/g, "*")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "");

  const blob = new Blob([markdown], {
    type: "text/markdown",
  });

  download(blob, `${page.title}.md`);
}

export async function exportAsPDF(page: Page) {
  if (typeof window === "undefined") return;

  // Dynamically import only in browser
  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.createElement("div");

  element.style.padding = "40px";
  element.style.fontFamily = "Arial, sans-serif";
  element.style.background = "white";
  element.style.color = "black";

  element.innerHTML = `
    <h1>${page.title}</h1>
    <hr/>
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

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}