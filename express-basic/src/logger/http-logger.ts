import { morganStream } from "@logger";
import type { Request, Response } from "express";
import morgan from "morgan";

export const httpLogger = morgan(
  (tokens, req: Request, res: Response): string => {
    const logPayload = {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseInt(tokens.status(req, res) ?? "0", 10),
      content_length: tokens.res(req, res, "content-length") ?? undefined,
      response_time_ms: Number.parseFloat(
        tokens["response-time"](req, res) ?? "0",
      ),
      user_agent: tokens["user-agent"](req, res),
      ip: req.ip,
    };

    return JSON.stringify(logPayload);
  },
  { stream: morganStream },
);
