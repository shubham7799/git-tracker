import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getOwnerAndRepo } from "../lib/utils";
import { useSelector } from "react-redux";

type AddRepositoryProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onAdd: () => void;
};

function AddRepository({ open, setOpen, onAdd }: AddRepositoryProps) {
  const [repoLink, setRepoLink] = useState("");
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const userInfo = useSelector((state: any) => state.auth.userInfo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const repoData = getOwnerAndRepo(repoLink);
    if (repoData && userInfo) {
      await fetch(process.env.REACT_APP_BASE_URL + "/addRepo", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: userInfo.id,
          owner_name: repoData.owner,
          repo_name: repoData.repo,
        }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          await onAdd();
        });
      setRepoLink("");
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Repository</DialogTitle>
            <DialogDescription>
              Enter the link of your github repository in following format.
            </DialogDescription>
            <p className="pt-5">{`https://github.com/{owner}/{repo}`}</p>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="repoLink"
              placeholder="Enter repository url"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add Repository</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddRepository;
