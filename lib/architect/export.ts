import { toast } from "sonner";

export function copyMermaid(
  mermaid: string
) {
  navigator.clipboard.writeText(
    mermaid
  );

  toast.success(
    "Mermaid copied!"
  );
}

export function downloadSVG() {
  const svg =
    document.querySelector(
      "#mermaid-preview svg"
    );

  if (!svg) return;

  const blob = new Blob(
    [svg.outerHTML],
    {
      type: "image/svg+xml",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download = "diagram.svg";
  a.click();
  toast.success("SVG downloaded!");
  URL.revokeObjectURL(url);
}

export async function downloadPNG() {
  const svg =
    document.querySelector(
      "#mermaid-preview svg"
    ) as SVGSVGElement | null;

  if (!svg) return;

  const svgBlob = new Blob(
    [svg.outerHTML],
    {
      type: "image/svg+xml",
    }
  );

  const url =
    URL.createObjectURL(svgBlob);

  const img = new Image();

  img.onload = () => {
    const canvas =
      document.createElement("canvas");

    canvas.width =
      img.width;

    canvas.height =
      img.height;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.drawImage(
      img,
      0,
      0
    );

    canvas.toBlob((blob) => {
      if (!blob) return;

      const png =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = png;

      a.download =
        "diagram.png";

      a.click();
      toast.success("PNG downloaded!");
      URL.revokeObjectURL(
        png
      );
    });

    URL.revokeObjectURL(
      url
    );
  };

  img.src = url;
}