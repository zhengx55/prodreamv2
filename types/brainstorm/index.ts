export type MaterialItem = {
  id: string;
  user_id: string;
  student_id: string;
  title: string;
  content: string;
  deleted: boolean;
  create_time: number;
  update_time: number;
  theme: ThemeType;
};

export type MaterialListRes = {
  total_page_count: number;
  data: MaterialItem[];
};

export type ThemeType = {
  id: string;
  title: string;
  description: string;
  example: string;
};
