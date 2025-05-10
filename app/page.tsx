import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
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
                <Input id="url" placeholder="https://example.com/" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="slug">Slug (Optional)</Label>
                <Input id="slug" placeholder="example" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="cursor-pointer">Create</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
