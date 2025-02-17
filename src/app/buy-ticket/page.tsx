"use client";

import { useRouter } from "next/navigation";

export default function RedirectingToHomePage() {
  const router = useRouter();
  router.push("/");
}
