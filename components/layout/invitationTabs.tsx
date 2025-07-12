import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import InvitationSummary from "./invitationSummary";
import { TableInvite } from "./table";

export function InvitationTabs() {
  return (
    <Tabs defaultValue="list">
      <TabsList>
        <TabsTrigger value="list">Invitation List</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <TableInvite />
      </TabsContent>
      <TabsContent value="summary">
        <InvitationSummary />
      </TabsContent>
    </Tabs>
  );
}
