import React from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { getDate } from "../lib/utils";
import Markdown from "react-markdown";

function RepoDetailed({ repo }: any) {
  return (
    <div className="w-full md:w-2/3 p-4">
      <Card>
        {repo.id !== -1 ? (
          <Tabs defaultValue="release" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="release">Releases</TabsTrigger>
              <TabsTrigger value="commits">Commits</TabsTrigger>
            </TabsList>
            <TabsContent value="release">
              <div className="p-4 flex flex-col gap-3">
                {repo.release.length > 0 ? (
                  repo.release.map((rel: any) => (
                    <Card className="p-4">
                      <a
                        href={rel.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-2xl font-semibold hover:underline"
                      >
                        {rel.tag_name}
                      </a>
                      <p className="text-sm mt-1 text-gray-600">
                        {getDate(rel.created_at)}
                      </p>
                      <Markdown className="italic mt-2 overflow-hidden">
                        {rel.body}
                      </Markdown>
                    </Card>
                  ))
                ) : (
                  <p className="font-semibold">No release yet</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="commits">
              <div className="p-4">
                {repo.commit.length > 0 ? (
                  repo.commit.map((com: any) => (
                    <div className="p-1 flex items-center gap-2 overflow-hidden">
                      <p className="text-blue-500">{com.sha.substring(0, 7)}</p>
                      <a
                        href={com.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm hover:underline"
                      >
                        {com.commit.message}
                      </a>
                    </div>
                  ))
                ) : (
                  <p>No commits yet</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex justify-center py-10">
            <p>Select a repo </p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default RepoDetailed;
