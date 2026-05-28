import { Church }
  from "@/types/church";

interface ChurchesTableProps {
  churches: Church[];
}

export function ChurchesTable({
  churches,
}: ChurchesTableProps) {
  return (
    <div className="ui-table-shell">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px]">
          <thead className="ui-table-head">
            <tr>
              <th className="ui-table-th">
                Iglesia
              </th>
              <th className="ui-table-th">
                Código
              </th>
              <th className="ui-table-th">
                Ciudad
              </th>
              <th className="ui-table-th">
                País
              </th>
            </tr>
          </thead>

          <tbody>
            {churches.map((church) => (
              <tr
                key={church.id}
                className="ui-table-row"
              >
                <td className="ui-table-td font-medium text-foreground">
                  {church.name}
                </td>

                <td className="ui-table-td">
                  <span
                    className="
                      inline-flex rounded-md bg-muted
                      px-2 py-0.5 font-mono text-xs
                      text-foreground
                    "
                  >
                    {church.code}
                  </span>
                </td>

                <td className="ui-table-td text-muted-foreground">
                  {church.city}
                </td>

                <td className="ui-table-td text-muted-foreground">
                  {church.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
