import { CHATAGENT_TYPE } from '@/constant/enum';
import { StoreTypes } from '@/zustand/slice/workbench/chat-agent';
import { useAgent } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { v4 } from 'uuid';

interface MutationParams {
  session_id: string | null;
  agent: (typeof CHATAGENT_TYPE)[keyof typeof CHATAGENT_TYPE];
  response: string | number | number[] | null;
}

export const useAgentChat = (storeType: StoreTypes) => {
  const addUserMessage = useAgent((state) => state.addUserMessage);
  const setSessionId = useAgent((state) => state.setSessionId);
  const addAgentMessage = useAgent((state) => state.addAgentMessage);
  const appendAgentMessage = useAgent((state) => state.appendAgentMessage);
  const setAgentMessageOption = useAgent(
    (state) => state.setAgentMessageOption
  );
  const addAgentMessageOptions = useAgent(
    (state) => state.addAgentMessageOptions
  );
  const setAgentMessageHTMLContent = useAgent(
    (state) => state.setAgentMessageHTMLContent
  );
  const appendAgentMessageOption = useAgent(
    (state) => state.appendAgentMessageOption
  );

  const fetchChatResponse = async (
    params: MutationParams
  ): Promise<ReadableStream<Uint8Array>> => {
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}v2/agent`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error('An error occurred while sending the message');
    }

    const body = res.body;
    if (!body) {
      throw new Error('An error occurred while sending the message');
    }

    return body;
  };

  const handleStream = async (
    body: ReadableStream<Uint8Array>,
    variables: MutationParams
  ) => {
    const userMessageId = v4();
    if (typeof variables.response === 'string')
      addUserMessage(userMessageId, storeType, variables.response);

    const reader = body.pipeThrough(new TextDecoderStream()).getReader();
    let agentMessageId = '';
    let isNewAgentMessage = false;
    let isOptionListStart = false;
    let optionId = '';

    const processLine = (line: string, previousLine: string | undefined) => {
      if (isNewAgentMessage) {
        agentMessageId = v4();
        addAgentMessage(agentMessageId, storeType, '');
        isNewAgentMessage = false;
      }
      console.log(previousLine);
      if (previousLine?.startsWith('event: session_id')) {
        const sessionId = line.replace('data: ', '').replace(/"/g, '').trim();
        setSessionId(storeType, sessionId);
      } else if (previousLine?.startsWith('event: data')) {
        const data = line.slice(5);
        if (data) {
          const parsedData = JSON.parse(data);
          if (isOptionListStart) {
            appendAgentMessageOption(
              agentMessageId,
              optionId,
              storeType,
              parsedData
            );
          } else {
            appendAgentMessage(agentMessageId, storeType, parsedData);
          }
        }
      } else if (line.startsWith('event: new_message')) {
        isNewAgentMessage = true;
      } else if (previousLine?.startsWith('event: option_list_start')) {
        isOptionListStart = true;
        const listType = line.slice(5).trim();
        setAgentMessageOption(
          agentMessageId,
          storeType,
          listType === 'multi_selection' ? 'multi' : 'single'
        );
      } else if (line.trim() === 'event: option') {
        optionId = v4();
        addAgentMessageOptions(agentMessageId, storeType, {
          label: '',
          id: optionId,
        });
      } else if (line.startsWith('event: option_list_end')) {
        isOptionListStart = false;
      } else if (previousLine?.startsWith('event: html')) {
        const parsedData = JSON.parse(line.slice(5));
        setAgentMessageHTMLContent(agentMessageId, storeType, parsedData);
      }
    };

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const lines = value.split('\n');
      lines.forEach((line, index) => processLine(line, lines[index - 1]));
    }
  };

  return useMutation<ReadableStream<Uint8Array>, Error, MutationParams>({
    mutationFn: fetchChatResponse,
    onSuccess: handleStream,
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};
