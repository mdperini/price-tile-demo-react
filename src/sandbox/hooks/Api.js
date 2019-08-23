export function fetchRepos() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            name: "Re-base",
            handle: "tylermcginnis",
            stars: 2125,
            url: "https://github.com/tylermcginnis/re-base"
          },
          {
            name: "React Router Firebase Auth",
            handle: "tylermcginnis",
            stars: 709,
            url: "https://github.com/tylermcginnis/react-router-firebase-auth"
          },
          {
            name: "React Course",
            handle: "tylermcginnis",
            stars: 2429,
            url: "https://github.com/tylermcginnis/react-course"
          }
        ]);
      }, 2000);
    });
}
