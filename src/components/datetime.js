import dayjs from "dayjs"

export function toDisplay(iso) {
    if (!iso) return "";
    return dayjs(iso).format("YYYY-MM-DD HH:mm");
}

export function toInputValue(iso) {
    if (!iso) return "";
    return dayjs(iso).format("YYYY-MM-DDTHH:mm");
}

export function toApiValue(inputValue) {
    if (!inputValue) return null;
    return dayjs(inputValue).toISOString();
}