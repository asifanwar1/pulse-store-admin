enum NotificationStatus {
    READ = "READ",
    UNREAD = "UNREAD",
}

enum NotificationEntityType {
    NewProject = "NEW_PROJECT_REQUEST_ASSIGN_INSTALLER",
    InstallationComplete = "INSTALLATION_COMPLETE_SUPER_ADMIN",
    ExperienceUpdated = "EXPERIENCE_UPDATED",
    CertificationUpdated = "CERTIFICATION_UPDATED",
    QuoteAccepted = "QUOTE_ACCEPTED",
    QuoteRejected = "QUOTE_REJECTED",
}

export { NotificationStatus, NotificationEntityType };
