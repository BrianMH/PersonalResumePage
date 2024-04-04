import Image from "next/image";
import IdentityCard from "@/components/front-page-intro-card";

/**
 * On the front page, we can have a card with initial presentational info, and then a few cards that would summarize
 * what would normally be seen on a resume.
 */

export default function Home() {
  return (
    <div className="flex-1 min-w-screen flex flex-col">
      <IdentityCard />
    </div>
  );
}