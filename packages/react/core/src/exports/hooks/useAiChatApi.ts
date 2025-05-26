import {useRef} from 'react';

/**
 * AiChat API methods.
 */
export type AiChatApi = {
    /**
     * API methods related to sending messages.
     */
    composer: {
        sendbtn: () => void;
        fill: (message: string) => void;
        /**
         * Types the message in the composer and sends it to the chat adapter automatically.
         *
         * @param {string} prompt
         */
        send: (prompt: string) => void;

        /**
         * Cancel the request being sent.
         * If a message is being sent, it will be cancelled.
         * If a message is being generated (in streaming mode), the generation will stop and the message will deleted.
         * If no message is being sent, this method does nothing.
         */
        cancel: () => void;
    },
    /**
     * API methods related to the conversation.
     */
    conversation: {
        /**
         * Reset the conversation.
         */
        reset: () => void;
    }
};

export type AiChatInternalApi = AiChatApi & {
    __setHost: (host: AiChatHost) => void;
    __unsetHost: () => void;
    __getHost: () => AiChatHost;
};

export type AiChatHost = {
    sendMessage: (prompt: string) => void;
    fillMessage: (message: string) => void;
    resetConversation: () => void;
    sendbtn: () => void;
    cancelLastMessageRequest: () => void;
};

const createVoidInternalApi = (setHost: (host: AiChatHost) => void = () => {
}): AiChatInternalApi => {
    return {
        composer: {
            sendbtn: () => {
                throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
            },
            send: (prompt: string) => {
                throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
            },
            cancel: () => {
                throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
            },
            fill: (message: string) => {
                throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
            },
        },

        conversation: {
            reset: () => {
                throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
            },
        },

        // @ts-ignore
        __setHost: (host: AiChatApiHost) => {
            setHost(host);
        },

        // @ts-ignore
        __unsetHost: () => {
            // Do nothing
        },
        // @ts-ignore
        __getHost: () => {
            // Do nothing
        },
    };
};

/**
 * Hook to get the AiChat API reference.
 *
 * @returns {AiChatApi}
 */
export const useAiChatApi = (): AiChatApi => {
    const currentHost = useRef<AiChatHost | null>(null);
    const api = useRef<AiChatInternalApi>(createVoidInternalApi());

    api.current.composer.send = (prompt: string) => {
        if (!currentHost.current) {
            throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
        }

        currentHost.current.sendMessage(prompt);
    };

    api.current.composer.cancel = () => {
        if (!currentHost.current) {
            throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
        }

        currentHost.current.cancelLastMessageRequest();
    };
    api.current.composer.fill = (message: string) => {
        if (!currentHost.current) {
            throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
        }
        currentHost.current.fillMessage(message);
    }
    api.current.conversation.reset = () => {
        if (!currentHost.current) {
            throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
        }

        currentHost.current.resetConversation();
    };
    api.current.composer.sendbtn = () => {
        if (!currentHost.current) {
            throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
        }
        currentHost.current.sendbtn();
    };
    // @ts-ignore
    api.current.__setHost = (host: AiChatHost) => {
        currentHost.current = host;
    };

    // @ts-ignore
    api.current.__unsetHost = () => {
        currentHost.current = null;
    };
    // @ts-ignore
    api.current.__getHost = () => {
        if (!currentHost.current) {
            throw new Error('AiChatApi is not connected to a host <AiChat /> component.');
        }
        return currentHost.current;
    };
    return api.current;
};
