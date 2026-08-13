import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
getProfile() {
  return jwtDecode<JwtPayload>(this.getToken());

}

loggedIn() {
 
  return !!this.getToken() && !this.isTokenExpired(this.getToken());
}

isTokenExpired(token: string) {
 
  try {
    const userToken = jwtDecode<JwtPayload>(token);
    if (userToken.exp && userToken.exp * 1000 < Date.now()) {
      return true; // Token is expired
    }

  } catch {
    return false; 
    
  }
}

getToken(): string {
  return localStorage.getItem('token') || '';
}

login(idToken: string) {

  
  localStorage.setItem('token', idToken);
  window.location.assign('/');

}

logout() {

  localStorage.removeItem('token');
  window.location.assign('/');
}
}

export default new AuthService();
