"use client";

type Props = {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
};

export function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  children,
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        transition-all
        duration-200

        ${
          active
            ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }

        disabled:pointer-events-none
        disabled:opacity-40
      `}
    >
      {children}
    </button>
  );
}