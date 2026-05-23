import {
  Eye,
} from "lucide-react";

import { AppUser }
  from "@/types/user";

import {
  Badge,
} from "@/components/ui/badge";

import {
  AvatarInitials,
} from "@/components/ui/avatar-initials";

interface UsersTableProps {
  users: AppUser[];
}

import Link from "next/link";

export function UsersTable({
  users,
}: UsersTableProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        bg-white
      "
    >
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left text-sm">
              Usuario
            </th>

            <th className="p-4 text-left text-sm">
              Estado
            </th>

            <th className="p-4 text-left text-sm">
              Racha
            </th>

            <th className="p-4 text-left text-sm">
              Total días
            </th>

            <th className="p-4 text-left text-sm">
              Acción
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <AvatarInitials
                    name={
                      user.displayName
                    }
                  />

                  <div>
                    <p className="font-medium">
                      {
                        user.displayName
                      }
                    </p>

                    <p
                      className="
                        text-sm
                        text-gray-500
                      "
                    >
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="p-4">
                {user.profileCompleted ? (
                  <Badge variant="success">
                    Completo
                  </Badge>
                ) : (
                  <Badge variant="warning">
                    Pendiente
                  </Badge>
                )}
              </td>

              <td className="p-4">
                {
                  user.stats
                    ?.currentStreak
                }
              </td>

              <td className="p-4">
                {
                  user.stats
                    ?.totalDays
                }
              </td>

              <td className="p-4">
              <Link
  href={`/users/${user.id}`}
  className="
    inline-flex
    rounded-lg
    border
    p-2
    hover:bg-gray-100
  "
>
  <Eye size={18} />
</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}