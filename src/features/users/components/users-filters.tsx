"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { ListFilter } from "lucide-react";

import { FilterChip } from "@/components/ui/filter-chip";

import { Popover } from "@/components/ui/popover";

import { SearchInput } from "@/components/ui/search-input";

import { SelectField } from "@/components/ui/select-field";

import {
  getDirectionLabel,
  getProfileLabel,
  getSortLabel,
} from "@/features/users/constants/filter-labels";

import { cn } from "@/lib/utils";

import { ui } from "@/lib/ui-tokens";

export function UsersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch =
    searchParams.get("search") || "";
  const currentProfile =
    searchParams.get("profile") || "";
  const currentSort =
    searchParams.get("sort") || "createdAt";
  const currentDirection =
    searchParams.get("direction") || "desc";

  const [searchInput, setSearchInput] =
    useState(currentSearch);
  const [filtersOpen, setFiltersOpen] =
    useState(false);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const pushParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      Object.entries(updates).forEach(
        ([key, value]) => {
          if (value) {
            params.set(key, value);
          } else {
            params.delete(key);
          }
        }
      );

      router.push(`/users?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    const trimmed = searchInput.trim();

    if (trimmed === currentSearch.trim()) {
      return;
    }

    const timer = window.setTimeout(() => {
      pushParams({ search: trimmed });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [searchInput, currentSearch, pushParams]);

  function updateFilter(key: string, value: string) {
    pushParams({ [key]: value });
  }

  const advancedFilterCount = useMemo(() => {
    let count = 0;
    if (currentProfile) count += 1;
    if (currentSort !== "createdAt") count += 1;
    if (currentDirection !== "desc") count += 1;
    return count;
  }, [currentProfile, currentSort, currentDirection]);

  const hasActiveFilters =
    Boolean(currentSearch.trim()) ||
    advancedFilterCount > 0;

  function clearFilters() {
    setSearchInput("");
    router.push("/users");
  }

  const profileLabel = getProfileLabel(currentProfile);
  const sortLabel = getSortLabel(currentSort);
  const directionLabel = getDirectionLabel(currentDirection);

  return (
    <div className={ui.stackBlock}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <SearchInput
          id="users-search"
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Buscar por nombre o correo..."
          className="min-w-0 flex-1"
        />

        <Popover
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          align="end"
          className="shrink-0 sm:w-auto"
          trigger={
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-haspopup="dialog"
              className={cn(
                `
                  inline-flex h-9 w-full items-center
                  justify-center gap-2 rounded-lg border
                  border-zinc-200/80 bg-white px-3
                  text-sm font-medium text-zinc-700
                  shadow-sm ring-1 ring-zinc-950/[0.03]
                  sm:w-auto
                `,
                ui.transition,
                ui.focusRing,
                filtersOpen
                  ? "border-[#2e7d32]/30 bg-[#f0fdf4] text-[#276c2c]"
                  : "hover:border-zinc-300 hover:bg-zinc-50"
              )}
            >
              <ListFilter size={15} strokeWidth={2} />
              Filtros
              {advancedFilterCount > 0 && (
                <span
                  className="
                    flex h-5 min-w-5 items-center justify-center
                    rounded-full bg-[#2e7d32]/10 px-1.5
                    text-[11px] font-semibold text-[#276c2c]
                  "
                >
                  {advancedFilterCount}
                </span>
              )}
            </button>
          }
        >
          <p className={cn(ui.overline, "mb-3")}>
            Refinar listado
          </p>
          <div className="space-y-3">
            <SelectField
              label="Estado del perfil"
              value={currentProfile}
              onChange={(v) => updateFilter("profile", v)}
            >
              <option value="">Todos los perfiles</option>
              <option value="completed">Perfil completo</option>
              <option value="pending">Perfil pendiente</option>
            </SelectField>

            <SelectField
              label="Ordenar por"
              value={currentSort}
              onChange={(v) => updateFilter("sort", v)}
            >
              <option value="createdAt">Más recientes</option>
              <option value="currentStreak">Racha actual</option>
              <option value="bestStreak">Mejor racha</option>
              <option value="totalDays">Total de días</option>
            </SelectField>

            <SelectField
              label="Dirección"
              value={currentDirection}
              onChange={(v) => updateFilter("direction", v)}
            >
              <option value="desc">Mayor a menor</option>
              <option value="asc">Menor a mayor</option>
            </SelectField>
          </div>
        </Popover>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {currentSearch.trim() && (
          <FilterChip
            label={`"${currentSearch.trim()}"`}
            onRemove={() => setSearchInput("")}
          />
        )}

        <FilterChip
          label={profileLabel}
          onRemove={
            currentProfile
              ? () => updateFilter("profile", "")
              : undefined
          }
        />

        <FilterChip
          label={sortLabel}
          onRemove={
            currentSort !== "createdAt"
              ? () => updateFilter("sort", "createdAt")
              : undefined
          }
        />

        <FilterChip
          label={directionLabel}
          onRemove={
            currentDirection !== "desc"
              ? () => updateFilter("direction", "desc")
              : undefined
          }
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className={cn(
              "px-1.5 py-0.5 text-xs font-medium text-zinc-500",
              ui.transition,
              ui.focusRing,
              "rounded-md hover:text-zinc-900"
            )}
          >
            Limpiar todo
          </button>
        )}
      </div>
    </div>
  );
}
