import GithubAuth from "./github-auth";
import GoogleAuth from "./google-auth";

const SocialAuth = () => {
  return (
    <>
      <div className="flex justify-between gap-4">
        <GithubAuth />
        <GoogleAuth />
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </>
  );
};

export default SocialAuth;
