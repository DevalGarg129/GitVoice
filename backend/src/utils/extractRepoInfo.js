export const extractRepoInfo = (repoUrl) => {
  const parts = repoUrl.split("github.com/")[1];
  const [owner, repo] = parts.split("/");

  return { owner, repo };
};
