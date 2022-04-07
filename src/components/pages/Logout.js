function Logout() {
    window.localStorage.clear();
    window.location.href = "/";
  }
  
  export default Logout;