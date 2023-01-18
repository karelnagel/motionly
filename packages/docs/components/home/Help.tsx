export const Help = () => {
  return (
    <div className="flex flex-col items-center py-14 space-y-14">
      <p className="title text-5xl font-bold">Contact</p>
      <p className="text-2xl text-center max-w-screen-sm font-medium leading-[1.5]">
        If you need further assistance, want to give feedback or need a custom
        remotion video, then join the{" "}
        <a href="/discord" target="_blank" className="text-blue-500">
          Discord
        </a>{" "}
        or send an email to{" "}
        <a
          href="mailto:asius@asius.dev"
          target="_blank"
          className="text-blue-500"
          rel="noreferrer"
        >
          asius@asius.dev
        </a>
        .
      </p>
      <div className=" h-1 w-full bg-gradient-to-l from-pink-500 to-blue-600 rounded-lg" />
    </div>
  );
};
