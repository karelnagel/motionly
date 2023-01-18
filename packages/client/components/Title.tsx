export const Title = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center py-6 w-full relative">
      <p className="relative text-primary-content text-2xl md:text-5xl font-bold p-3 md:p-5 gradient bg-opacity-80 rounded-lg">
        {text}
      </p>
    </div>
  );
};
