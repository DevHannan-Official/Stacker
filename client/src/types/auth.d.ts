interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: {
    url: string;
    publicId: string;
    oAuthAvatar: string;
  };
  verified: boolean;
}
