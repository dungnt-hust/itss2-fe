export enum REST_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DEL = "DEL",
}

export const api = {
  auth: {
    getNonce: "/auth/get-nonce/",
    login: "/auth/login/",
    register: "/auth/register"
  },
  chat: {
    chatList: "/chat/list",
    groupList: "/group/list/",
    chat: "/chat/chat",
    groupGet: "/group/get",
    delete: "/chat/delete/",
    edit: "/chat/edit",
  },
  file: {
    upload: "/auth/upload",
  },
}
