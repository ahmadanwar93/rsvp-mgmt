import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function InvitationSummary() {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Attending response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div>
                <p className="font-semibold text-sm">Invitation sent</p>
                <p>10</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Total guests</p>
                <p>20</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div>
                <p className="font-semibold text-sm">Invitation sent</p>
                <p>15</p>
              </div>
              <div>
                <p className="font-semibold text-sm">
                  Total (potential) guests
                </p>
                <p>35</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Declined response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div>
                <p className="font-semibold text-sm">Invitation sent</p>
                <p>5</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Total guests</p>
                <p>-</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Dietary requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold text-sm">No dietary restrictions</p>
                <p>15</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Vegetarian</p>
                <p>5</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Vegan</p>
                <p>6</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Gluten free</p>
                <p>10</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Halal</p>
                <p>20</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default InvitationSummary;
