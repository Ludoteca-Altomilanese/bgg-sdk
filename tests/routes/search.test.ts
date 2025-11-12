import BGG from "~/index";
import MockAdapter from "axios-mock-adapter";

describe("search route", () => {
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

  it("should search for games and return results", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <items total="3" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
        <item type="boardgame" id="398158">
          <name type="primary" value="Grind House: Scythes Out"/>
          <yearpublished value="2023" />
        </item>
        <item type="boardgame" id="226320">
          <name type="primary" value="My Little Scythe"/>
          <yearpublished value="2017" />
        </item>
        <item type="videogame" id="251883">
          <name type="primary" value="Scythe: Digital Edition"/>
        </item>
      </items>
    `;

    mock.onGet("/search").reply(200, mockApiResponse);

    const result = await bgg.search({ query: "scythe" });

    expect(result).toBeDefined();
    expect(result.attributes.termsofuse).toBe(
      "https://boardgamegeek.com/xmlapi/termsofuse",
    );
    expect(result.items).toHaveLength(3);
    expect(result.items[0].name).toBe("Grind House: Scythes Out");
    expect(result.items[0].yearPublished).toBe("2023");
    expect(result.items[1].name).toBe("My Little Scythe");
    expect(result.items[2].type).toBe("videogame");
  });

  it("should handle search with no results", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <items total="0" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
      </items>
    `;

    mock.onGet("/search").reply(200, mockApiResponse);

    const result = await bgg.search({ query: "nonexistentgame12345" });

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(0);
  });

  it("should search with type filter", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <items total="1" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
        <item type="boardgame" id="226320">
          <name type="primary" value="My Little Scythe"/>
          <yearpublished value="2017" />
        </item>
      </items>
    `;

    mock
      .onGet("/search", { params: { query: "scythe", type: "boardgame" } })
      .reply(200, mockApiResponse);

    const result = await bgg.search({ query: "scythe", type: ["boardgame"] });

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(1);
    expect(result.items[0].type).toBe("boardgame");
  });
});
