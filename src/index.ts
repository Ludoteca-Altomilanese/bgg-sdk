import { AxiosInstance } from "axios";
import { createAxiosInstance, BggSdkConfig } from "~/lib/axios";
import * as collectionModule from "~/routes/collection";
import * as familyModule from "~/routes/family";
import * as forumModule from "~/routes/forum";
import * as forumListModule from "~/routes/forumList";
import * as guildModule from "~/routes/guild";
import * as hotModule from "~/routes/hot";
import * as searchModule from "~/routes/search";
import * as thingModule from "~/routes/thing";
import * as threadModule from "~/routes/thread";
import * as userModule from "~/routes/user";
import * as playsIdModule from "~/routes/plays/id";
import * as playsUsernameModule from "~/routes/plays/username";

import {
  ParamsCollection,
  ParamsFamily,
  ParamsForum,
  ParamsForumList,
  ParamsGuild,
  ParamsHot,
  ParamsSearch,
  ParamsThing,
  ParamsThread,
  ParamsUser,
  ParamsPlaysId,
  ParamsPlaysUsername,
} from "~/routes/types/params";

import {
  PayloadCollection,
  PayloadFamily,
  PayloadForum,
  PayloadForumList,
  PayloadGuild,
  PayloadHot,
  PayloadSearch,
  PayloadThing,
  PayloadThread,
  PayloadUser,
  PayloadPlaysId,
  PayloadPlaysUsername,
} from "~/routes/types/payloads";

export { BggSdkConfig } from "~/lib/axios";
export * from "~/routes/types/index";

export class BGG {
  private axios: AxiosInstance;

  constructor(config: BggSdkConfig) {
    this.axios = createAxiosInstance(config);
  }

  async collection(params: ParamsCollection): Promise<PayloadCollection> {
    return collectionModule.collection(this.axios, params);
  }

  async family(params: ParamsFamily): Promise<PayloadFamily> {
    return familyModule.family(this.axios, params);
  }

  async forum(params: ParamsForum): Promise<PayloadForum> {
    return forumModule.forum(this.axios, params);
  }

  async forumList(params: ParamsForumList): Promise<PayloadForumList> {
    return forumListModule.forumList(this.axios, params);
  }

  async guild(params: ParamsGuild): Promise<PayloadGuild> {
    return guildModule.guild(this.axios, params);
  }

  async hot(params?: ParamsHot): Promise<PayloadHot> {
    return hotModule.hot(this.axios, params);
  }

  async search(params: ParamsSearch): Promise<PayloadSearch> {
    return searchModule.search(this.axios, params);
  }

  async thing(params: ParamsThing): Promise<PayloadThing> {
    return thingModule.thing(this.axios, params);
  }

  async thread(params: ParamsThread): Promise<PayloadThread> {
    return threadModule.thread(this.axios, params);
  }

  async user(params: ParamsUser): Promise<PayloadUser | null> {
    return userModule.user(this.axios, params);
  }

  plays = {
    id: async (params: ParamsPlaysId): Promise<PayloadPlaysId> => {
      return playsIdModule.id(this.axios, params);
    },
    username: async (
      params: ParamsPlaysUsername,
    ): Promise<PayloadPlaysUsername> => {
      return playsUsernameModule.username(this.axios, params);
    },
  };
}

export default BGG;
