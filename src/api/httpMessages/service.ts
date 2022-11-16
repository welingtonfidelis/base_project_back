import { HttpMessageEnum } from "../../shared/enum/httpMessage";

const httpMessageService = {
  listHttpMessagesService() {
    return Object.values(HttpMessageEnum);
  },
};

export { httpMessageService };
