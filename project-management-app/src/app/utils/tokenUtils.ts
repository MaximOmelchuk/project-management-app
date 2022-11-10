export const getExpirationDate = (jwtToken: string) => {
    if (!jwtToken) {
      return null;
    }
    let jwt;
    try {
      jwt = JSON.parse(atob(jwtToken.split('.')[1]));
    } catch (e) {
      return null;
    }
  
    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  };
  
  export const isExpired = (exp) => {
    if (!exp || exp === 'null' || exp === 'undefined') {
      return false;
    }
    return Date.now() > exp;
  };
  
  const getToken = async () => {
    if (localStorage.getItem('itVPN_access_token') === 'test') return null;
    const refresh = localStorage.getItem('itVPN_refresh_token');
    if (!localStorage.getItem('itVPN_access_token')) {
      return null;
    }
  
    if (isExpired(getExpirationDate(localStorage.getItem('itVPN_access_token')))) {
      if (isExpired(getExpirationDate(localStorage.getItem('itVPN_refresh_token')))) {
        localStorage.setItem('itVPN_access_token', null);
        return '';
      }
      const refreshResp = await fetch('/api/token/refresh/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ refresh }),
      });
      const access = await refreshResp.json();
      localStorage.setItem('itVPN_access_token', access.access);
    }
    const token = localStorage.getItem('itVPN_access_token');
    return token;
  };
  
  const getHeaders = async (headers) => {
    if (
      localStorage.getItem('itVPN_access_token') &&
      getExpirationDate(localStorage.getItem('itVPN_access_token'))
    )
      headers.set(
        'Authorization',
        localStorage.getItem('itVPN_access_token') ? 'Bearer ' + (await getToken()) : null
      );
    return headers;
  };
  
  export default getHeaders;
  