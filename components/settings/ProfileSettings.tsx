"use client";

import { useUser } from "@clerk/nextjs";
import { User, Mail, ShieldCheck, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ProfileSettings() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-40 animate-pulse rounded bg-muted" />
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-2 text-muted-foreground">
          View your account information and manage your profile.
        </p>
      </div>

      <Card>
        <CardContent className="flex items-center gap-6 pt-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-2xl font-semibold">
              {user?.fullName}
            </h2>

            <p className="text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-5 pt-6">
          <h3 className="text-lg font-semibold">
            Account Information
          </h3>

          <Separator />

          <div className="flex items-center gap-4">
            <User className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Full Name
              </p>

              <p>{user?.fullName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <p>{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                User ID
              </p>

              <p className="font-mono text-xs">
                {user?.id}
              </p>
            </div>
          </div>

          <Separator />

          <Button
            onClick={() =>
              window.open("/user", "_blank")
            }
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Manage Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}