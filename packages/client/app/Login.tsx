"use client";

import { signIn } from "next-auth/react";

export function Login() {
  return (
    <div>
      <p>Please login!</p>
      <button onClick={() => signIn("google")}>login with google</button>
    </div>
  );
}
