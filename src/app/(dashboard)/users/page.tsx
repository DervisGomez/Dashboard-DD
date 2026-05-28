import {
  UsersContainer,
} from "@/features/users/components/users-container";

import {
  UsersFilters,
} from "@/features/users/components/users-filters";

import { ui } from "@/lib/ui-tokens";

export default function UsersPage() {
  return (
    <div className={ui.stackBlock}>
      <UsersFilters />

      <section aria-label="Listado de usuarios">
        <UsersContainer />
      </section>
    </div>
  );
}
