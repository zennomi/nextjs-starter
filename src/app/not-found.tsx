import Link from "next/link";

import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={routes.home}>Return Home</Link>
    </div>
  );
}
