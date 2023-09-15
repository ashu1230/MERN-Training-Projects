export const AppConstants = {
  SCHEMA: {
    NOTE_SCHEMA: "notes",
    USER_SCHEMA: "users",
    ROLE_SCHEMA: "roles",
    PERMISSION_SCHEMA: "permissions",
  },
  STATUS_CODE: {
    SUCCESS: 200,
    SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    RESOURCE_NOT_FOUND: 404,
  },
  ROUTES: {
    NOTES: {
      ADD: "/add-note",
      GET_ALL_NOTES: "/all-notes",
    },
  },
};
export const NOTE_ROUTES = AppConstants.ROUTES.NOTES;
export const SCHEMA = AppConstants.SCHEMA;
export const STATUS_CODES = AppConstants.STATUS_CODE;
