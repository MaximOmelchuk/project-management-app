export const getExpirationDate = (jwtToken: string) => {
  if (!jwtToken) {
    return null;
  }
  let jwt;
  try {
    jwt = JSON.parse(atob(jwtToken.split(".")[1]));
  } catch (e) {
    return null;
  }

  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

export const isExpired = (exp: string | number) => {
  if (!exp || exp === 'null' || exp === 'undefined') {
    return false;
  }
  return Date.now() > exp;
};

const getToken = async () => {
  if (!localStorage.getItem("app_access_token")) {
    return null;
  }
 return localStorage.getItem("app_access_token"); // TODO вставил временно, весь функционал проверки в закоментченном коде ниже

  // if (
  //   isExpired(getExpirationDate(localStorage.getItem("app_access_token")!))
  // ) {
  //   const refreshResp = await fetch("/api/token/refresh/", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //     body: JSON.stringify({ refresh }),
  //   });
  //   const access = await refreshResp.json();
  //   localStorage.setItem("app_access_token", access.access);
  // }
  // const token = localStorage.getItem("app_access_token");
  // return token;
};

const getHeaders = async (headers: Headers) => {
  if (
    localStorage.getItem("app_access_token") &&
    getExpirationDate(localStorage.getItem("app_access_token") || "")
  )
    headers.set(
      "Authorization",
      localStorage.getItem("app_access_token")
        ? "Bearer " + (await getToken())
        : ""
    );
  return headers;
};

export default getHeaders;
