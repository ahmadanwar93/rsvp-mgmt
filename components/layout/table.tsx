import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  dietaryStatusVariant,
  inviteStatusVariant,
  mockInvitationGuests,
} from "@/lib/const";
import { Badge } from "../ui/badge";
import { InvitedTooltip } from "./invitedTooltip";
import { Button } from "../ui/button";
import { TrashIcon, CopyIcon } from "@radix-ui/react-icons";

export function TableInvite() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] pl-0">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Guests</TableHead>
          <TableHead>Dietary Restrictions</TableHead>
          <TableHead>Group</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockInvitationGuests.map((guest) => (
          <TableRow key={guest.id}>
            <TableCell className="font-medium pl-0">{guest.name}</TableCell>
            <TableCell>
              <Badge
                className="rounded-full"
                variant={inviteStatusVariant[guest.respond_status]}
              >
                {guest.respond_status}
              </Badge>
            </TableCell>
            <TableCell>{guest.attendees_count}</TableCell>
            <TableCell>
              <Badge
                className="rounded-full"
                variant={dietaryStatusVariant[guest.dietary_restrictions]}
              >
                {guest.dietary_restrictions}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className="rounded-full" variant={"outline"}>
                {guest.guestGroup}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-row gap-2  items-center">
                <InvitedTooltip invited_at={guest.created_at} />
                <Button variant="ghost" size="icon">
                  <CopyIcon />
                </Button>
                <Button variant="ghost" size="icon">
                  <TrashIcon />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
