import BGG from "~/index";
import MockAdapter from "axios-mock-adapter";

describe("thing route", () => {
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

  it("should fetch thing data by id", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
        <item type="boardgame" id="169786">
          <thumbnail>https://cf.geekdo-images.com/thumb/img/image.jpg</thumbnail>
          <image>https://cf.geekdo-images.com/original/img/image.jpg</image>
          <name type="primary" value="Scythe" sortindex="1" />
          <description>Description text</description>
          <yearpublished value="2016" />
          <minplayers value="1" />
          <maxplayers value="5" />
          <playingtime value="115" />
          <minplaytime value="90" />
          <maxplaytime value="115" />
          <minage value="14" />
        </item>
      </items>
    `;

    mock.onGet("/thing").reply(200, mockApiResponse);

    const result = await bgg.thing({ id: ["169786"] });

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe("169786");
    expect(result.items[0].names[0].value).toBe("Scythe");
    expect(result.items[0].yearPublished).toBe("2016");
    expect(result.items[0].minPlayers).toBe("1");
    expect(result.items[0].maxPlayers).toBe("5");
  });

  it("should fetch multiple things", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
        <item type="boardgame" id="169786">
          <name type="primary" value="Scythe" sortindex="1" />
          <description>Game description</description>
          <yearpublished value="2016" />
          <minplayers value="1" />
          <maxplayers value="5" />
          <playingtime value="115" />
          <minplaytime value="90" />
          <maxplaytime value="115" />
          <minage value="14" />
        </item>
        <item type="boardgame" id="226320">
          <name type="primary" value="My Little Scythe" sortindex="1" />
          <description>Game description 2</description>
          <yearpublished value="2017" />
          <minplayers value="1" />
          <maxplayers value="6" />
          <playingtime value="45" />
          <minplaytime value="30" />
          <maxplaytime value="60" />
          <minage value="8" />
        </item>
      </items>
    `;

    mock.onGet("/thing").reply(200, mockApiResponse);

    const result = await bgg.thing({ id: ["169786", "226320"] });

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(2);
    expect(result.items[0].names[0].value).toBe("Scythe");
    expect(result.items[1].names[0].value).toBe("My Little Scythe");
  });
});
