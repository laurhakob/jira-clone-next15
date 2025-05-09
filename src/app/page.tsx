// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div>
      Logged in!
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>

    // <div className="">
    //   <Input />
    //   <Button>Primary</Button>
    //   <Button variant="secondary">Secondary</Button>
    //   <Button variant="destructive">Destructive</Button>
    //   <Button variant="ghost">Ghost</Button>
    //   <Button variant="muted">Muted</Button>
    //   <Button variant="outline">Outline</Button>
    //   <Button variant="teritary">Teritary</Button>
    // </div>
  );
}
