export interface Draft {
  id: string;
  status: number;
  create_time: number;
  update_time: number;
  user_id: string;
  material_ids: string[];
  prompt_id: string;
  outline_id: string;
  title: string;
  html: string;
  content: string;
}

export interface DarftRes {
  data: Draft[];
  total_page_count: number;
}
