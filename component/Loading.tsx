export default function Loading({ page }: { page: string }) {
  return (
    <div className="flex justify-center min-h-screen min-w-screen items-center text-6xl bg-black text-white typewriter text-center">
      Loading {page}....
    </div>
  );
}
