import { createAxiosInstance } from "~/lib/axios";
import MockAdapter from "axios-mock-adapter";

describe("Axios Instance", () => {
  it("should create axios instance with bearer token", () => {
    const axiosInstance = createAxiosInstance({ bearerToken: "test-token" });
    expect(axiosInstance).toBeDefined();
    expect(axiosInstance.defaults.headers.Authorization).toBe(
      "Bearer test-token",
    );
  });

  it("should use default baseURL", () => {
    const axiosInstance = createAxiosInstance({ bearerToken: "test-token" });
    expect(axiosInstance.defaults.baseURL).toBe(
      "https://boardgamegeek.com/xmlapi2/",
    );
  });

  it("should allow custom baseURL", () => {
    const axiosInstance = createAxiosInstance({
      bearerToken: "test-token",
      axiosConfig: {
        baseURL: "https://custom.api.com/",
      },
    });
    expect(axiosInstance.defaults.baseURL).toBe("https://custom.api.com/");
  });

  it("should merge custom headers with authorization", () => {
    const axiosInstance = createAxiosInstance({
      bearerToken: "test-token",
      axiosConfig: {
        headers: {
          "User-Agent": "MyApp/1.0",
        },
      },
    });
    expect(axiosInstance.defaults.headers.Authorization).toBe(
      "Bearer test-token",
    );
    expect(axiosInstance.defaults.headers["User-Agent"]).toBe("MyApp/1.0");
  });

  it("should convert XML response to JSON", async () => {
    const axiosInstance = createAxiosInstance({ bearerToken: "test-token" });
    const mock = new MockAdapter(axiosInstance);

    const xmlResponse =
      '<?xml version="1.0" encoding="utf-8"?><items total="1"><item id="123"/></items>';
    mock.onGet("/test").reply(200, xmlResponse);

    const response = await axiosInstance.get("/test");
    expect(response.data).toBeInstanceOf(Object);
    expect(response.data.items).toBeDefined();
  });

  it("should handle XML parse errors", async () => {
    const axiosInstance = createAxiosInstance({ bearerToken: "test-token" });
    const mock = new MockAdapter(axiosInstance);

    const invalidXml = "not valid xml";
    mock.onGet("/test").reply(200, invalidXml);

    await expect(axiosInstance.get("/test")).rejects.toThrow(
      "Failed to parse XML data from BGG",
    );
  });

  it("should handle network errors", async () => {
    const axiosInstance = createAxiosInstance({ bearerToken: "test-token" });
    const mock = new MockAdapter(axiosInstance);

    mock.onGet("/test").networkError();

    await expect(axiosInstance.get("/test")).rejects.toMatch(
      /Unexpected error calling BGG API/,
    );
  });
});
