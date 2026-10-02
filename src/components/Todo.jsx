import { site } from '../config/site';

/** Shows a dashed "to confirm" chip for unverified content while showPlaceholders is on. */
export default function Todo({ children, className = '' }) {
  if (!site.showPlaceholders) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-dashed border-magenta/60 bg-magenta/5 px-2 py-0.5 align-middle text-[0.78rem] font-medium text-magenta ${className}`}
    >
      To confirm: {children}
    </span>
  );
}
