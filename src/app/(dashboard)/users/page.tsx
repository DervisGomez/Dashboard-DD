import {
  UsersContainer,
} from "@/features/users/components/users-container";

import {
  UsersFilters,
} from "@/features/users/components/users-filters";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Usuarios
        </h1>

        <p className="text-gray-500">
          Lista de usuarios registrados
        </p>
      </div>
      <UsersFilters />
      
      <UsersContainer />
    </div>
  );
}