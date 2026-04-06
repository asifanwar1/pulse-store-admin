import { Download, Plus, RefreshCw, Trash2, Upload } from "lucide-react";
import type { IToolbarAction as ToolbarAction } from "./TableToolbar";

// Common action factories
export const createAddAction = (
  label: string = "Add New",
  onClick: () => void,
  options?: Partial<ToolbarAction>
): ToolbarAction => ({
  id: "add",
  label,
  icon: <Plus className="h-4 w-4" />,
  variant: "primary",
  className: "bg-gray-800 hover:bg-gray-900 text-white",
  onClick,
  ...options,
});

export const createExportAction = (
  onClick: () => void,
  options?: Partial<ToolbarAction>
): ToolbarAction => ({
  id: "export",
  label: "Export",
  icon: <Download className="h-4 w-4" />,
  variant: "outline",
  onClick,
  ...options,
});

export const createImportAction = (
  onClick: () => void,
  options?: Partial<ToolbarAction>
): ToolbarAction => ({
  id: "import",
  label: "Import",
  icon: <Upload className="h-4 w-4" />,
  variant: "outline",
  onClick,
  ...options,
});

export const createRefreshAction = (
  onClick: () => void,
  options?: Partial<ToolbarAction>
): ToolbarAction => ({
  id: "refresh",
  label: "Refresh",
  icon: <RefreshCw className="h-4 w-4" />,
  variant: "outline",
  onClick,
  ...options,
});

export const createDeleteSelectedAction = (
  onClick: () => void,
  count: number = 0,
  options?: Partial<ToolbarAction>
): ToolbarAction => ({
  id: "delete-selected",
  label: `Delete Selected${count > 0 ? ` (${count})` : ""}`,
  icon: <Trash2 className="h-4 w-4" />,
  variant: "destructive",
  disabled: count === 0,
  onClick,
  ...options,
});
