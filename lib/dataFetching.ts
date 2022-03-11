// eslint-disable @typescript-eslint/no-explicit-any
// not a good idea to do type check while fetching data from 3rd api
import { NotFound } from "@curveball/http-errors/dist";
import { fetchAPI } from "./api";

export type IArticleList = Array<{
  title: string;
  canonicalUrl: string;
  tags: Array<string>;
  summary: string;
}>;

export interface IArticle {
  title: string;
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface ITag {
  name: string;
}

export const getSiteTitle = (): Promise<string> => {
  return fetchAPI("/site", { populate: "*" }).then((res) => {
    return res.data.attributes.title;
  });
};

export const getArticleUrlList = (): Promise<Array<string>> => {
  return fetchAPI("/articles", {
    fields: ["title", "canonicalUrl", "summary"],
  }).then((res) => {
    return res.data.map((article: any) => article.attributes.canonicalUrl);
  });
};

export const getArticleListByPage = (
  page = 1,
  pageSize = 10
): Promise<IArticleList> => {
  const queryTime = new Date();

  return fetchAPI("/articles", {
    fields: ["id", "title", "canonicalUrl", "summary"],
    populate: ["tags"],
    pagination: {
      pageSize: pageSize,
      page: page,
    },
    filters: {
      createdAt: {
        $lt: queryTime.setSeconds(queryTime.getSeconds() - 60),
      },
    },
    sort: ["createdAt:desc"],
  }).then((res) => {
    return res.data.map((article: any) => ({
      title: article.attributes.title,
      canonicalUrl: article.attributes.canonicalUrl,
      tags: article.attributes.tags.data.map((tag: any) => {
        return tag.attributes.name;
      }),
      summary: article.attributes.summary,
    }));
  });
};

export const getArticlePageSize = (pageSize = 10): Promise<number> => {
  return fetchAPI("/articles", {
    fields: ["id"],
    pagination: {
      page: 1,
      pageSize: pageSize,
    },
  }).then((res) => {
    return res.meta.pagination.pageCount;
  });
};

export const getArticle = (slug: string): Promise<IArticle> => {
  return fetchAPI("/articles", {
    fields: ["title", "content", "createdAt", "updatedAt"],
    populate: ["tags"],
    filters: {
      canonicalUrl: {
        $eq: slug,
      },
    },
  }).then((res) => {
    if (res.data.length > 0) {
      return {
        title: res.data[0].attributes.title,
        content: res.data[0].attributes.content,
        tags: res.data[0].attributes.tags.data.map((tag: any) => {
          return tag.attributes.name;
        }),
        createdAt: res.data[0].attributes.createdAt,
        updatedAt: res.data[0].attributes.updatedAt,
      };
    } else {
      throw new NotFound(`No this article`);
    }
  });
};

export interface IProfile {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

export const getProfile = () => {
  return fetchAPI("/profile", {
    fields: [
      "name",
      "title",
      "summary",
      "email",
      "phone",
      "location",
      "github",
      "linkedin",
    ],
  }).then((res) => {
    return res.data.attributes;
  });
};

export const getProfilePictureUrl = (): Promise<string> => {
  return fetchAPI("/profile", {
    populate: ["picture"],
    fields: ["id"],
  }).then((res) => {
    if (res.data.attributes.picture.data) {
      return res.data.attributes.picture.data.attributes.url;
    } else {
      return null;
    }
  });
};
