export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-sm supports-[padding:env(safe-area-inset-top)]:p-[env(safe-area-inset-top)]">
      <div className="flex flex-col items-center gap-4 px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500 sm:h-12 sm:w-12" />
        <p className="text-sm font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
