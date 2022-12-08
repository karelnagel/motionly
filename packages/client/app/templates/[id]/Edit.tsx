"use client";

import { Template } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Edit = ({
  template,
}: {
  template: { name: string; description: string; public: boolean; id: string };
}) => {
  const [name, setName] = useState(template.name);
  const [description, setDescription] = useState(template.description);
  const [pub, setPub] = useState(template.public);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const save = async () => {
    setLoading(true);
    await axios.put(`/api/templates/${template.id}`, { name, description, public: pub });
    router.refresh();
    setLoading(false);
  };
  const deleteTemplate = async () => {
    setLoading(true);
    await axios.delete(`/api/templates/${template.id}`);
    router.refresh();
    router.push(`/templates`);
    setLoading(false);
  };
  return (
    <div>
      <p>Name</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <p>Description</p>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <p>Public</p>
      <input type="checkbox" checked={pub} onChange={(e) => setPub((p) => !p)} />
      <button disabled={loading} onClick={save}>
        SAVE
      </button>
      <button onClick={deleteTemplate} disabled={loading}>
        DELETE
      </button>
    </div>
  );
};
