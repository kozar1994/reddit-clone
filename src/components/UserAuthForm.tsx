"use client";

import React, { useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icond";
import { useToast } from "@/hooks/use-toast";

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

function UserAuthForm({ className, ...props }: Props) {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsloading(true);

    try {
      await signIn("google");
    } catch {
      toast({
        title: "There was a problem.",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div {...props} className={cn("flex justify-center", className)}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="w-4 h-4" />}
        Google
      </Button>
    </div>
  );
}

export default UserAuthForm;
