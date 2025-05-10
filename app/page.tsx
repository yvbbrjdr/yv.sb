"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCreateEnabled(isValidUrl(url) && isValidSlug(slug));
  }, [url, slug]);

  const handleCreate = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/yvsb/api/v1/short_urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, slug }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create short URL");
      }

      const shortUrl = `${window.location.origin}/${data.data.slug}`;
      toast.success(
        <>
          Short URL created:
          <br />
          <a
            className="text-blue-500 hover:underline"
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>
        </>,
        {
          action: {
            label: "Copy",
            onClick: () => {
              navigator.clipboard.writeText(shortUrl);
            },
          },
          duration: 60000,
        }
      );
      setUrl("");
      setSlug("");
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while creating the short URL"
      );
    } finally {
      setIsLoading(false);
    }
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
            <div className="flex items-center justify-between">
              <a
                href="https://github.com/yvbbrjdr/yv.sb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGithub className="text-gray-700" />
              </a>
              <Button
                className="cursor-pointer"
                disabled={!createEnabled || isLoading}
                onClick={handleCreate}
              >
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
