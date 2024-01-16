import { Management, WebAuth } from "auth0-js";
import { deleteCookie } from "cookies-next";
import delay from "delay";

import {
  AUTH0_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_RESPONSE_TYPE,
  AUTH0_SCOPES,
  SITE_ORIGIN,
} from "@/lib/const";

import { AuthTypes } from "./types";

export const webAuth0 = new WebAuth({
  clientID: AUTH0_CLIENT_ID,
  domain: AUTH0_DOMAIN,
  redirectUri: SITE_ORIGIN,
  audience: AUTH0_AUDIENCE,
  scope: AUTH0_SCOPES,
  responseType: AUTH0_RESPONSE_TYPE,
});

export const manageAuth0 = new Management({
  token: "MANAGMENT API TOKEN", // Todo: need to create valid token for updating user Info
  domain: AUTH0_DOMAIN,
  audience: AUTH0_AUDIENCE,
  scope: AUTH0_SCOPES,
});

// Todo: need to replace delay with proper promise
export const useAuth = () => {
  const getUser: AuthTypes["getUser"] = async (accessToken) => {
    const requestDelay = delay(100000, { value: "Done" });
    let result: any;

    try {
      // getting user information from access token
      await webAuth0.client.userInfo(accessToken, (error, response) => {
        if (error) {
          result = error;
        }
        if (response) {
          result = response;
        }
        requestDelay.clear();
      });
      await requestDelay;
    } catch (error) {
      console.log(error);
    }

    await requestDelay;
    return result;
  };

  const logout: AuthTypes["logout"] = async () => {
    try {
      deleteCookie("access_token");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    logout,
    getUser,
  };
};
