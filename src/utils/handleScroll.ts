export const checkIfScrolledToBottom = (container: any) => {
    let subtractingResult =
        Math.round(container?.scrollHeight) - Math.round(container?.scrollTop);
    subtractingResult = Math.round(subtractingResult);
    if (
        subtractingResult - Math.round(container?.clientHeight) == 0 ||
        (subtractingResult - Math.round(container?.clientHeight) <= 1 &&
            subtractingResult - Math.round(container?.clientHeight) >= -1)
    ) {
        return true;
    }
    return false;
};

export const handleScroll = (
    e: React.UIEvent<HTMLElement, UIEvent>,
    Data: any,
    isLoading: boolean,
    hasNextPage: boolean,
    fetchNextPage: () => void,
) => {
    if (e.target && Data && Data.length) {
        if (checkIfScrolledToBottom(e.target) && !isLoading && hasNextPage) {
            fetchNextPage();
        }
    }
};
