import { auth, signIn, signOut } from "../auth";

const AuthButton = async () => {
  const session = await auth();

  //If user is logged in show their name and a signout button
  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">
          {session.user.name}
        </span>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
          >
            Sign Out
          </button>
        </form>
      </div>
    );
  }

  //If not logged in, show the Github Login button
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github"); // This automatically redirects to GitHub
      }}
    >
      <button
        type="submit"
        className="text-sm bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors flex items-center gap-2"
      >
        <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        Sign in with GitHub
      </button>
    </form>
  );
};

export default AuthButton;
