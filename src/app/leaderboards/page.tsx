// app/leaderboards/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

// Define types for Player performance
interface Perf {
  rating: number;
  progress: number;
}

// Player type
interface Player {
  id: string;
  username: string;
  title?: string;
  perfs: Record<string, Perf>;
}

// API response type
type LeaderboardResponse = Record<string, Player[]>;

export default function LeaderboardsPage() {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://lichess.org/api/player")
      .then((res) => res.json())
      .then((d: LeaderboardResponse) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );

  if (!data)
    return (
      <p className="text-center p-6 text-red-500">
        Failed to load leaderboards
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Lichess Leaderboards
      </h1>

      <div className="grid gap-8">
        {Object.keys(data).map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="capitalize">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data[category].map((player, i) => (
                      <TableRow key={player.id}>
                        <TableCell className="text-center">{i + 1}</TableCell>
                        <TableCell>
                          <a
                            href={`https://lichess.org/@/${player.username}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {player.username}
                          </a>
                        </TableCell>
                        <TableCell>{player.title || "-"}</TableCell>
                        <TableCell>
                          {player.perfs?.[category]?.rating ?? "N/A"}
                        </TableCell>
                        <TableCell
                          className={
                            player.perfs?.[category]?.progress >= 0
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }
                        >
                          {player.perfs?.[category]?.progress ?? 0}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
