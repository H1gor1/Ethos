import type { AuthUser } from "../../shared/types/authUser.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
