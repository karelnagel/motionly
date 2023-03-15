import { generateMock } from "@anatine/zod-mock";
import { getRandomId } from "../../../../helpers";
import { getZod } from "./getZod";
import { InputSchemaItem, ItemType } from "./types";
import { useSchema } from "./useSchema";

export const EditSchema = () => {
  const schema = useSchema((s) => s.schema);
  const setSchema = useSchema((s) => s.setSchema);
  const setSchemaItem = useSchema((s) => s.setSchemaItem);
  if (!schema) return null;
  return (
    <div className="flex flex-col">
      <p>Check the inputs</p>
      <div className="space-y-2">
        {schema?.map((item) => (
          <SchemaItem key={item.id} item={item} setItem={setSchemaItem} />
        ))}
        <button className="btn btn-xs" onClick={() => setSchema([...schema, { name: "dsf", type: "string", id: getRandomId() }])}>
          Add item
        </button>
      </div>
      <button className="btn btn-outline" onClick={() => setSchema()}>
        Back
      </button>
      <p>Example</p>
      <textarea className="h-40" value={JSON.stringify(generateMock(getZod(schema)), null, 2)} readOnly />
    </div>
  );
};

const SchemaItem = ({ item, setItem, isArrayItem }: { item: InputSchemaItem; setItem: (i: InputSchemaItem) => void; isArrayItem?: boolean }) => {
  if (!item) return null;
  return (
    <div className="flex p-2 bg-base-300 rounded-lg items-center space-x-2">
      {!isArrayItem && (
        <input type="text" value={item.name} className="input input-sm" onChange={(e) => setItem({ ...item, name: e.target.value })} />
      )}
      {!isArrayItem && (
        <input type="checkbox" checked={!!item.optional} className="checkbox" onChange={() => setItem({ ...item, optional: !item.optional })} />
      )}
      <ItemTypeSelect item={item} setItem={setItem} />
      {item.type === "array" && <SchemaItem item={item.arrayType} setItem={(i) => setItem({ ...item, arrayType: i })} isArrayItem />}
      {item.type === "object" && (
        <div>
          {item.entries.map((entry) => (
            <SchemaItem
              key={entry.id}
              item={entry}
              setItem={(i) => setItem({ ...item, entries: item.entries.map((e) => (i.id === e.id ? i : e)) })}
            />
          ))}
          <button
            className="btn btn-xs"
            onClick={() => setItem({ ...item, entries: [...item.entries, { name: "dsf", type: "string", id: getRandomId() }] })}
          >
            Add item
          </button>
        </div>
      )}
    </div>
  );
};

const ItemTypeSelect = ({ item, setItem }: { item: InputSchemaItem; setItem: (i: InputSchemaItem) => void }) => {
  return (
    <select
      value={item.type}
      className="select select-sm"
      onChange={(e) => {
        const type = e.target.value as ItemType;
        if (type === "array") setItem({ ...item, type, arrayType: { id: getRandomId(), name: "", type: "string" } });
        else if (type === "object") setItem({ ...item, type, entries: [] });
        else setItem({ ...item, type });
      }}
    >
      {ItemType.options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
