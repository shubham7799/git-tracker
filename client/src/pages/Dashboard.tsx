import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, setRepos, setUserInfo } from "../store/authSlice";
import AddRepository from "../components/AddRepository";
import { Button } from "../components/ui/button";
import RepoView from "../components/RepoView";
import { Plus, RefreshCw } from "lucide-react";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

function Dashboard() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const repos = useSelector((state: any) => state.auth.repos);

  const [openNewRepo, setOpenNewRepo] = useState(false);

  function getRepos() {
    fetch(process.env.REACT_APP_BASE_URL + "/getRepos", {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(repos);
        const newRepos = data.map((repo: any) => ({
          ...repo,
          isNew:
            repo.last_release === null ||
            (repo.release.length > 0 &&
              repo.release[0].id.toString() !== repo.last_release),
        }));
        dispatch(setRepos(newRepos));
      });
  }

  function logout() {
    Cookies.remove("access-token");
    dispatch(clearAll());
  }

  useEffect(() => {
    if (accessToken && !userInfo) {
      fetch(process.env.REACT_APP_BASE_URL + "/getUserData", {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dispatch(setUserInfo(data));
        });
      getRepos();
    }
  }, [accessToken]);

  return (
    <div className="relative">
      <AddRepository open={openNewRepo} setOpen={setOpenNewRepo} />
      <div className="fixed top-0 bg-white z-50 w-screen flex items-center justify-between p-4 md:px-6 border-b">
        <h1 className="text-3xl font-semibold">GitTracker</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="flex items-center gap-2">
              <img
                className="rounded-full h-5 w-5"
                src={userInfo ? userInfo.avatar_url : ""}
                alt=""
              />
              <p className="text-sm font-semibold">
                {userInfo ? userInfo.login : ""}
              </p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="pt-14 flex items-center justify-center gap-4 my-8">
        <Button onClick={() => setOpenNewRepo(true)}>
          <Plus />
          Add New Repository
        </Button>
        <Button onClick={getRepos}>
          <RefreshCw />
          Refresh
        </Button>
      </div>
      <RepoView />
    </div>
  );
}

export default Dashboard;
