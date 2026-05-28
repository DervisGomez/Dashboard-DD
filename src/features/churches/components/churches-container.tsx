"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getChurches,
} from "@/services/churches/get-churches";

import { Church }
  from "@/types/church";

import {
  ChurchesTable,
} from "./churches-table";

import {
  ChurchForm,
} from "./church-form";

import { Card }
  from "@/components/ui/card";

export function ChurchesContainer() {
  const [churches, setChurches] =
    useState<Church[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadChurches() {
    try {
      const data =
        await getChurches();

      setChurches(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const init = async () => {
      await loadChurches();
    };

    init();
  }, []);

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">
        Cargando iglesias...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <Card
        className="max-w-xl"
        title="Nueva iglesia"
        description="Registra una iglesia y su código para que los miembros puedan unirse."
      >
        <ChurchForm
          onSuccess={loadChurches}
        />
      </Card>

      <ChurchesTable
        churches={churches}
      />
    </div>
  );
}
