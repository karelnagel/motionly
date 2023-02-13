"use client";

import { useState } from "react";
import { IoIosTrash } from "react-icons/io";
import { trpc } from "../../../ClientProvider";

export default function Keys() {
  const { data } = trpc.keys.getAll.useQuery({});
  const { mutate: remove } = trpc.keys.delete.useMutation();
  const { mutate: create, data: key } = trpc.keys.new.useMutation();
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create({ name });
  };
  return (
    <div className="space-y-3">
      {key && (
        <div className="flex flex-col space-y-2">
          <p className="text-info text-lg">
            Your new key is <b>{key.secret}</b>. Save it to a safe place
          </p>
        </div>
      )}
      {!!data?.keys.length && (
        <div className=" flex flex-col space-y-3">
          <p className="text-lg font-semibold">Current keys</p>

          <div className="flex flex-col space-y-2">
            {data.keys.map((key) => (
              <div
                key={key.hash}
                className="flex justify-between bg-base-200 rounded-lg p-2"
              >
                <p>{key.name}</p>
                <IoIosTrash
                  className="text-2xl cursor-pointer"
                  onClick={() => remove({ hash: key.hash })}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={submit} className="flex flex-col items-start space-y-2">
        <p className="text-lg font-semibold">Create new API key</p>
        <input
          type="text"
          className="input"
          placeholder="New API key Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn">
          Create
        </button>
      </form>
    </div>
  );
}
