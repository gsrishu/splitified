export const httpStatusCode = {
    success: {
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
    },
    redirect: {
      MOVED_PERMANENTLY: 301,
      FOUND: 302,
      SEE_OTHER: 303,
      TEMPORARY_REDIRECT: 307,
      PERMANENT_REDIRECT: 308,
    },
    clientError: {
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      METHOD_NOT_ALLOWED: 405,
      CONFLICT: 409,
      UNPROCESSABLE_ENTITY: 422,
    },
    serverError: {
      INTERNAL_SERVER_ERROR: 500,
      NOT_IMPLEMENTED: 501,
      BAD_GATEWAY: 502,
      SERVICE_UNAVAILABLE: 503,
      GATEWAY_TIMEOUT: 504,
    },
  };
  