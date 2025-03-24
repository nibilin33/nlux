import {PropsWithChildren, ReactElement, useMemo} from 'react';
import {LoaderComp} from '../../components/Loader/LoaderComp';
import {AiChatUI, AiChatUIOverrides} from '../AiChatUI';
import {CancelIconComp} from '../../components/CancelIcon/CancelIconComp';

export const useUiOverrides = (props: PropsWithChildren): AiChatUIOverrides => {
    const possibleUiOverrides: Array<ReactElement> = useMemo(() => {
        if (!props.children) {
            return [];
        }

        return Array.isArray(props.children) ? props.children : [props.children];
    }, [props.children]);

    const Loader: ReactElement = useMemo(() => {
        if (possibleUiOverrides.length === 0) {
            return <LoaderComp/>;
        }

        const loaderOverride = possibleUiOverrides
            .find((child) => child.type === AiChatUI.Loader);
        return loaderOverride || <LoaderComp/>;
    }, [possibleUiOverrides]);

    const Greeting: ReactElement | undefined = useMemo(() => {
        if (possibleUiOverrides.length === 0) {
            return undefined;
        }

        return possibleUiOverrides
            .find((child) => child.type === AiChatUI.Greeting);
    }, [possibleUiOverrides]);

    const Tool: ReactElement | undefined = useMemo(() => {
        if (possibleUiOverrides.length === 0) {
            return undefined;
        }   
        return possibleUiOverrides
            .find((child) => child.type === AiChatUI.Tool);
    }, [possibleUiOverrides]);

    const ToolBottom: ReactElement | undefined = useMemo(() => {
        if (possibleUiOverrides.length === 0) {
            return undefined;
        }

        return possibleUiOverrides
            .find((child) => child.type === AiChatUI.ToolBottom);
    }, [possibleUiOverrides]);

    const CancelButton: ReactElement | undefined = useMemo(() => {
        if (possibleUiOverrides.length === 0) {
            return undefined;
        }   
        const cancelButtonOverride = possibleUiOverrides
            .find((child) => child.type === AiChatUI.CancelButton);
        return cancelButtonOverride;
    }, [possibleUiOverrides]);

    return {
        Loader,
        Greeting,
        Tool,
        ToolBottom,
        CancelButton
    };
};
