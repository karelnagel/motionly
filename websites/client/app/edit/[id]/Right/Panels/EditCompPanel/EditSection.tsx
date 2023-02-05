export const EditSection = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) => {
  return (
    <div className={`${className} pb-4 space-y-2`}>
      {title && <h1 className="font-bold text-lg">{title}</h1>}
      <div className="w-full grid grid-cols-2 gap-x-1">{children}</div>
    </div>
  );
};
