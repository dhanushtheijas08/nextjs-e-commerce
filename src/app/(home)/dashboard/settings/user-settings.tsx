"use client";

import type { UserSession } from "@/types/types";
export type UserSettingsProps = {
  user: UserSession;
};

const UserSettings = ({ user }: UserSettingsProps) => {
  console.log(user);
  // {
  //   email: "21cs033@kpriet.ac.in";
  //   emailVerified: null;
  //   id: "clww9qbag0000q0umpug8dbqa";
  //   image: "https://lh3.googleusercontent.com/a/ACg8ocLdFQ8zK8HtX_soeSkNw0yPXkc-TxKHnF-S_iRXMem_EAcY9Q=s96-c";
  //   isOAuth: true;
  //   name: "DHANUSH T P";
  //   role: "USER";
  // }
  return <div>UserSettings</div>;
};

export default UserSettings;
