import {
    ShoppingBag,
    ShoppingCart,
    Package,
    Package2,
    Store,
    Tag,
    Gift,
    Shirt,
    Watch,
    Gem,
    Crown,
    Glasses,
    Laptop,
    Smartphone,
    Camera,
    Headphones,
    Tv,
    Monitor,
    Calculator,
    Cpu,
    HardDrive,
    Printer,
    Battery,
    Plug,
    Radio,
    Phone,
    Coffee,
    Wine,
    Apple,
    Pizza,
    Dumbbell,
    Bike,
    Mountain,
    Tent,
    Compass,
    Trophy,
    Medal,
    Home,
    Lamp,
    Music,
    Video,
    Film,
    Book,
    Pen,
    Scissors,
    Hammer,
    Wrench,
    Key,
    Lock,
    Shield,
    Star,
    Heart,
    Zap,
    Flame,
    Snowflake,
    Sun,
    Umbrella,
    Palette,
    Brush,
    Diamond,
} from "lucide-react";

export interface ProductIconConfig {
    id: string | number;
    icon: React.ReactNode;
    label?: string;
}

const COLORS = [
    "#60a5fa", // blue-400
    "#34d399", // emerald-400
    "#f472b6", // pink-400
    "#fb923c", // orange-400
    "#818cf8", // indigo-400
    "#2dd4bf", // teal-400
    "#facc15", // yellow-400
    "#fb7185", // rose-400
    "#4ade80", // green-400
    "#e879f9", // fuchsia-400
    "#38bdf8", // sky-400
    "#a3e635", // lime-400
    "#f97316", // orange-500
    "#c084fc", // purple-400
    "#22d3ee", // cyan-400
];

const c = (idx: number) => COLORS[idx % COLORS.length];

export const productIcons: ProductIconConfig[] = [
    { id: 1, icon: <ShoppingBag size={30} color={c(0)} />, label: "Bags" },
    { id: 2, icon: <ShoppingCart size={30} color={c(1)} />, label: "Cart" },
    { id: 3, icon: <Package size={30} color={c(2)} />, label: "Package" },
    { id: 4, icon: <Package2 size={30} color={c(3)} />, label: "Boxes" },
    { id: 5, icon: <Store size={30} color={c(4)} />, label: "Store" },
    { id: 6, icon: <Tag size={30} color={c(5)} />, label: "Tag" },
    { id: 7, icon: <Gift size={30} color={c(6)} />, label: "Gifts" },
    { id: 8, icon: <Shirt size={30} color={c(7)} />, label: "Apparel" },
    { id: 9, icon: <Watch size={30} color={c(8)} />, label: "Watches" },
    { id: 10, icon: <Gem size={30} color={c(9)} />, label: "Jewelry" },
    { id: 11, icon: <Crown size={30} color={c(10)} />, label: "Premium" },
    { id: 12, icon: <Glasses size={30} color={c(11)} />, label: "Eyewear" },
    { id: 13, icon: <Laptop size={30} color={c(12)} />, label: "Laptops" },
    { id: 14, icon: <Smartphone size={30} color={c(13)} />, label: "Phones" },
    { id: 15, icon: <Camera size={30} color={c(14)} />, label: "Cameras" },
    { id: 16, icon: <Headphones size={30} color={c(0)} />, label: "Audio" },
    { id: 17, icon: <Tv size={30} color={c(1)} />, label: "TVs" },
    { id: 18, icon: <Monitor size={30} color={c(2)} />, label: "Monitors" },
    {
        id: 19,
        icon: <Calculator size={30} color={c(3)} />,
        label: "Calculator",
    },
    { id: 20, icon: <Cpu size={30} color={c(4)} />, label: "Hardware" },
    { id: 21, icon: <HardDrive size={30} color={c(5)} />, label: "Storage" },
    { id: 22, icon: <Printer size={30} color={c(6)} />, label: "Printers" },
    { id: 23, icon: <Battery size={30} color={c(7)} />, label: "Battery" },
    { id: 24, icon: <Plug size={30} color={c(8)} />, label: "Accessories" },
    { id: 25, icon: <Radio size={30} color={c(9)} />, label: "Radio" },
    { id: 26, icon: <Phone size={30} color={c(10)} />, label: "Landline" },
    { id: 27, icon: <Coffee size={30} color={c(11)} />, label: "Coffee" },
    { id: 28, icon: <Wine size={30} color={c(12)} />, label: "Beverages" },
    { id: 29, icon: <Apple size={30} color={c(13)} />, label: "Groceries" },
    { id: 30, icon: <Pizza size={30} color={c(14)} />, label: "Food" },
    { id: 31, icon: <Dumbbell size={30} color={c(0)} />, label: "Fitness" },
    { id: 32, icon: <Bike size={30} color={c(1)} />, label: "Cycling" },
    { id: 33, icon: <Mountain size={30} color={c(2)} />, label: "Outdoors" },
    { id: 34, icon: <Tent size={30} color={c(3)} />, label: "Camping" },
    { id: 35, icon: <Compass size={30} color={c(4)} />, label: "Navigation" },
    { id: 36, icon: <Trophy size={30} color={c(5)} />, label: "Sports" },
    { id: 37, icon: <Medal size={30} color={c(6)} />, label: "Awards" },
    { id: 38, icon: <Home size={30} color={c(7)} />, label: "Home" },
    { id: 39, icon: <Lamp size={30} color={c(8)} />, label: "Lighting" },
    { id: 40, icon: <Music size={30} color={c(9)} />, label: "Music" },
    { id: 41, icon: <Video size={30} color={c(10)} />, label: "Video" },
    { id: 42, icon: <Film size={30} color={c(11)} />, label: "Movies" },
    { id: 43, icon: <Book size={30} color={c(12)} />, label: "Books" },
    { id: 44, icon: <Pen size={30} color={c(13)} />, label: "Stationery" },
    { id: 45, icon: <Scissors size={30} color={c(14)} />, label: "Tools" },
    { id: 46, icon: <Hammer size={30} color={c(0)} />, label: "Hardware" },
    { id: 47, icon: <Wrench size={30} color={c(1)} />, label: "Repair" },
    { id: 48, icon: <Key size={30} color={c(2)} />, label: "Security" },
    { id: 49, icon: <Lock size={30} color={c(3)} />, label: "Lock" },
    { id: 50, icon: <Shield size={30} color={c(4)} />, label: "Protection" },
    { id: 51, icon: <Star size={30} color={c(5)} />, label: "Featured" },
    { id: 52, icon: <Heart size={30} color={c(6)} />, label: "Wishlist" },
    { id: 53, icon: <Zap size={30} color={c(7)} />, label: "Power" },
    { id: 54, icon: <Flame size={30} color={c(8)} />, label: "Hot Deals" },
    { id: 55, icon: <Snowflake size={30} color={c(9)} />, label: "Seasonal" },
    { id: 56, icon: <Sun size={30} color={c(10)} />, label: "Summer" },
    { id: 57, icon: <Umbrella size={30} color={c(11)} />, label: "Essentials" },
    { id: 58, icon: <Palette size={30} color={c(12)} />, label: "Art" },
    { id: 59, icon: <Brush size={30} color={c(13)} />, label: "Crafts" },
    { id: 60, icon: <Diamond size={30} color={c(14)} />, label: "Luxury" },
];
