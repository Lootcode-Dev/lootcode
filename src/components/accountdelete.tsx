"use client";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function AccountDelete() {
  const router = useRouter();
  const { signOut } = useClerk();

  const DeleteAccountButton = api.deletion.deleteAccount.useMutation({
    onSuccess: async () => {
      await signOut();
      alert("Account deleted successfully");
      router.push("/");
      window.location.reload();
    },
    onError: (error) => {
      // Handle error
      console.error("Error deleting account:", error);
      alert("Failed to delete account");
    },
  });
  const deleteAccountHelper = async () => {
    DeleteAccountButton.mutate();
  };

  return (
    <div className="flex w-full items-center justify-start">
      <Dialog>
        <DialogTrigger>
          <Button
            variant={"destructive"}
            className="mt-4 bg-red-700 text-white"
          >
            <div className="flex items-center">DELETE ACCOUNT</div>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[500px] overflow-auto bg-zinc-800 sm:max-w-[725px]">
          <h1 className="p-4 text-2xl font-bold text-red-500">
            THIS ACTION WILL DELETE ALL YOUR EXISTING DATA
          </h1>
          <p className="px-4 font-bold text-white">
            This action was added so users who experience issues after signing
            up can fix their account.
          </p>

          <p className="mb-0 px-4 pb-0 font-bold text-white">
            ARE YOU SURE YOU WOULD LIKE TO DELETE ALL YOUR DATA?
          </p>
          <Button
            onClick={deleteAccountHelper}
            className="mt-4 bg-purple-700 text-white"
          >
            YES
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
