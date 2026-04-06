import { Inbox } from "lucide-react";

const DataTableEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No data found
      </h3>
    </div>
  );
};

export default DataTableEmpty;
