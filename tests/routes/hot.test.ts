import BGG from "~/index";
import MockAdapter from "axios-mock-adapter";

describe("hot route", () => {
  let bgg: BGG;
  let mock: MockAdapter;

  beforeEach(() => {
    bgg = new BGG({ bearerToken: "test-token" });
    // @ts-expect-error - Accessing private property for testing
    mock = new MockAdapter(bgg.axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should fetch hot items", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
        <item id="12345" rank="1">
          <thumbnail value="https://cf.geekdo-images.com/thumb.jpg"/>
          <name value="Hot Game 1"/>
          <yearpublished value="2023"/>
        </item>
        <item id="67890" rank="2">
          <thumbnail value="https://cf.geekdo-images.com/thumb2.jpg"/>
          <name value="Hot Game 2"/>
          <yearpublished value="2024"/>
        </item>
      </items>
    `;

    mock.onGet("/hot").reply(200, mockApiResponse);

    const result = await bgg.hot();

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(2);
    expect(result.items[0].name).toBe("Hot Game 1");
    expect(result.items[0].rank).toBe("1");
    expect(result.items[1].name).toBe("Hot Game 2");
  });

  it("should fetch hot items with type filter", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
        <item id="12345" rank="1">
          <thumbnail value="https://cf.geekdo-images.com/thumb.jpg"/>
          <name value="Hot Boardgame"/>
          <yearpublished value="2023"/>
        </item>
      </items>
    `;

    mock.onGet("/hot").reply(200, mockApiResponse);

    const result = await bgg.hot({ type: ["boardgame"] });

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(1);
  });
});
