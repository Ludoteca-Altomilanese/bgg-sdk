import axiosBase, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  CreateAxiosDefaults,
} from "axios";
import axiosRetry from "axios-retry";
import convert from "xml-js";

export interface BggSdkConfig {
  bearerToken: string;
  retries?: number;
  retryDelay?: typeof axiosRetry.exponentialDelay;
  axiosConfig?: CreateAxiosDefaults;
}

export const createAxiosInstance = (config: BggSdkConfig): AxiosInstance => {
  const {
    bearerToken,
    retries = 3,
    retryDelay = axiosRetry.exponentialDelay,
    axiosConfig = {},
  } = config;

  const { baseURL = "https://boardgamegeek.com/xmlapi2/", ...restConfig } =
    axiosConfig;

  const axiosInstance = axiosBase.create({
    baseURL,
    ...restConfig,
    headers: {
      ...restConfig.headers,
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  axiosRetry(axiosInstance, {
    retries,
    retryDelay,
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<string>) => {
      try {
        const jsonData = convert.xml2js(response.data, { compact: true });
        (response as AxiosResponse).data = jsonData;
        return response;
      } catch (error) {
        throw new Error("Failed to parse XML data from BGG");
      }
    },
    (error: AxiosError) => {
      return Promise.reject(
        `Unexpected error calling BGG API: ${error.message}`,
      );
    },
  );

  return axiosInstance;
};
