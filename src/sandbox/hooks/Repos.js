import React from "react";
import { fetchRepos } from "./apj";
import Loading from "./Loading";

export default function ReposGrid() {
  const [repos, setRepos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    fetchRepos().then(repos => {
      setRepos(repos);
      setLoading(false);
    });
  }, []);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <ul>
      {repos.map(({ name, handle, stars, url }) => (
        <li key={name}>
          <ul>
            <li>
              <a href={url}>{name}</a>
            </li>
            <li>@{handle}</li>
            <li>{stars} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  );
}
