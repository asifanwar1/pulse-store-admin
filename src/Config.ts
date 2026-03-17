export type TConfigType = {
    LIMIT: number;
    API_URL: string;
    PERSIST_SECRET_KEY: string;
};

const Config: TConfigType = {
    PERSIST_SECRET_KEY: "!!PULS3_STOR3_@DMIN!!",
    LIMIT: import.meta.env.VITE_LIMIT,
    API_URL: import.meta.env.VITE_API_URL,
};

export default Config;
