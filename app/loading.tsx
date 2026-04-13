export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-md px-4 py-6">
      <div className="space-y-4 animate-pulse">
        <div className="h-32 rounded-[28px] bg-white/70" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-28 rounded-[24px] bg-white/70" />
          <div className="h-28 rounded-[24px] bg-white/70" />
          <div className="h-28 rounded-[24px] bg-white/70" />
        </div>
        <div className="h-40 rounded-[28px] bg-white/70" />
        <div className="h-56 rounded-[28px] bg-white/70" />
      </div>
    </main>
  );
}
