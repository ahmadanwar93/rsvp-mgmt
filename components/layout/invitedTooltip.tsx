import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InvitedToolTipProps } from "@/lib/types";
import { InfoIcon } from "lucide-react";

export function InvitedTooltip({ invited_at }: InvitedToolTipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild className="hidden md:block mr-2.5">
        <InfoIcon className="size-4" />
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-white">{`Invited at ${invited_at}`}</p>
      </TooltipContent>
    </Tooltip>
  );
}
