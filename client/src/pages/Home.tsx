import React from "react";
import { Button } from "../components/ui/button";
import { GitBranch } from "lucide-react";

function Home() {
  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        process.env.REACT_APP_CLIENT_ID
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold">GitTracker</h1>
      <p className="text-sm mt-6 mb-14">
        Stay tuned with all your Github updates
      </p>
      <Button onClick={loginWithGithub}>
        <GitBranch />
        Login With Github
      </Button>
    </div>
  );
}

export default Home;
