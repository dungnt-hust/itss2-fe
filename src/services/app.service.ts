import { AuthService } from "./auth.service"
import { ChatService } from "./chat.service"
import { FileService } from "./file.service"
import { UserService } from "./user.service"

export const Service = {
  auth: new AuthService(),
  user: new UserService(),
  chat: new ChatService(),
  file: new FileService()
}

