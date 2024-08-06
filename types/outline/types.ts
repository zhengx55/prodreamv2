export type OutlineItem = {
  create_time: number; // Unix timestamp
  update_time: number; // Unix timestamp
  user_id: string;
  material_ids: string[];
  prompt_id: string;
  title: string;
  content: string;
  connect_idea: string | null;
  id: string;
  status: number;
};

export type OutlineRes = {
  data: [OutlineItem];
  total_page_count: number;
};

export type Prompt = {
  id: string;
  title: string;
  content: string;
};
