export async function setupApplication() {
  // await loadTheme();
  // await loadConfigs();
  // store.set(tokenStateAtom, "in_progress");
  // await validateTokens();
  // store.set(tokenStateAtom, "done");
  // store.set(socketConnectionStateAtom, "in_progress");
  // await openConnection();
  // store.set(socketConnectionStateAtom, "done");
}
// /**
//  * loads theme into store
//  * @returns
//  */
// function loadTheme() {
//   const theme = localStorage.getItem("theme");
//   if (!theme) return;
//   store.set(themeModeAtom, theme as Theme);
// }
// /**
//  * loads auth tokens into store
//  * @returns
//  */
// async function validateTokens() {
//   const access_token = localStorage.getItem("access_token");
//   const refresh_token = localStorage.getItem("refresh_token");
//   const profileStr = localStorage.getItem("profile");
//   if (!access_token || !refresh_token || !profileStr) {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("profile");
//     return false;
//   }
//   try {
//     const response = await axios.get("/profile", {
//       baseURL,
//       headers: { Authorization: "Bearer " + access_token },
//     });
//     setAuthStorage({ access_token, refresh_token, data: response.data });
//     return true;
//   } catch {
//     try {
//       const response = await axios.post<IAuthResponse>("/auth/rotate", { token: refresh_token }, { baseURL });
//       setAuthStorage(response.data);
//       return true;
//     } catch {
//       return false;
//     }
//   }
// }
