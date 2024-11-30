import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardHeader, CardTitle } from "./ui/card";
import RepoDetailed from "./RepoDetailed";
import { useDispatch, useSelector } from "react-redux";
import { setRepos } from "../store/authSlice";
import { useMutation } from "@apollo/client";
import { UPDATE_LAST_RELEASE } from "../graphql/mutations";

function RepoView() {
  const dispatch = useDispatch();
  const repos = useSelector((state: any) => state.auth.repos);

  const [selectedRepo, setSelectedRepo] = useState({ id: -1, isNew: false });
  const [updateLastRelease, { data, loading, error }] =
    useMutation(UPDATE_LAST_RELEASE);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full border-t">
      <ScrollArea className="w-full md:w-1/3 h-1/2 md:h-full md:border-r">
        <div className="p-4 space-y-4">
          {repos.map((repo: any) => (
            <Card
              key={repo.id}
              className={`cursor-pointer transition-colors ${
                selectedRepo.id === repo.id
                  ? "bg-primary text-primary-foreground"
                  : selectedRepo.isNew
                  ? "bg-muted hover:bg-muted/80"
                  : "bg-card hover:bg-accent"
              }`}
              onClick={async () => {
                setSelectedRepo({ ...repo, isNew: false });
                if (repo.isNew) {
                  const updatedRepos = repos.map((item: any) =>
                    item.id === repo.id ? { ...item, isNew: false } : item
                  );
                  dispatch(setRepos(updatedRepos));
                  try {
                    await updateLastRelease({
                      variables: {
                        id: repo.id,
                        last_release:
                          "" +
                          (repo.release.length === 0 ? -1 : repo.release[0].id),
                      },
                    });
                  } catch (err: any) {
                    console.error("Error:", err.message);
                  }
                }
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {`${repo.owner_name}/${repo.repo_name}`}
                  {repo.isNew && (
                    <span
                      className="text-xs px-1 py-0.5 bg-blue-500 rounded-sm text-white"
                      aria-hidden="true"
                    >
                      New
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <RepoDetailed repo={selectedRepo} />
    </div>
  );
}

export default RepoView;
