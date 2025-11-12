import BGG from "~/index";

describe("BGG Class", () => {
  it("should create an instance with bearer token", () => {
    const bgg = new BGG({ bearerToken: "test-token" });
    expect(bgg).toBeDefined();
    expect(bgg).toBeInstanceOf(BGG);
  });

  it("should have all route methods defined", () => {
    const bgg = new BGG({ bearerToken: "test-token" });

    expect(bgg.collection).toBeDefined();
    expect(typeof bgg.collection).toBe("function");

    expect(bgg.family).toBeDefined();
    expect(typeof bgg.family).toBe("function");

    expect(bgg.forum).toBeDefined();
    expect(typeof bgg.forum).toBe("function");

    expect(bgg.forumList).toBeDefined();
    expect(typeof bgg.forumList).toBe("function");

    expect(bgg.guild).toBeDefined();
    expect(typeof bgg.guild).toBe("function");

    expect(bgg.hot).toBeDefined();
    expect(typeof bgg.hot).toBe("function");

    expect(bgg.search).toBeDefined();
    expect(typeof bgg.search).toBe("function");

    expect(bgg.thing).toBeDefined();
    expect(typeof bgg.thing).toBe("function");

    expect(bgg.thread).toBeDefined();
    expect(typeof bgg.thread).toBe("function");

    expect(bgg.user).toBeDefined();
    expect(typeof bgg.user).toBe("function");
  });

  it("should have plays methods defined", () => {
    const bgg = new BGG({ bearerToken: "test-token" });

    expect(bgg.plays).toBeDefined();
    expect(bgg.plays.id).toBeDefined();
    expect(typeof bgg.plays.id).toBe("function");

    expect(bgg.plays.username).toBeDefined();
    expect(typeof bgg.plays.username).toBe("function");
  });

  it("should require bearer token", () => {
    // @ts-expect-error - Testing runtime error
    expect(() => new BGG()).toThrow();
  });
});
