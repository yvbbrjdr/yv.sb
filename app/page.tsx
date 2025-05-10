"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidUrl, isValidSlug } from "@/lib/utils";

export default function Home() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [createEnabled, setCreateEnabled] = useState(false);

  useEffect(() => {
    setCreateEnabled(isValidUrl(url) && isValidSlug(slug));
  }, [url, slug]);

  const handleCreate = () => {
    toast.error("Coming soon!");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-[400px] select-none">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">yv.sb</h1>
              <div className="text-sm text-gray-500">
                A minimalistic short URL service
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="slug">Slug (Optional)</Label>
                <Input
                  id="slug"
                  placeholder="example"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="cursor-pointer"
                disabled={!createEnabled}
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
