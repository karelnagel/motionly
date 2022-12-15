"use client";

import { signOut } from "next-auth/react";

export function LogOut() {
  return <button onClick={() => signOut()}>log out</button>;
}
