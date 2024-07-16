export type Message = {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
};
