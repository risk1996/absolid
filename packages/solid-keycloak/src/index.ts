import { createContextProvider } from '@solid-primitives/context'
import Keycloak from 'keycloak-js'
import type { Accessor, Resource } from 'solid-js'
import { createMemo, createResource } from 'solid-js'

export type KeycloakProviderParams = {
  /**
   * `KeycloakConfig` to be passed to the Keycloak instance creation
   */
  config: Parameters<typeof Keycloak>[0]

  /**
   * `KeycloakInitOptions` to be passed to the instance's `init` function
   */
  initOptions: Keycloak.KeycloakInitOptions
}

export interface UseKeycloakResult {
  /**
   * Redirects to the Account Management Console.
   */
  accountManagement: Accessor<
    Keycloak.KeycloakInstance['accountManagement'] | undefined
  >

  /**
   * Is true if the user is authenticated, false otherwise.
   */
  authenticated: Accessor<
    Keycloak.KeycloakInstance['authenticated'] | undefined
  >

  /**
   * Clears authentication state, including tokens. This can be useful if
   * the application has detected the session was expired, for example if
   * updating token fails. Invoking this results in Keycloak#onAuthLogout
   * callback listener being invoked.
   */
  clearToken: Accessor<Keycloak.KeycloakInstance['clearToken'] | undefined>

  /**
   * Returns the URL to the Account Management Console.
   * @param options The options used for creating the account URL.
   */
  createAccountUrl: Accessor<
    Keycloak.KeycloakInstance['createAccountUrl'] | undefined
  >

  /**
   * Returns the URL to login form.
   * @param options Supports same options as Keycloak#login.
   */
  createLoginUrl: Accessor<
    Keycloak.KeycloakInstance['createLoginUrl'] | undefined
  >

  /**
   * Returns the URL to logout the user.
   * @param options Logout options.
   */
  createLogoutUrl: Accessor<
    Keycloak.KeycloakInstance['createLogoutUrl'] | undefined
  >

  /**
   * Returns the URL to registration page.
   * @param options The options used for creating the registration URL.
   */
  createRegisterUrl: Accessor<
    Keycloak.KeycloakInstance['createRegisterUrl'] | undefined
  >

  /**
   * Flow passed in init.
   */
  flow: Accessor<Keycloak.KeycloakInstance['flow'] | undefined>

  /**
   * Returns true if the token has the given realm role.
   * @param role A realm role name.
   */
  hasRealmRole: Accessor<Keycloak.KeycloakInstance['hasRealmRole'] | undefined>

  /**
   * Returns true if the token has the given role for the resource.
   * @param role A role name.
   * @param resource If not specified, `clientId` is used.
   */
  hasResourceRole: Accessor<
    Keycloak.KeycloakInstance['hasResourceRole'] | undefined
  >

  /**
   * The base64 encoded ID token.
   */
  idToken: Accessor<Keycloak.KeycloakInstance['idToken'] | undefined>

  /**
   * The parsed id token as a JavaScript object.
   */
  idTokenParsed: Accessor<
    Keycloak.KeycloakInstance['idTokenParsed'] | undefined
  >

  /**
   * Returns true if the token has less than `minValidity` seconds left before
   * it expires.
   * @param minValidity If not specified, `0` is used.
   */
  isTokenExpired: Accessor<
    Keycloak.KeycloakInstance['isTokenExpired'] | undefined
  >

  /**
   * Redirects to login form.
   * @param options Login options.
   */
  login: Accessor<Keycloak.KeycloakInstance['login'] | undefined>

  /**
   * Redirects to logout.
   * @param options Logout options.
   */
  logout: Accessor<Keycloak.KeycloakInstance['logout'] | undefined>

  /**
   * Called when a AIA has been requested by the application.
   */
  onActionUpdate: Accessor<
    Keycloak.KeycloakInstance['onActionUpdate'] | undefined
  >

  /**
   * Called if there was an error during authentication.
   */
  onAuthError: Accessor<Keycloak.KeycloakInstance['onAuthError'] | undefined>

  /**
   * Called if the user is logged out (will only be called if the session
   * status iframe is enabled, or in Cordova mode).
   */
  onAuthLogout: Accessor<Keycloak.KeycloakInstance['onAuthLogout'] | undefined>

  /**
   * Called if there was an error while trying to refresh the token.
   */
  onAuthRefreshError: Accessor<
    Keycloak.KeycloakInstance['onAuthRefreshError'] | undefined
  >

  /**
   * Called when the token is refreshed.
   */
  onAuthRefreshSuccess: Accessor<
    Keycloak.KeycloakInstance['onAuthRefreshSuccess']
  >

  /**
   * Called when a user is successfully authenticated.
   */
  onAuthSuccess: Accessor<
    Keycloak.KeycloakInstance['onAuthSuccess'] | undefined
  >

  /**
   * Called when the adapter is initialized.
   */
  onReady: Accessor<Keycloak.KeycloakInstance['onReady'] | undefined>

  /**
   * Called when the access token is expired. If a refresh token is available
   * the token can be refreshed with Keycloak#updateToken, or in cases where
   * it's not (ie. with implicit flow) you can redirect to login screen to
   * obtain a new access token.
   */
  onTokenExpired: Accessor<
    Keycloak.KeycloakInstance['onTokenExpired'] | undefined
  >

  /**
   * Loads the user's profile.
   * @returns A promise to set functions to be invoked on success or error.
   */
  profile: Resource<Keycloak.KeycloakInstance['profile'] | undefined>

  /**
   * The realm roles associated with the token.
   */
  realmAccess: Accessor<Keycloak.KeycloakInstance['realmAccess'] | undefined>

  /**
   * The base64 encoded refresh token that can be used to retrieve a new token.
   */
  refreshToken: Accessor<Keycloak.KeycloakInstance['refreshToken'] | undefined>

  /**
   * The parsed refresh token as a JavaScript object.
   */
  refreshTokenParsed: Accessor<
    Keycloak.KeycloakInstance['refreshTokenParsed'] | undefined
  >

  /**
   * Redirects to registration form.
   * @param options The options used for the registration.
   */
  register: Accessor<Keycloak.KeycloakInstance['register'] | undefined>

  /**
   * The resource roles associated with the token.
   */
  resourceAccess: Accessor<
    Keycloak.KeycloakInstance['resourceAccess'] | undefined
  >

  /**
   * Response mode passed in init (default value is `'fragment'`).
   */
  responseMode: Accessor<Keycloak.KeycloakInstance['responseMode'] | undefined>

  /**
   * Response type sent to Keycloak with login requests. This is determined
   * based on the flow value used during initialization, but can be overridden
   * by setting this value.
   */
  responseType: Accessor<Keycloak.KeycloakInstance['responseType'] | undefined>

  /**
   * The user id.
   */
  subject: Accessor<Keycloak.KeycloakInstance['subject'] | undefined>

  /**
   * The estimated time difference between the browser time and the Keycloak
   * server in seconds. This value is just an estimation, but is accurate
   * enough when determining if a token is expired or not.
   */
  timeSkew: Accessor<Keycloak.KeycloakInstance['timeSkew'] | undefined>

  /**
   * The base64 encoded token that can be sent in the Authorization header in
   * requests to services.
   */
  token: Accessor<Keycloak.KeycloakInstance['token'] | undefined>

  /**
   * The parsed token as a JavaScript object.
   */
  tokenParsed: Accessor<Keycloak.KeycloakInstance['tokenParsed'] | undefined>

  /**
   * If the token expires within `minValidity` seconds, the token is refreshed.
   * If the session status iframe is enabled, the session status is also
   * checked.
   * @returns A promise to set functions that can be invoked if the token is
   *          still valid, or if the token is no longer valid.
   * @example
   * ```js
   * keycloak.updateToken(5).then(function(refreshed) {
   *   if (refreshed) {
   *     alert('Token was successfully refreshed');
   *   } else {
   *     alert('Token is still valid');
   *   }
   * }).catch(function() {
   *   alert('Failed to refresh the token, or the session has expired');
   * });
   */
  updateToken: Accessor<Keycloak.KeycloakInstance['updateToken'] | undefined>
}

export const KeycloakContext = createContextProvider<
  UseKeycloakResult,
  KeycloakProviderParams
>(({ config, initOptions }: KeycloakProviderParams): UseKeycloakResult => {
  const [instance] = createResource(async () => {
    const instance = Keycloak(config)
    await instance.init(initOptions)

    return instance
  })
  const [profile] = createResource(
    instance,
    async () => await instance()?.loadUserProfile(),
  )

  const accountManagement = createMemo(() => instance()?.accountManagement)
  const authenticated = createMemo(() => instance()?.authenticated)
  const clearToken = createMemo(() => instance()?.clearToken)
  const createAccountUrl = createMemo(() => instance()?.createAccountUrl)
  const createLoginUrl = createMemo(() => instance()?.createLoginUrl)
  const createLogoutUrl = createMemo(() => instance()?.createLogoutUrl)
  const createRegisterUrl = createMemo(() => instance()?.createRegisterUrl)
  const flow = createMemo(() => instance()?.flow)
  const hasRealmRole = createMemo(() => instance()?.hasRealmRole)
  const hasResourceRole = createMemo(() => instance()?.hasResourceRole)
  const idToken = createMemo(() => instance()?.idToken)
  const isTokenExpired = createMemo(() => instance()?.isTokenExpired)
  const login = createMemo(() => instance()?.login)
  const logout = createMemo(() => instance()?.logout)
  const onActionUpdate = createMemo(() => instance()?.onActionUpdate)
  const onAuthError = createMemo(() => instance()?.onAuthError)
  const onAuthLogout = createMemo(() => instance()?.onAuthLogout)
  const onAuthRefreshError = createMemo(() => instance()?.onAuthRefreshError)
  const onAuthRefreshSuccess = createMemo(
    () => instance()?.onAuthRefreshSuccess,
  )
  const onAuthSuccess = createMemo(() => instance()?.onAuthSuccess)
  const onReady = createMemo(() => instance()?.onReady)
  const onTokenExpired = createMemo(() => instance()?.onTokenExpired)
  const idTokenParsed = createMemo(() => instance()?.idTokenParsed)
  const realmAccess = createMemo(() => instance()?.realmAccess)
  const refreshToken = createMemo(() => instance()?.refreshToken)
  const refreshTokenParsed = createMemo(() => instance()?.refreshTokenParsed)
  const register = createMemo(() => instance()?.register)
  const resourceAccess = createMemo(() => instance()?.resourceAccess)
  const responseMode = createMemo(() => instance()?.responseMode)
  const responseType = createMemo(() => instance()?.responseType)
  const subject = createMemo(() => instance()?.subject)
  const timeSkew = createMemo(() => instance()?.timeSkew)
  const token = createMemo(() => instance()?.token)
  const tokenParsed = createMemo(() => instance()?.tokenParsed)
  const updateToken = createMemo(() => instance()?.updateToken)

  return {
    accountManagement,
    authenticated,
    clearToken,
    createAccountUrl,
    createLoginUrl,
    createLogoutUrl,
    createRegisterUrl,
    flow,
    hasRealmRole,
    hasResourceRole,
    idToken,
    idTokenParsed,
    isTokenExpired,
    login,
    logout,
    onActionUpdate,
    onAuthError,
    onAuthLogout,
    onAuthRefreshError,
    onAuthRefreshSuccess,
    onAuthSuccess,
    onReady,
    onTokenExpired,
    profile,
    realmAccess,
    refreshToken,
    refreshTokenParsed,
    register,
    resourceAccess,
    responseMode,
    responseType,
    subject,
    timeSkew,
    token,
    tokenParsed,
    updateToken,
  }
})

/**
 * Keycloak context provider component
 */
export const KeycloakProvider = KeycloakContext[0]

/**
 * Hook for listening to Keycloak instance
 */
export const useKeycloak = KeycloakContext[1]

export type {
  KeycloakAccountOptions,
  KeycloakAdapter,
  KeycloakConfig,
  KeycloakError,
  KeycloakFlow,
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakLoginOptions,
  KeycloakLogoutOptions,
  KeycloakOnLoad,
  KeycloakPkceMethod,
  KeycloakProfile,
  KeycloakPromise,
  KeycloakPromiseCallback,
  KeycloakRegisterOptions,
  KeycloakResourceAccess,
  KeycloakResponseMode,
  KeycloakResponseType,
  KeycloakRoles,
  KeycloakTokenParsed,
} from 'keycloak-js'
