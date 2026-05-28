import {
  AdminTable,
  AdminTableBody,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeadCell,
  AdminTableHeadRow,
  AdminTableRow,
} from "@/components/ui/admin-table";

export function UsersTableSkeleton() {
  return (
    <AdminTable
      aria-busy
      minWidth="680px"
    >
      <AdminTableHead>
        <AdminTableHeadRow>
          <AdminTableHeadCell>Usuario</AdminTableHeadCell>
          <AdminTableHeadCell
            align="right"
            className="hidden sm:table-cell"
          >
            Racha
          </AdminTableHeadCell>
          <AdminTableHeadCell
            align="right"
            className="hidden md:table-cell"
          >
            Mejor
          </AdminTableHeadCell>
          <AdminTableHeadCell
            align="right"
            className="hidden md:table-cell"
          >
            Total
          </AdminTableHeadCell>
          <AdminTableHeadCell className="w-12" />
        </AdminTableHeadRow>
      </AdminTableHead>

      <AdminTableBody>
        {Array.from({ length: 8 }).map((_, index) => (
          <AdminTableRow key={index}>
            <AdminTableCell className="!h-auto py-2.5">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-zinc-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-32 animate-pulse rounded bg-zinc-100" />
                  <div className="h-3 w-44 animate-pulse rounded bg-zinc-100" />
                </div>
              </div>
            </AdminTableCell>
            <AdminTableCell
              className="hidden sm:table-cell"
              align="right"
            >
              <div className="ml-auto h-3.5 w-6 animate-pulse rounded bg-zinc-100" />
            </AdminTableCell>
            <AdminTableCell
              className="hidden md:table-cell"
              align="right"
            >
              <div className="ml-auto h-3.5 w-6 animate-pulse rounded bg-zinc-100" />
            </AdminTableCell>
            <AdminTableCell
              className="hidden md:table-cell"
              align="right"
            >
              <div className="ml-auto h-3.5 w-6 animate-pulse rounded bg-zinc-100" />
            </AdminTableCell>
            <AdminTableCell>
              <div className="mx-auto h-8 w-8 animate-pulse rounded-md bg-zinc-100" />
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTableBody>
    </AdminTable>
  );
}
