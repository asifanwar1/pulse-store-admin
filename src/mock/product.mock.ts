// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductStatus = "active" | "draft" | "out_of_stock" | "archived";

export interface ProductStatItem {
    value: number;
    trend: number;
    trendDirection: "up" | "down";
    prefix?: string;
    suffix?: string;
}

export interface ProductStats {
    totalProducts: ProductStatItem;
    activeProducts: ProductStatItem;
    outOfStock: ProductStatItem;
    avgPrice: ProductStatItem;
}

export interface Product {
    id: string;
    name: string;
    initials: string;
    sku: string;
    category: string;
    brand: string;
    price: number;
    costPrice: number;
    stock: number;
    status: ProductStatus;
    sales: number;
    revenue: number;
    rating: number;
    createdDate: string;
}

export interface ProductReview {
    id: string;
    customer: string;
    initials: string;
    rating: number;
    comment: string;
    date: string;
}

export interface ProductSalesTrend {
    month: string;
    sales: number;
    revenue: number;
}

export interface ProductDetailData {
    description: string;
    tags: string[];
    salesTrend: ProductSalesTrend[];
    reviews: ProductReview[];
}

// ─── Product Stats ────────────────────────────────────────────────────────────

export const productStatsData: ProductStats = {
    totalProducts: {
        value: 348,
        trend: 6.2,
        trendDirection: "up",
    },
    activeProducts: {
        value: 291,
        trend: 4.8,
        trendDirection: "up",
    },
    outOfStock: {
        value: 24,
        trend: 12.5,
        trendDirection: "down",
    },
    avgPrice: {
        value: 184,
        trend: 2.3,
        trendDirection: "up",
        prefix: "$",
    },
};

// ─── Products List ────────────────────────────────────────────────────────────

export const productsListData: Product[] = [
    {
        id: "PRD-0001",
        name: 'MacBook Pro 14"',
        initials: "MB",
        sku: "APP-MBP14-M3",
        category: "Electronics",
        brand: "Apple",
        price: 1899,
        costPrice: 1400,
        stock: 42,
        status: "active",
        sales: 184,
        revenue: 348316,
        rating: 4.9,
        createdDate: "2024-01-15",
    },
    {
        id: "PRD-0002",
        name: "Sony WH-1000XM5",
        initials: "SW",
        sku: "SNY-WH1000XM5",
        category: "Electronics",
        brand: "Sony",
        price: 349,
        costPrice: 220,
        stock: 87,
        status: "active",
        sales: 312,
        revenue: 108888,
        rating: 4.7,
        createdDate: "2024-02-08",
    },
    {
        id: "PRD-0003",
        name: 'Samsung 65" QLED',
        initials: "SQ",
        sku: "SAM-65QLED-Q80",
        category: "Electronics",
        brand: "Samsung",
        price: 1299,
        costPrice: 950,
        stock: 23,
        status: "active",
        sales: 98,
        revenue: 127302,
        rating: 4.6,
        createdDate: "2024-01-28",
    },
    {
        id: "PRD-0004",
        name: "Nike Air Max 270",
        initials: "NA",
        sku: "NKE-AM270-BLK",
        category: "Sports",
        brand: "Nike",
        price: 149,
        costPrice: 78,
        stock: 156,
        status: "active",
        sales: 428,
        revenue: 63772,
        rating: 4.5,
        createdDate: "2024-03-10",
    },
    {
        id: "PRD-0005",
        name: "Dyson V11 Vacuum",
        initials: "DV",
        sku: "DYS-V11-ABS",
        category: "Home & Garden",
        brand: "Dyson",
        price: 599,
        costPrice: 420,
        stock: 34,
        status: "active",
        sales: 156,
        revenue: 93444,
        rating: 4.8,
        createdDate: "2024-01-20",
    },
    {
        id: "PRD-0006",
        name: "Charlotte Tilbury Kit",
        initials: "CT",
        sku: "CT-BEAUTYKIT-01",
        category: "Beauty",
        brand: "Charlotte Tilbury",
        price: 128,
        costPrice: 65,
        stock: 89,
        status: "active",
        sales: 267,
        revenue: 34236,
        rating: 4.6,
        createdDate: "2024-02-14",
    },
    {
        id: "PRD-0007",
        name: "iPhone 16 Pro Max",
        initials: "IP",
        sku: "APP-IP16PM-256",
        category: "Electronics",
        brand: "Apple",
        price: 1199,
        costPrice: 880,
        stock: 3,
        status: "active",
        sales: 241,
        revenue: 288759,
        rating: 4.9,
        createdDate: "2024-09-20",
    },
    {
        id: "PRD-0008",
        name: "PS5 Console",
        initials: "PS",
        sku: "SNY-PS5-DISC",
        category: "Electronics",
        brand: "Sony",
        price: 499,
        costPrice: 410,
        stock: 5,
        status: "active",
        sales: 189,
        revenue: 94311,
        rating: 4.8,
        createdDate: "2024-11-12",
    },
    {
        id: "PRD-0009",
        name: "Levi's 501 Jeans",
        initials: "LJ",
        sku: "LEV-501-BLK-32",
        category: "Clothing",
        brand: "Levi's",
        price: 89,
        costPrice: 42,
        stock: 0,
        status: "out_of_stock",
        sales: 376,
        revenue: 33464,
        rating: 4.4,
        createdDate: "2024-04-05",
    },
    {
        id: "PRD-0010",
        name: "Yoga Mat Pro",
        initials: "YM",
        sku: "SPT-YOGAMAT-PRO",
        category: "Sports",
        brand: "Manduka",
        price: 89,
        costPrice: 38,
        stock: 8,
        status: "active",
        sales: 214,
        revenue: 19046,
        rating: 4.6,
        createdDate: "2024-05-18",
    },
    {
        id: "PRD-0011",
        name: "Instant Pot Duo 7-in-1",
        initials: "IP",
        sku: "INS-DUO7-6QT",
        category: "Home & Garden",
        brand: "Instant Pot",
        price: 99,
        costPrice: 55,
        stock: 0,
        status: "out_of_stock",
        sales: 302,
        revenue: 29898,
        rating: 4.7,
        createdDate: "2024-06-02",
    },
    {
        id: "PRD-0012",
        name: "Kindle Paperwhite",
        initials: "KP",
        sku: "AMZ-KPW-11GEN",
        category: "Electronics",
        brand: "Amazon",
        price: 139,
        costPrice: 88,
        stock: 61,
        status: "active",
        sales: 198,
        revenue: 27522,
        rating: 4.5,
        createdDate: "2024-07-14",
    },
    {
        id: "PRD-0013",
        name: "Dyson Airwrap",
        initials: "DA",
        sku: "DYS-AWR-MUL-CUR",
        category: "Beauty",
        brand: "Dyson",
        price: 599,
        costPrice: 430,
        stock: 19,
        status: "active",
        sales: 132,
        revenue: 79068,
        rating: 4.8,
        createdDate: "2024-03-22",
    },
    {
        id: "PRD-0014",
        name: "Garden Tool Set",
        initials: "GT",
        sku: "GDN-TOOLSET-12PC",
        category: "Home & Garden",
        brand: "Fiskars",
        price: 229,
        costPrice: 120,
        stock: 0,
        status: "out_of_stock",
        sales: 87,
        revenue: 19923,
        rating: 4.3,
        createdDate: "2024-04-30",
    },
    {
        id: "PRD-0015",
        name: "AirPods Pro (2nd Gen)",
        initials: "AP",
        sku: "APP-APPRO-2GEN",
        category: "Electronics",
        brand: "Apple",
        price: 249,
        costPrice: 170,
        stock: 73,
        status: "active",
        sales: 285,
        revenue: 70965,
        rating: 4.8,
        createdDate: "2024-09-12",
    },
    {
        id: "PRD-0016",
        name: "Fjällräven Kånken",
        initials: "FK",
        sku: "FJL-KNK-23510",
        category: "Clothing",
        brand: "Fjällräven",
        price: 110,
        costPrice: 58,
        stock: 44,
        status: "draft",
        sales: 0,
        revenue: 0,
        rating: 0,
        createdDate: "2026-03-30",
    },
];

// ─── Product Details Map ──────────────────────────────────────────────────────

export const productDetailsMap: Record<string, ProductDetailData> = {
    "PRD-0001": {
        description:
            "The MacBook Pro 14-inch featuring the M3 chip delivers exceptional performance for professionals. With a Liquid Retina XDR display, up to 22 hours of battery life, and a powerful GPU, it handles demanding workloads with ease.",
        tags: ["laptop", "apple", "m3", "pro", "work"],
        salesTrend: [
            { month: "Jan", sales: 12, revenue: 22788 },
            { month: "Feb", sales: 18, revenue: 34182 },
            { month: "Mar", sales: 14, revenue: 26586 },
            { month: "Apr", sales: 22, revenue: 41778 },
            { month: "May", sales: 27, revenue: 51273 },
            { month: "Jun", sales: 19, revenue: 36081 },
            { month: "Jul", sales: 21, revenue: 39879 },
            { month: "Aug", sales: 16, revenue: 30384 },
            { month: "Sep", sales: 11, revenue: 20889 },
            { month: "Oct", sales: 9, revenue: 17091 },
            { month: "Nov", sales: 8, revenue: 15192 },
            { month: "Dec", sales: 7, revenue: 13293 },
        ],
        reviews: [
            { id: "REV-001", customer: "Alex Johnson", initials: "AJ", rating: 5, comment: "Absolutely incredible performance. Handles video editing like a breeze.", date: "2026-04-05" },
            { id: "REV-002", customer: "Michael Chen", initials: "MC", rating: 5, comment: "Best laptop I've ever owned. Battery life is phenomenal.", date: "2026-03-20" },
            { id: "REV-003", customer: "Emma Davis", initials: "ED", rating: 4, comment: "Great machine, slightly pricey but worth it for serious work.", date: "2026-03-08" },
        ],
    },
    "PRD-0002": {
        description:
            "The Sony WH-1000XM5 sets the benchmark for noise-cancelling headphones with 8 mics, industry-leading ANC, 30-hour battery life, and crystal-clear call quality in a lightweight foldable design.",
        tags: ["headphones", "sony", "noise-cancelling", "wireless", "audio"],
        salesTrend: [
            { month: "Jan", sales: 21, revenue: 7329 },
            { month: "Feb", sales: 28, revenue: 9772 },
            { month: "Mar", sales: 24, revenue: 8376 },
            { month: "Apr", sales: 34, revenue: 11866 },
            { month: "May", sales: 41, revenue: 14309 },
            { month: "Jun", sales: 36, revenue: 12564 },
            { month: "Jul", sales: 31, revenue: 10819 },
            { month: "Aug", sales: 27, revenue: 9423 },
            { month: "Sep", sales: 22, revenue: 7678 },
            { month: "Oct", sales: 18, revenue: 6282 },
            { month: "Nov", sales: 16, revenue: 5584 },
            { month: "Dec", sales: 14, revenue: 4886 },
        ],
        reviews: [
            { id: "REV-004", customer: "Noah Martinez", initials: "NM", rating: 5, comment: "The noise cancellation is unreal. Perfect for open-plan offices.", date: "2026-04-02" },
            { id: "REV-005", customer: "Ava Thompson", initials: "AT", rating: 5, comment: "Best headphones on the market. Incredibly comfortable for long sessions.", date: "2026-03-15" },
            { id: "REV-006", customer: "Liam Anderson", initials: "LA", rating: 4, comment: "Excellent sound quality. The touch controls take some getting used to.", date: "2026-02-28" },
        ],
    },
    "PRD-0003": {
        description:
            "Samsung's 65-inch QLED TV with Quantum HDR technology, 120Hz refresh rate, and a built-in No Gap Wall-Mount solution delivers a stunning cinematic experience in your living room.",
        tags: ["tv", "samsung", "qled", "4k", "smart-tv"],
        salesTrend: [
            { month: "Jan", sales: 6, revenue: 7794 },
            { month: "Feb", sales: 9, revenue: 11691 },
            { month: "Mar", sales: 7, revenue: 9093 },
            { month: "Apr", sales: 12, revenue: 15588 },
            { month: "May", sales: 15, revenue: 19485 },
            { month: "Jun", sales: 11, revenue: 14289 },
            { month: "Jul", sales: 10, revenue: 12990 },
            { month: "Aug", sales: 8, revenue: 10392 },
            { month: "Sep", sales: 7, revenue: 9093 },
            { month: "Oct", sales: 6, revenue: 7794 },
            { month: "Nov", sales: 4, revenue: 5196 },
            { month: "Dec", sales: 3, revenue: 3897 },
        ],
        reviews: [
            { id: "REV-007", customer: "James Wilson", initials: "JW", rating: 5, comment: "Picture quality is breathtaking. The QLED panel is vibrant and sharp.", date: "2026-04-03" },
            { id: "REV-008", customer: "Sophia Garcia", initials: "SG", rating: 4, comment: "Great TV, setup was straightforward. Smart features work flawlessly.", date: "2026-03-22" },
        ],
    },
    "PRD-0004": {
        description:
            "The Nike Air Max 270 features the tallest Air unit yet for max cushioning and comfort. Its breathable mesh upper and modern design make it ideal for all-day wear and light athletic activity.",
        tags: ["shoes", "nike", "running", "air-max", "sports"],
        salesTrend: [
            { month: "Jan", sales: 32, revenue: 4768 },
            { month: "Feb", sales: 41, revenue: 6109 },
            { month: "Mar", sales: 35, revenue: 5215 },
            { month: "Apr", sales: 52, revenue: 7748 },
            { month: "May", sales: 61, revenue: 9089 },
            { month: "Jun", sales: 48, revenue: 7152 },
            { month: "Jul", sales: 44, revenue: 6556 },
            { month: "Aug", sales: 37, revenue: 5513 },
            { month: "Sep", sales: 30, revenue: 4470 },
            { month: "Oct", sales: 24, revenue: 3576 },
            { month: "Nov", sales: 14, revenue: 2086 },
            { month: "Dec", sales: 10, revenue: 1490 },
        ],
        reviews: [
            { id: "REV-009", customer: "Sarah Williams", initials: "SW", rating: 4, comment: "Super comfortable shoes. Great for daily use, though run slightly large.", date: "2026-04-05" },
            { id: "REV-010", customer: "Ethan Jackson", initials: "EJ", rating: 5, comment: "Love these shoes. The cushioning is exceptional for long walks.", date: "2026-03-29" },
            { id: "REV-011", customer: "Olivia Brown", initials: "OB", rating: 4, comment: "Stylish and comfortable. Would definitely buy again.", date: "2026-03-10" },
        ],
    },
    "PRD-0005": {
        description:
            "The Dyson V11 cordless vacuum cleaner automatically optimises suction and run time, with three power modes. The LCD screen shows real-time performance reporting and a countdown to the end of run time.",
        tags: ["vacuum", "dyson", "cordless", "cleaning", "home"],
        salesTrend: [
            { month: "Jan", sales: 11, revenue: 6589 },
            { month: "Feb", sales: 14, revenue: 8386 },
            { month: "Mar", sales: 12, revenue: 7188 },
            { month: "Apr", sales: 17, revenue: 10183 },
            { month: "May", sales: 21, revenue: 12579 },
            { month: "Jun", sales: 18, revenue: 10782 },
            { month: "Jul", sales: 15, revenue: 8985 },
            { month: "Aug", sales: 13, revenue: 7787 },
            { month: "Sep", sales: 10, revenue: 5990 },
            { month: "Oct", sales: 9, revenue: 5391 },
            { month: "Nov", sales: 8, revenue: 4792 },
            { month: "Dec", sales: 8, revenue: 4792 },
        ],
        reviews: [
            { id: "REV-012", customer: "Isabella White", initials: "IW", rating: 5, comment: "Incredible suction power. Makes cleaning so much faster and easier.", date: "2026-03-18" },
            { id: "REV-013", customer: "Alex Johnson", initials: "AJ", rating: 5, comment: "Worth every penny. Battery life is great for whole-home cleaning.", date: "2026-02-24" },
        ],
    },
    "PRD-0006": {
        description:
            "The Charlotte Tilbury Beauty Kit includes her iconic bestsellers—Charlotte's Magic Cream, Pillow Talk lipstick, and Eyes to Mesmerise. A curated edit for effortlessly beautiful skin and a radiant glow.",
        tags: ["beauty", "makeup", "skincare", "gift", "luxury"],
        salesTrend: [
            { month: "Jan", sales: 18, revenue: 2304 },
            { month: "Feb", sales: 26, revenue: 3328 },
            { month: "Mar", sales: 22, revenue: 2816 },
            { month: "Apr", sales: 31, revenue: 3968 },
            { month: "May", sales: 38, revenue: 4864 },
            { month: "Jun", sales: 33, revenue: 4224 },
            { month: "Jul", sales: 28, revenue: 3584 },
            { month: "Aug", sales: 24, revenue: 3072 },
            { month: "Sep", sales: 21, revenue: 2688 },
            { month: "Oct", sales: 19, revenue: 2432 },
            { month: "Nov", sales: 14, revenue: 1792 },
            { month: "Dec", sales: 13, revenue: 1664 },
        ],
        reviews: [
            { id: "REV-014", customer: "Ava Thompson", initials: "AT", rating: 5, comment: "The magic cream alone is worth it. My skin has never looked better.", date: "2026-04-02" },
            { id: "REV-015", customer: "Emma Davis", initials: "ED", rating: 5, comment: "Perfect gift set. High quality products with lovely packaging.", date: "2026-03-14" },
            { id: "REV-016", customer: "Sophia Garcia", initials: "SG", rating: 4, comment: "Great products, though a bit pricey. The Pillow Talk lipstick is a must-have.", date: "2026-02-20" },
        ],
    },
    "PRD-0007": {
        description:
            "iPhone 16 Pro Max features the A18 Pro chip, a 6.9-inch Super Retina XDR display with ProMotion, a 48MP Fusion camera, and up to 33 hours of video playback.",
        tags: ["iphone", "apple", "smartphone", "5g", "pro"],
        salesTrend: [
            { month: "Jan", sales: 14, revenue: 16786 },
            { month: "Feb", sales: 21, revenue: 25179 },
            { month: "Mar", sales: 17, revenue: 20383 },
            { month: "Apr", sales: 30, revenue: 35970 },
            { month: "May", sales: 38, revenue: 45562 },
            { month: "Jun", sales: 32, revenue: 38368 },
            { month: "Jul", sales: 28, revenue: 33572 },
            { month: "Aug", sales: 24, revenue: 28776 },
            { month: "Sep", sales: 20, revenue: 23980 },
            { month: "Oct", sales: 17, revenue: 20383 },
            { month: "Nov", sales: 12, revenue: 14388 },
            { month: "Dec", sales: 8, revenue: 9592 },
        ],
        reviews: [
            { id: "REV-017", customer: "Noah Martinez", initials: "NM", rating: 5, comment: "Camera system is unbelievable. Best smartphone I have ever used.", date: "2026-04-01" },
            { id: "REV-018", customer: "Sarah Williams", initials: "SW", rating: 5, comment: "The display is gorgeous and the battery lasts a full day with heavy use.", date: "2026-03-25" },
        ],
    },
    "PRD-0008": {
        description:
            "The PS5 features a custom SSD for ultra-fast loading, ray tracing for stunning visuals, and DualSense wireless controller with haptic feedback and adaptive triggers for immersive gameplay.",
        tags: ["gaming", "sony", "console", "ps5", "playstation"],
        salesTrend: [
            { month: "Jan", sales: 14, revenue: 6986 },
            { month: "Feb", sales: 19, revenue: 9481 },
            { month: "Mar", sales: 16, revenue: 7984 },
            { month: "Apr", sales: 22, revenue: 10978 },
            { month: "May", sales: 27, revenue: 13473 },
            { month: "Jun", sales: 24, revenue: 11976 },
            { month: "Jul", sales: 20, revenue: 9980 },
            { month: "Aug", sales: 17, revenue: 8483 },
            { month: "Sep", sales: 14, revenue: 6986 },
            { month: "Oct", sales: 11, revenue: 5489 },
            { month: "Nov", sales: 9, revenue: 4491 },
            { month: "Dec", sales: 16, revenue: 7984 },
        ],
        reviews: [
            { id: "REV-019", customer: "Ethan Jackson", initials: "EJ", rating: 5, comment: "The loading speeds are insane. Games look incredible with ray tracing.", date: "2026-03-30" },
            { id: "REV-020", customer: "Liam Anderson", initials: "LA", rating: 4, comment: "Great console, DualSense haptics are a game-changer literally.", date: "2026-03-12" },
        ],
    },
    "PRD-0009": {
        description:
            "The iconic Levi's 501 Original Jeans in a classic straight fit with the legendary button fly. Made with durable denim that only gets better with age.",
        tags: ["jeans", "denim", "levi's", "clothing", "casual"],
        salesTrend: [
            { month: "Jan", sales: 28, revenue: 2492 },
            { month: "Feb", sales: 36, revenue: 3204 },
            { month: "Mar", sales: 31, revenue: 2759 },
            { month: "Apr", sales: 44, revenue: 3916 },
            { month: "May", sales: 52, revenue: 4628 },
            { month: "Jun", sales: 45, revenue: 4005 },
            { month: "Jul", sales: 38, revenue: 3382 },
            { month: "Aug", sales: 33, revenue: 2937 },
            { month: "Sep", sales: 27, revenue: 2403 },
            { month: "Oct", sales: 22, revenue: 1958 },
            { month: "Nov", sales: 14, revenue: 1246 },
            { month: "Dec", sales: 6, revenue: 534 },
        ],
        reviews: [
            { id: "REV-021", customer: "Michael Chen", initials: "MC", rating: 4, comment: "Classic fit, great quality. These jeans last for years.", date: "2026-04-04" },
            { id: "REV-022", customer: "James Wilson", initials: "JW", rating: 5, comment: "The best basic jeans out there. I own three pairs.", date: "2026-03-17" },
        ],
    },
    "PRD-0010": {
        description:
            "The Manduka PRO Yoga Mat offers unmatched durability with a lifetime guarantee. Its dense 6mm cushioning provides superior joint protection, and the closed-cell surface prevents sweat absorption.",
        tags: ["yoga", "mat", "fitness", "sports", "wellness"],
        salesTrend: [
            { month: "Jan", sales: 15, revenue: 1335 },
            { month: "Feb", sales: 19, revenue: 1691 },
            { month: "Mar", sales: 17, revenue: 1513 },
            { month: "Apr", sales: 24, revenue: 2136 },
            { month: "May", sales: 29, revenue: 2581 },
            { month: "Jun", sales: 25, revenue: 2225 },
            { month: "Jul", sales: 21, revenue: 1869 },
            { month: "Aug", sales: 18, revenue: 1602 },
            { month: "Sep", sales: 15, revenue: 1335 },
            { month: "Oct", sales: 14, revenue: 1246 },
            { month: "Nov", sales: 11, revenue: 979 },
            { month: "Dec", sales: 6, revenue: 534 },
        ],
        reviews: [
            { id: "REV-023", customer: "Olivia Brown", initials: "OB", rating: 5, comment: "Best yoga mat I've ever bought. The grip is superb even when sweaty.", date: "2026-04-01" },
            { id: "REV-024", customer: "Sophia Garcia", initials: "SG", rating: 4, comment: "High quality mat. A bit heavy to carry around but worth it for home use.", date: "2026-03-05" },
        ],
    },
    "PRD-0011": {
        description:
            "The Instant Pot Duo 7-in-1 replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer. Cooks up to 70% faster than traditional methods.",
        tags: ["kitchen", "instant-pot", "pressure-cooker", "home", "cooking"],
        salesTrend: [
            { month: "Jan", sales: 22, revenue: 2178 },
            { month: "Feb", sales: 28, revenue: 2772 },
            { month: "Mar", sales: 24, revenue: 2376 },
            { month: "Apr", sales: 34, revenue: 3366 },
            { month: "May", sales: 41, revenue: 4059 },
            { month: "Jun", sales: 35, revenue: 3465 },
            { month: "Jul", sales: 29, revenue: 2871 },
            { month: "Aug", sales: 26, revenue: 2574 },
            { month: "Sep", sales: 21, revenue: 2079 },
            { month: "Oct", sales: 18, revenue: 1782 },
            { month: "Nov", sales: 14, revenue: 1386 },
            { month: "Dec", sales: 10, revenue: 990 },
        ],
        reviews: [
            { id: "REV-025", customer: "Sophia Garcia", initials: "SG", rating: 5, comment: "Changed my cooking routine completely. Meals in a fraction of the time.", date: "2026-04-01" },
            { id: "REV-026", customer: "Emma Davis", initials: "ED", rating: 4, comment: "Very versatile. The slow cooker function is my favourite feature.", date: "2026-03-20" },
        ],
    },
    "PRD-0012": {
        description:
            "Kindle Paperwhite features a 6.8-inch display with adjustable warm light, up to 10 weeks of battery life, and IPX8 waterproofing. Holds thousands of books in an ultra-thin, lightweight design.",
        tags: ["kindle", "ereader", "amazon", "books", "reading"],
        salesTrend: [
            { month: "Jan", sales: 14, revenue: 1946 },
            { month: "Feb", sales: 18, revenue: 2502 },
            { month: "Mar", sales: 16, revenue: 2224 },
            { month: "Apr", sales: 22, revenue: 3058 },
            { month: "May", sales: 26, revenue: 3614 },
            { month: "Jun", sales: 22, revenue: 3058 },
            { month: "Jul", sales: 19, revenue: 2641 },
            { month: "Aug", sales: 16, revenue: 2224 },
            { month: "Sep", sales: 13, revenue: 1807 },
            { month: "Oct", sales: 12, revenue: 1668 },
            { month: "Nov", sales: 10, revenue: 1390 },
            { month: "Dec", sales: 10, revenue: 1390 },
        ],
        reviews: [
            { id: "REV-027", customer: "Ethan Jackson", initials: "EJ", rating: 5, comment: "Perfect for reading anywhere. Waterproofing is great for the bath!", date: "2026-03-28" },
            { id: "REV-028", customer: "Michael Chen", initials: "MC", rating: 4, comment: "Great device. Warm light makes evening reading very comfortable.", date: "2026-03-10" },
        ],
    },
    "PRD-0013": {
        description:
            "The Dyson Airwrap multi-styler uses Coanda effect to attract, style and dry hair simultaneously. Complete with attachments for curling, waving, smoothing and volumising.",
        tags: ["hair", "dyson", "styler", "beauty", "tools"],
        salesTrend: [
            { month: "Jan", sales: 9, revenue: 5391 },
            { month: "Feb", sales: 13, revenue: 7787 },
            { month: "Mar", sales: 11, revenue: 6589 },
            { month: "Apr", sales: 16, revenue: 9584 },
            { month: "May", sales: 19, revenue: 11381 },
            { month: "Jun", sales: 16, revenue: 9584 },
            { month: "Jul", sales: 13, revenue: 7787 },
            { month: "Aug", sales: 11, revenue: 6589 },
            { month: "Sep", sales: 9, revenue: 5391 },
            { month: "Oct", sales: 8, revenue: 4792 },
            { month: "Nov", sales: 5, revenue: 2995 },
            { month: "Dec", sales: 2, revenue: 1198 },
        ],
        reviews: [
            { id: "REV-029", customer: "Ava Thompson", initials: "AT", rating: 5, comment: "Absolutely worth the investment. My hair has never looked this good.", date: "2026-03-21" },
            { id: "REV-030", customer: "Sarah Williams", initials: "SW", rating: 5, comment: "The curling attachment creates perfect, long-lasting curls every time.", date: "2026-03-02" },
        ],
    },
    "PRD-0014": {
        description:
            "Fiskars 12-Piece Garden Tool Set includes all the essentials: trowels, cultivators, weeders, and pruning shears crafted from rust-resistant stainless steel with ergonomic handles.",
        tags: ["garden", "tools", "outdoor", "fiskars", "home"],
        salesTrend: [
            { month: "Jan", sales: 5, revenue: 1145 },
            { month: "Feb", sales: 7, revenue: 1603 },
            { month: "Mar", sales: 14, revenue: 3206 },
            { month: "Apr", sales: 18, revenue: 4122 },
            { month: "May", sales: 16, revenue: 3664 },
            { month: "Jun", sales: 11, revenue: 2519 },
            { month: "Jul", sales: 8, revenue: 1832 },
            { month: "Aug", sales: 6, revenue: 1374 },
            { month: "Sep", sales: 4, revenue: 916 },
            { month: "Oct", sales: 3, revenue: 687 },
            { month: "Nov", sales: 2, revenue: 458 },
            { month: "Dec", sales: 1, revenue: 229 },
        ],
        reviews: [
            { id: "REV-031", customer: "James Wilson", initials: "JW", rating: 4, comment: "Solid garden tools. The trowel and cultivator get used every weekend.", date: "2026-04-03" },
            { id: "REV-032", customer: "Liam Anderson", initials: "LA", rating: 4, comment: "Good quality set. The handles are comfortable and the steel is durable.", date: "2026-03-14" },
        ],
    },
    "PRD-0015": {
        description:
            "AirPods Pro (2nd generation) with H2 chip deliver up to 2x more Active Noise Cancellation than the previous generation, plus Transparency mode and Adaptive Audio for personalised listening.",
        tags: ["airpods", "apple", "earbuds", "wireless", "anc"],
        salesTrend: [
            { month: "Jan", sales: 20, revenue: 4980 },
            { month: "Feb", sales: 27, revenue: 6723 },
            { month: "Mar", sales: 23, revenue: 5727 },
            { month: "Apr", sales: 32, revenue: 7968 },
            { month: "May", sales: 39, revenue: 9711 },
            { month: "Jun", sales: 34, revenue: 8466 },
            { month: "Jul", sales: 29, revenue: 7221 },
            { month: "Aug", sales: 25, revenue: 6225 },
            { month: "Sep", sales: 21, revenue: 5229 },
            { month: "Oct", sales: 18, revenue: 4482 },
            { month: "Nov", sales: 14, revenue: 3486 },
            { month: "Dec", sales: 3, revenue: 747 },
        ],
        reviews: [
            { id: "REV-034", customer: "Alex Johnson", initials: "AJ", rating: 5, comment: "The ANC is dramatically improved over the 1st gen. Truly impressive.", date: "2026-03-18" },
            { id: "REV-035", customer: "Noah Martinez", initials: "NM", rating: 5, comment: "Seamless switching between devices. Best earbuds for iPhone users.", date: "2026-03-05" },
            { id: "REV-036", customer: "Olivia Brown", initials: "OB", rating: 4, comment: "Great sound and fit. The stem design is a little polarising but I like it.", date: "2026-02-18" },
        ],
    },
    "PRD-0016": {
        description:
            "The Fjällräven Kånken is an iconic Swedish backpack, designed in 1978 to help reduce back problems in school children. Features a wide main compartment, flat inner pocket, and top handle.",
        tags: ["backpack", "fjallraven", "kanken", "bag", "outdoor"],
        salesTrend: [
            { month: "Jan", sales: 0, revenue: 0 },
            { month: "Feb", sales: 0, revenue: 0 },
            { month: "Mar", sales: 0, revenue: 0 },
            { month: "Apr", sales: 0, revenue: 0 },
            { month: "May", sales: 0, revenue: 0 },
            { month: "Jun", sales: 0, revenue: 0 },
            { month: "Jul", sales: 0, revenue: 0 },
            { month: "Aug", sales: 0, revenue: 0 },
            { month: "Sep", sales: 0, revenue: 0 },
            { month: "Oct", sales: 0, revenue: 0 },
            { month: "Nov", sales: 0, revenue: 0 },
            { month: "Dec", sales: 0, revenue: 0 },
        ],
        reviews: [],
    },
};
