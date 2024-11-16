import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserIcon = ({
  src,
  username,
  className,
}: {
  src?: string;
  username: string;
  className?: string;
}) => {
  return (
    <Avatar className={`${className}`}>
      <AvatarImage
        src={src ? `data:image/png;base64,${src}` : "/userIcon.png"}
      />
      <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserIcon;
