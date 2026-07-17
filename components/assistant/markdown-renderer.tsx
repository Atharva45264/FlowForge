"use client";

import { useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";

import {
  Check,
  Copy,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  content: string;
}

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const language =
    className?.replace("language-", "") || "text";

  const code = String(children ?? "").replace(/\n$/, "");

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="my-5 overflow-hidden rounded-2xl border bg-zinc-950 shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <span className="text-xs uppercase tracking-wider text-zinc-400">
          {language}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          onClick={copy}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "20px",
          background: "#09090b",
          fontSize: "14px",
          borderRadius: 0,
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default function MarkdownRenderer({
  content,
}: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw
      ]}
      components={{
        h1({
          children,
        }) {
          return (
            <h1 className="mb-5 mt-8 text-3xl font-bold tracking-tight">
              {children}
            </h1>
          );
        },

        h2({
          children,
        }) {
          return (
            <h2 className="mb-4 mt-7 text-2xl font-semibold">
              {children}
            </h2>
          );
        },

        h3({
          children,
        }) {
          return (
            <h3 className="mb-3 mt-6 text-xl font-semibold">
              {children}
            </h3>
          );
        },

        h4({
          children,
        }) {
          return (
            <h4 className="mb-3 mt-5 text-lg font-semibold">
              {children}
            </h4>
          );
        },

        p({
          children,
        }) {
          return (
            <p className="mb-4 leading-8 text-[15px]">
              {children}
            </p>
          );
        },

        strong({
          children,
        }) {
          return (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          );
        },

        em({
          children,
        }) {
          return (
            <em className="italic">
              {children}
            </em>
          );
        },

        ul({
          children,
        }) {
          return (
            <ul className="mb-5 ml-6 list-disc space-y-2">
              {children}
            </ul>
          );
        },

        ol({
          children,
        }) {
          return (
            <ol className="mb-5 ml-6 list-decimal space-y-2">
              {children}
            </ol>
          );
        },

        li({
          children,
        }) {
          return (
            <li className="leading-7">
              {children}
            </li>
          );
        },
                blockquote({
          children,
        }) {
          return (
            <blockquote className="my-6 rounded-r-xl border-l-4 border-primary bg-primary/5 px-5 py-3 italic text-muted-foreground">
              {children}
            </blockquote>
          );
        },

        hr() {
          return (
            <hr className="my-8 border-border" />
          );
        },

        table({
          children,
        }) {
          return (
            <div className="my-6 overflow-x-auto rounded-xl border">
              <table className="w-full border-collapse">
                {children}
              </table>
            </div>
          );
        },

        thead({
          children,
        }) {
          return (
            <thead className="bg-muted">
              {children}
            </thead>
          );
        },

        tbody({
          children,
        }) {
          return (
            <tbody>
              {children}
            </tbody>
          );
        },

        tr({
          children,
        }) {
          return (
            <tr className="border-b">
              {children}
            </tr>
          );
        },

        th({
          children,
        }) {
          return (
            <th className="px-4 py-3 text-left font-semibold">
              {children}
            </th>
          );
        },

        td({
          children,
        }) {
          return (
            <td className="px-4 py-3 align-top">
              {children}
            </td>
          );
        },

        a({
          href,
          children,
        }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
            >
              {children}
            </a>
          );
        },

        img({
          src,
          alt,
        }) {
          return (
            <img
              src={src}
              alt={alt ?? ""}
              className="my-5 rounded-2xl border shadow-md"
            />
          );
        },

        code({
          inline,
          className,
          children,
        }: any) {
          if (inline) {
            return (
              <code className="rounded-md bg-muted px-1.5 py-1 font-mono text-[13px]">
                {children}
              </code>
            );
          }

          return (
            <CodeBlock
              className={className}
            >
              {children}
            </CodeBlock>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}