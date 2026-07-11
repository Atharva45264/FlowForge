export function cleanMermaid(code: string) {
  return code
    .replace(/```mermaid/g, "")
    .replace(/```/g, "")
    .replace(/\r/g, "")

    // PKFK -> PK FK
    .replace(/\bPKFK\b/g, "PK FK")

    // Remove comments after PK/FK
    .replace(
      /(PK|FK|PK FK)\s+"[^"]*"/g,
      "$1"
    )

    // Fix common AI mistake:
    // User(User) -> User["User"]
    .replace(
      /^([A-Za-z0-9_]+)\((.*?)\)$/gm,
      '$1["$2"]'
    )

    .trim();
}