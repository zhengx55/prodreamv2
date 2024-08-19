export enum OperationType {
  Replace,
  Insert,
  Regenerate,
  Close,
}

export enum PAGESIZE {
  MATERIAL_PAGE_SIZE = 20,
  MATERIAL_MODAL_PAGE_SIZE = 6,
  CHAT_MODAL_PAGE_SIZE = 9,
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

export enum CHATDATA {
  AGENT = 'agent',
  REFRESH_LIB = 'refresh_lib',
  MATERIAL_INPUT = 'material_input',
  GO_BRAINSTORMING = 'go_brainstorming',
  GO_OUTLINE = 'go_outline',
  GO_DRAFT = 'go_draft',
  GENERATE_OUTLINE_POPUP_UI = 'generate_outline_popup_ui',
  POLISH_OUTLINE_POPUP_UI = 'polish_outline_popup_ui',
  GENERATE_DRAFT_POPUP_UI = 'generate_draft_popup_ui',
  AI_DETECT = 'ai_detect',
  GRAMMAR_CHECK = 'grammar_check',
  PLAGIARISM_CHECK = 'plagiarism_check',
}

export enum CHATEVENT {
  SESSION_ID = 'event: session_id',
  CLIENT_EVENT = 'event: client_event',
  DATA = 'event: data',
  HTML = 'event: html',
  DATA_END = 'event: data_end',
  OPTION_LIST_START = 'event: option_list_start',
  OPTION = 'event: option',
  OPTION_LIST_END = 'event: option_list_end',
  NEW_MESSAGE = 'event: new_message',
  SESSION_END = 'event: session_end',
}
