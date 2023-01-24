export const PanelTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex flex-col items-center space-y-2 mb-2">
      <p className="text-2xl font-bold">{title}</p>
      <div className="h-1 w-full gradient rounded-full" />
    </div>
  );
};
