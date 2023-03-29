import { useStore } from "../store";

export const edit = () => {
  const setPage = useStore((s) => s.setPage);
  return (
    <div>
      <button className="btn" onClick={() => setPage("home")}>
        Back
      </button>
    </div>
  );
};
