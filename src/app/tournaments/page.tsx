"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface Tournament {
  id: string;
  fullName: string;
  nbPlayers: number;
  rated: boolean;
  variant: { name: string };
  perf: { name: string };
  startsAt: number;
  minutes: number;
  createdBy: string;
}

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://lichess.org/api/tournament")
      .then((res) => res.json())
      .then((data) => {
        setTournaments(data.created || []);
      })
      .catch((err) => console.error("Error fetching tournaments:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {tournaments.map((tournament) => (
        <Card key={tournament.id} className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {tournament.fullName}
              {tournament.rated && <Badge>Rated</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold">Variant:</span>{" "}
              {tournament.variant.name}
            </p>
            <p>
              <span className="font-semibold">Perf:</span> {tournament.perf.name}
            </p>
            <p>
              <span className="font-semibold">Players:</span>{" "}
              {tournament.nbPlayers}
            </p>
            <p>
              <span className="font-semibold">Starts:</span>{" "}
              {new Date(tournament.startsAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Duration:</span>{" "}
              {tournament.minutes} minutes
            </p>
            <p>
              <span className="font-semibold">Created By:</span>{" "}
              {tournament.createdBy}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
