import { fetchAPI } from "./api";

export const getSiteTitle = () => {
  return fetchAPI("/site", { populate: "*" }).then((res) => {
    return res.data.attributes.title;
  });
};

export type IArticleList = Array<{
  title: string;
  canonicalUrl: string;
}>;

export const getArticleList = (): Promise<IArticleList> => {
  return fetchAPI("/articles", {
    fields: ["title", "canonicalUrl"],
  }).then((res) => {
    return res.data.map(
      (article: { attributes: { title: string; canonicalUrl: string } }) => ({
        title: article.attributes.title,
        canonicalUrl: article.attributes.canonicalUrl,
      })
    );
  });
};

export const getArticleListByPage = (
  page = 1,
  pageSize = 10
): Promise<IArticleList> => {
  return fetchAPI("/articles", {
    fields: ["title", "canonicalUrl"],
    pagination: {
      pageSize: pageSize,
      page: page,
    },
    sort: ["createdAt:desc"],
  }).then((res) => {
    return res.data.map(
      (article: { attributes: { title: string; canonicalUrl: string } }) => ({
        title: article.attributes.title,
        canonicalUrl: article.attributes.canonicalUrl,
      })
    );
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

export interface IArticle {
  title: string;
  content: string;
}

export const getArticle = (slug: string) => {
  return fetchAPI("/articles", {
    filters: {
      canonicalUrl: {
        $eq: slug,
      },
    },
    fields: ["title", "content"],
  }).then((res) => {
    return {
      title: res.data[0].attributes.title,
      content: res.data[0].attributes.content,
    };
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
    return res.data.attributes.picture.data.attributes.url;
  });
};
