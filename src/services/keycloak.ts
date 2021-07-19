const keycloakAuthUrl = process.env.REACT_APP_KEYCLOAK_AUTH_URL || 'https://keycloak.do.x5.ru/auth';
const keycloakRealm = process.env.REACT_APP_KEYCLOAK_REALM || 'LDAP_test';
const keycloakClientId = process.env.REACT_APP_KEYCLOAK_CLIENT_ID || 'finportal';

const keycloak = {
  goToLogin() {
    window.location.replace(
      `${keycloakAuthUrl}/realms/${keycloakRealm}/protocol/openid-connect/auth?client_id=${keycloakClientId}&redirect_uri=${window.location.origin}&response_type=code`
    );
  },

  logout() {
    fetch(`/oauth/logout`).then(() => this.goToLogin());
  },
};

export default keycloak;
