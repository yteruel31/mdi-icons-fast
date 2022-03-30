import { UserDto } from "./user.dto";

export interface IconDto {
  id: string;
  name: string;
  aliases: string[];
  data: string;
  user: UserDto;
  commentCount: number;
}
