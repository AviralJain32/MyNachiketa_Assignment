"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Types based on Lichess API response
interface LichessUser {
  id: string;
  username: string;
  url: string;
  perfs: {
    blitz?: { rating: number };
    rapid?: { rating: number };
    classical?: { rating: number };
    [key: string]: { rating: number } | undefined;
  };
  count?: {
    all: number;
    [key: string]: number;
  };
  profile?: {
    bio?: string;
    [key: string]: unknown;
  };
}

// API call function
const fetchLichessUser = async (username: string): Promise<LichessUser> => {
  const res = await fetch(`https://lichess.org/api/user/${username}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("User not found");
  return res.json();
};

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<LichessUser | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setProfile(null);
    try {
      const data = await fetchLichessUser(username);
      setProfile(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Error fetching profile");
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Lichess Profile</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Enter Lichess username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Fetch"}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {profile && (
        <Card>
          <CardHeader className="flex items-center gap-4">
            <img
              src={`https://lichess.org/api/user/${profile.username}/avatar`}
              alt="profile"
              className="w-14 h-14 rounded-full border"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://lichess1.org/assets/images/placeholder.png";
              }}
            />
            <div>
              <CardTitle>{profile.username}</CardTitle>
              {profile.profile?.bio && (
                <p className="text-sm text-muted-foreground mt-1">
                  {profile.profile.bio}
                </p>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Games Played:</span>{" "}
                {profile.count?.all ?? 0}
              </div>

              <div>
                <span className="font-medium">Ratings:</span>
                <ul className="list-disc ml-6 text-sm mt-1 space-y-1">
                  <li>Blitz: {profile.perfs?.blitz?.rating ?? "N/A"}</li>
                  <li>Rapid: {profile.perfs?.rapid?.rating ?? "N/A"}</li>
                  <li>Classical: {profile.perfs?.classical?.rating ?? "N/A"}</li>
                </ul>
              </div>

              <div>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm font-medium"
                >
                  View on Lichess
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
