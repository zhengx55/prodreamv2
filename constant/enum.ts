export enum OperationType {
  Replace,
  Insert,
  Regenerate,
  Close,
}

export enum PAGESIZE {
  MATERIAL_PAGE_SIZE = 20,
  MATERIAL_MODAL_PAGE_SIZE = 6,
}

export enum NAVGATION_LINK {
  BRAINSTORMING = '/brainstorming',
  OUTLINE = '/outline',
  DRAFT = '/draft',
}

export enum CHATAGENT_NAME {
  MAX = 'max',
}

export enum CHATAGENT_TYPE {
  INITIAL = 'max_first_chat',
  REGULAR = 'max_chat',
  BS = 'brainstorming_introduce',
  BSBASE = 'base_brainstorming',
  BSADVANCE = 'advance_brainstorming',
  OL = 'outline_introduce',
  OLGEN = 'generate_outline',
  PLPOL = 'polish_outline',
  DR = 'draft_introduce',
}
