import { Request, Response } from "express";

import { httpMessageService } from "./service";

const { listHttpMessagesService } = httpMessageService;

const httpMessageController = {
  list(req: Request, res: Response) {
    const httpMessages = listHttpMessagesService();

    return res.json(httpMessages);
  },
};

export { httpMessageController };
