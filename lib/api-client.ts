import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

type LocaleWithCultureDetailDto = {
  cultureDetails: CultureCodeAndDetailDto;
  l: {};
};
type CultureCodeAndDetailDto = {
  cultureCode: string;
  detail: string;
};
type PaginatedResponseOfLocaleDto = Partial<{
  items: Array<LocaleDto>;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}>;
type LocaleDto = {
  id: string;
  cultureCode: string;
  key: string;
  value: string;
};

const LocaleDto: z.ZodType<LocaleDto> = z
  .object({
    id: z.string().uuid(),
    cultureCode: z.string(),
    key: z.string(),
    value: z.string(),
  })
  .strict()
  .passthrough();
const PaginatedResponseOfLocaleDto: z.ZodType<PaginatedResponseOfLocaleDto> = z
  .object({
    items: z.array(LocaleDto),
    currentPage: z.number().int(),
    pageSize: z.number().int(),
    totalCount: z.number().int(),
    totalPages: z.number().int(),
    hasPrevious: z.boolean(),
    hasNext: z.boolean(),
  })
  .partial()
  .strict()
  .passthrough();
const CreateLocaleDto = z
  .object({ cultureCode: z.string(), key: z.string(), value: z.string() })
  .strict()
  .passthrough();
const UpdateLocaleDto = z
  .object({
    id: z.string().uuid(),
    cultureCode: z.string(),
    key: z.string(),
    value: z.string(),
  })
  .strict()
  .passthrough();
const LocalizationEntity = z
  .object({
    id: z.string().uuid(),
    cultureCode: z.string(),
    key: z.string(),
    value: z.string(),
  })
  .partial()
  .strict()
  .passthrough();
const CultureCodeAndDetailDto: z.ZodType<CultureCodeAndDetailDto> = z
  .object({ cultureCode: z.string(), detail: z.string() })
  .strict()
  .passthrough();
const LocaleWithCultureDetailDto: z.ZodType<LocaleWithCultureDetailDto> = z
  .object({ cultureDetails: CultureCodeAndDetailDto, l: z.record(z.string()) })
  .strict()
  .passthrough();
const CreateTodo = z.object({ content: z.string() }).strict().passthrough();
const UpdateTodo = z
  .object({ content: z.string(), isCompleted: z.boolean() })
  .strict()
  .passthrough();

export const schemas = {
  LocaleDto,
  PaginatedResponseOfLocaleDto,
  CreateLocaleDto,
  UpdateLocaleDto,
  LocalizationEntity,
  CultureCodeAndDetailDto,
  LocaleWithCultureDetailDto,
  CreateTodo,
  UpdateTodo,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/api",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locales",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "cultureCode",
        type: "Query",
        schema: z.string().optional().default(null),
      },
      {
        name: "key",
        type: "Query",
        schema: z.string().optional().default(null),
      },
      {
        name: "value",
        type: "Query",
        schema: z.string().optional().default(null),
      },
    ],
    response: PaginatedResponseOfLocaleDto,
  },
  {
    method: "put",
    path: "/api/locales",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateLocaleDto,
      },
    ],
    response: z.string().uuid(),
  },
  {
    method: "patch",
    path: "/api/locales",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateLocaleDto,
      },
    ],
    response: LocalizationEntity,
  },
  {
    method: "get",
    path: "/api/locales/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: LocalizationEntity,
  },
  {
    method: "delete",
    path: "/api/locales/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locales/all-cultures",
    requestFormat: "json",
    response: z.array(CultureCodeAndDetailDto),
  },
  {
    method: "get",
    path: "/api/locales/culture/:code",
    requestFormat: "json",
    parameters: [
      {
        name: "code",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: LocaleWithCultureDetailDto,
  },
  {
    method: "get",
    path: "/api/todos",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "put",
    path: "/api/todos",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ content: z.string() }).strict().passthrough(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/todos/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/todos/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/todos/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateTodo,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
