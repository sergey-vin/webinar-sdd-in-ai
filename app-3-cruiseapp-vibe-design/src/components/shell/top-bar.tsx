import type { ReactNode } from "react";

export function TopBar({
  title,
  subtitle,
  left,
  right,
}: {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
      <div className="flex items-center gap-2.5">
        {left}
        <div>
          {subtitle && (
            <div className="text-[11px] text-ink-4 uppercase tracking-[0.06em] font-semibold">
              {subtitle}
            </div>
          )}
          <h1 className="font-display font-normal text-[28px] tracking-tight m-0 leading-none mt-0.5">
            {title}
          </h1>
        </div>
      </div>
      {right}
    </div>
  );
}

export function IconButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-surface border border-hairline flex items-center justify-center text-ink-2 hover:bg-surface-2 transition-colors"
    >
      {children}
    </button>
  );
}
