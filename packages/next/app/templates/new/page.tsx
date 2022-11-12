"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function NewTemplate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const create = async () => {
    const res = await axios.post("/api/templates/new", { name, description });
    setId(res.data.id);
  };
  return (
    <div>
      <p>New Template</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Name"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <button onClick={create}>Create</button>
      {id && (
        <Link href="/edit/${id}" as={`/edit/${id}`}>
          Edit
        </Link>
      )}
    </div>
  );
}
