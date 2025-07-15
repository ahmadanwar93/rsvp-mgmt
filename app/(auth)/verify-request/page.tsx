import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-green-500">
            <EnvelopeOpenIcon className="size-15" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            A sign-in link has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  );
}
