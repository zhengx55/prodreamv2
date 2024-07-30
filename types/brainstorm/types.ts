export type MaterialItem = {
  id: string;
  user_id: string;
  student_id: string;
  title: string;
  content: string;
  deleted: boolean;
  create_time: string;
  update_time: string;
};

export type MaterialListRes = {
  total_page_count: number;
  data: MaterialItem[];
};
