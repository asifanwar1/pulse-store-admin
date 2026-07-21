import SearchInput from "@/components/custom/Inputs/SearchInput";

type DataTableSearchProps = {
    onSearch: (value: string) => void;
    placeholder?: string;
};

const DataTableSearch = ({
    onSearch,
    placeholder = "Search...",
}: DataTableSearchProps) => {
    return (
        <div className="flex justify-end px-2 pt-2">
            <div className="w-full sm:w-72">
                <SearchInput onSearch={onSearch} placeholder={placeholder} />
            </div>
        </div>
    );
};

export default DataTableSearch;
