export type EssayItem = {
  id: string;
  user_id: string;
  student_id: string;
  prompt_id: string;
  material_ids: [string];
  title: string;
  results: [string];
  state: string;
  deleted: true;
  create_time: string;
  update_time: string;
};

export type EssaysRes = {
  data: [EssayItem];
  total_page_count: number;
};
