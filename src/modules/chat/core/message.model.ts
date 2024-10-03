export type Message = {
  id: Identifier;
  content: string;
  author: {
    id: Identifier;
    name: string;
    avatar: string;
  };
};
