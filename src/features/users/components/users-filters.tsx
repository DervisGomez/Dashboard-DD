"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export function UsersFilters() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const currentSearch =
    searchParams.get("search") || "";

  const currentProfile =
    searchParams.get("profile") || "";

  function updateFilter(
    key: string,
    value: string
  ) {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(
      `/users?${params.toString()}`
    );
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        md:flex-row
      "
    >
      <input
        type="text"
        placeholder="Buscar usuario..."
        defaultValue={currentSearch}
        onChange={(e) =>
          updateFilter(
            "search",
            e.target.value
          )
        }
        className="
          rounded-lg
          border
          px-4
          py-2
        "
      />

      <select
        defaultValue={currentProfile}
        onChange={(e) =>
          updateFilter(
            "profile",
            e.target.value
          )
        }
        className="
          rounded-lg
          border
          px-4
          py-2
        "
      >
        <option value="">
          Todos
        </option>

        <option value="completed">
          Perfil completo
        </option>

        <option value="pending">
          Perfil pendiente
        </option>
      </select>
    </div>
  );
}