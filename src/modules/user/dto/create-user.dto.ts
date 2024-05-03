export class CreateUserDto {
  username: string;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  followers?: string[];
  following?: string[];
}
