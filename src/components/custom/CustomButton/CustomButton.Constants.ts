import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "rounded-sm font-normal text-[15px] tracking-[0.15em] bg-pulse-green text-pulse-cream shadow-sm border-0 hover:scale-105 transition-all duration-300",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "bg-white border border-[#C1C7D0] text-[#7C808C] shadow-none hover:bg-[#F5F6F8] hover:border-[#9DA5B4] focus:ring-0 focus:outline-none",
                secondary:
                    "bg-[#232B3A] text-white shadow-none border-0 hover:bg-[#1A2232] focus:ring-0 focus:outline-none",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
                iconCircle:
                    "rounded-full bg-[#F5F6F8] flex items-center justify-center hover:bg-[#e9eaec] transition shadow-none border-0 p-0",
                profile:
                    "flex items-center gap-4 cursor-pointer bg-transparent border-none p-0 hover:bg-[#e9eaec] hover: rounded-full focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
            },
            size: {
                default: "h-[36px] p-3 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);
