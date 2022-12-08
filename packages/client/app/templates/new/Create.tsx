"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create({
  duplicateId,
  duplicateDescription,
  duplicateName,
}: {
  duplicateId?: string;
  duplicateName?: string;
  duplicateDescription?: string;
}) {
  const [name, setName] = useState(duplicateName);
  const [description, setDescription] = useState(duplicateDescription);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const create = async () => {
    setLoading(true);
    const res = await axios.post("/api/templates/new", { name, description, duplicateId });
    router.push(`/templates/${res.data.id}`);
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
      <button onClick={create} disabled={loading}>
        Create
      </button>
    </div>
  );
}
