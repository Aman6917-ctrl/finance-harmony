/**
 * Full-page decorative layers: mesh orbs, grid, soft top glow (depth without clutter).
 */
const DashboardBackground = () => (
  <>
    <div className="mesh-bg">
      <div className="orb w-[700px] h-[700px] bg-primary/25 -top-[250px] -right-[150px]" />
      <div
        className="orb w-[500px] h-[500px] bg-chart-6/15 bottom-[5%] -left-[100px]"
        style={{ animationDelay: "-10s" }}
      />
      <div
        className="orb w-[400px] h-[400px] bg-chart-4/10 top-[40%] right-[20%]"
        style={{ animationDelay: "-20s" }}
      />
    </div>
    <div className="fixed inset-0 grid-pattern pointer-events-none z-[1]" />
    {/* Subtle radial spotlight — reads as intentional polish */}
    <div
      className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,hsl(var(--primary)/0.09),transparent_58%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,hsl(var(--primary)/0.14),transparent_52%)]"
      aria-hidden
    />
    {/* Bottom wash — grounds the scroll */}
    <div
      className="fixed inset-x-0 bottom-0 h-[min(40vh,320px)] pointer-events-none z-[1] bg-gradient-to-t from-background/90 via-background/20 to-transparent dark:from-[hsl(222_48%_5%)] dark:via-transparent dark:to-transparent"
      aria-hidden
    />
  </>
);

export default DashboardBackground;
