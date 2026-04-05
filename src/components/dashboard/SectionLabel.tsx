/** Small section eyebrow for visual hierarchy (dashboard storytelling). */
const SectionLabel = ({
  id,
  title,
  description,
}: {
  id?: string;
  title: string;
  description?: string;
}) => (
  <div className="mb-4 flex flex-col gap-1.5 min-w-0">
    <div className="flex items-center gap-2.5">
      <span
        className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_10px_hsl(var(--primary)/0.45)]"
        aria-hidden
      />
      <h2
        id={id}
        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground"
      >
        {title}
      </h2>
      <div className="h-px flex-1 min-w-[2rem] bg-gradient-to-r from-border/60 via-border/25 to-transparent rounded-full" />
    </div>
    {description ? (
      <p className="text-[11px] sm:text-xs text-muted-foreground/85 leading-relaxed max-w-2xl pl-4 border-l border-primary/15">
        {description}
      </p>
    ) : null}
  </div>
);

export default SectionLabel;
