export const Help = () => {
  return (
    <div className="flex flex-col items-center space-y-8 md:space-y-14">
      <p className="title text-4xl md:text-5xl font-bold">Contact</p>
      <p className="text-xl md:text-2xl text-center max-w-screen-sm font-medium leading-[1.5]">
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
    </div>
  );
};
