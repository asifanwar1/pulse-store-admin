export type TMediaUploadResponse = {
    id: string;
    url: string;
    file_name?: string | null;
    bucket: string;
    path: string;
};
