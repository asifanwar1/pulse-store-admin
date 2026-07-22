enum NotificationEntityType {
    ORDER = "order",
    SUPPORT_TICKET = "support_ticket",
}

enum NotificationType {
    ORDER_STATUS_CHANGED = "order_status_changed",
    NEW_ORDER = "new_order",
    SUPPORT_TICKET_CREATED = "support_ticket_created",
    SUPPORT_TICKET_RESOLVED = "support_ticket_resolved",
    WALLET_PAYMENT_SUCCEEDED = "wallet_payment_succeeded",
    WALLET_PAYMENT_FAILED = "wallet_payment_failed",
}

export { NotificationEntityType, NotificationType };
