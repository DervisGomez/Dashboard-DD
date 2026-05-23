import {
    notFound,
  } from "next/navigation";
  
  import {
    getUserById,
  } from "@/services/users/get-user-by-id";
  
  import {
    AvatarInitials,
  } from "@/components/ui/avatar-initials";
  
  import {
    Badge,
  } from "@/components/ui/badge";
  
  import {
    StatCard,
  } from "@/components/ui/stat-card";
  
  interface UserDetailPageProps {
    params: Promise<{
      id: string;
    }>;
  }
  
  export default async function UserDetailPage({
    params,
  }: UserDetailPageProps) {
    const { id } = await params;
  
    const user =
      await getUserById(id);
  
    if (!user) {
      notFound();
    }
  
    return (
      <div className="space-y-6">
        <div
          className="
            rounded-xl
            border
            bg-white
            p-6
          "
        >
          <div className="flex items-center gap-4">
            <AvatarInitials
              name={user.displayName}
            />
  
            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                "
              >
                {user.displayName}
              </h1>
  
              <p className="text-gray-500">
                {user.email}
              </p>
            </div>
          </div>
  
          <div className="mt-4">
            {user.profileCompleted ? (
              <Badge variant="success">
                Perfil completo
              </Badge>
            ) : (
              <Badge variant="warning">
                Perfil pendiente
              </Badge>
            )}
          </div>
        </div>
  
        <div
          className="
            grid
            gap-4
            md:grid-cols-3
          "
        >
          <StatCard
            title="Racha actual"
            value={
              user.stats
                ?.currentStreak || 0
            }
          />
  
          <StatCard
            title="Mejor racha"
            value={
              user.stats
                ?.bestStreak || 0
            }
          />
  
          <StatCard
            title="Total días"
            value={
              user.stats
                ?.totalDays || 0
            }
          />
        </div>
      </div>
    );
  }