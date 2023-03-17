import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <Link href="/profile">Profile</Link>
      <Link href="/">Index</Link>
      <Link href="/sign_up">Sign-Up</Link>
    </>
  );
}

export default Navbar;