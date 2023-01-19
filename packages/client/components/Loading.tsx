export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-screen w-full">
      <progress className="progress w-60 md:w-96 h-4 progress-primary" />
    </div>
  );
}
