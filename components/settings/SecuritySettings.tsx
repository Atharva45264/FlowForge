"use client";

import {
  Shield,
  Lock,
  Smartphone,
  LogOut,
  Trash2,
  ExternalLink,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SecuritySettings() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold">
          Security
        </h2>

        <p className="mt-2 text-muted-foreground">
          Manage your account security and authentication.
        </p>
      </div>

      {/* Password */}

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Lock className="mt-1 text-primary" />

            <div>
              <h3 className="font-semibold">
                Password
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Change your account password securely through Clerk.
              </p>
            </div>
          </div>

          <Button
            onClick={() => window.open("/user", "_blank")}
          >
            Manage
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* 2FA */}

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Smartphone className="mt-1 text-primary" />

            <div>
              <h3 className="font-semibold">
                Two-Factor Authentication
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Add an extra layer of security to your account.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => window.open("/user", "_blank")}
          >
            Configure
          </Button>
        </div>
      </Card>

      {/* Sessions */}

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Shield className="mt-1 text-primary" />

            <div>
              <h3 className="font-semibold">
                Active Sessions
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                View devices currently signed in to your account.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => window.open("/user", "_blank")}
          >
            View Sessions
          </Button>
        </div>
      </Card>

      {/* Logout */}

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <LogOut className="mt-1 text-orange-500" />

            <div>
              <h3 className="font-semibold">
                Sign Out Everywhere
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                End all active sessions on every device.
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={() => window.open("/user", "_blank")}
          >
            Sign Out
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}

      <Card className="border-red-500 p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Trash2 className="mt-1 text-red-500" />

            <div>
              <h3 className="font-semibold text-red-500">
                Delete Account
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Permanently delete your FlowForge account and all associated data.
                This action cannot be undone.
              </p>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={() => window.open("/user", "_blank")}
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}