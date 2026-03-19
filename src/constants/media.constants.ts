enum MediaTypes {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    DOCUMENT = "DOCUMENT",
    ARCHIVE = "ARCHIVE",
    OTHER = "OTHER ",
}

enum MediaAccess {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}

enum MediaStatus {
    UPLOADING = "UPLOADING",
    READY = "READY",
    STALE = "STALE",
}
const MAX_IMAGE_SIZE = 3000; // 3MB
const MAX_VIDEO_SIZE = 5 * 1024 * 1024 * 1024; // 5GB

const CHAT_MAX_DOCUMENT_SIZE = 100 * 1024 * 1024; // 100MB;
const CHAT_MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB;
const CHAT_MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB;

export {
    MediaTypes,
    MediaAccess,
    MediaStatus,
    MAX_IMAGE_SIZE,
    MAX_VIDEO_SIZE,
    CHAT_MAX_DOCUMENT_SIZE,
    CHAT_MAX_IMAGE_SIZE,
    CHAT_MAX_VIDEO_SIZE,
};
