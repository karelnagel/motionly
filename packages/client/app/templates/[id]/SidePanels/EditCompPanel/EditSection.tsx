export const EditSection = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  level?: number;
  hideByDefault?: boolean;
}) => {
  return (
    <div className={`${className} py-2 space-y-2`}>
      {title && <h1 className="font-bold text-lg">{title}</h1>}
      <div className="w-full grid grid-cols-2 gap-2">{children}</div>
    </div>
  );
};
