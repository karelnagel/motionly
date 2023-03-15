"use client";

import { useIsClient } from "./useIsClient";
import { useSchema } from "./useSchema";
import { EditSchema } from "./EditSchema";
import { InputJSON } from "./InputJSON";

export default function New() {
  const schema = useSchema((s) => s.schema);
  const isClient = useIsClient();
  if (!isClient) return null;
  if (!schema) return <InputJSON />;
  return <EditSchema />;
}
