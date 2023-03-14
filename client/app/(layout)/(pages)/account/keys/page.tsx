"use client";

import { useState } from "react";
import { IoIosTrash } from "react-icons/io";
import { trpc } from "../../../../ClientProvider";

export default function Keys() {
  const { data } = trpc.keys.getAll.useQuery({});
  const { mutate: remove } = trpc.keys.delete.useMutation();
  const { mutate: create, data: key, isError } = trpc.keys.new.useMutation();
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
            Created new key: <b>{key.secret}</b>. <br />
            Save it to a safe place!
          </p>
        </div>
      )}
      {!!data?.keys.length && (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.keys.map((key) => (
              <tr key={key.hash} className="">
                <th>{key.name}</th>
                <th>
                  <IoIosTrash
                    className="text-2xl cursor-pointer"
                    onClick={() => remove({ hash: key.hash })}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <form onSubmit={submit} className="flex flex-col items-start space-y-2">
        <p className="text-lg font-semibold">Create new API key</p>
        {isError && <p className="text-error">Write name for new API key</p>}
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
