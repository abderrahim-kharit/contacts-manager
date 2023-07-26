import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";

export default function FilterBar({ query }) {
    const { data, setData, get } = useForm({
        search: query,
    });

    const submit = (e) => {
        e.preventDefault();
        get(route(route().current()));
    };
    return (
        <form onSubmit={submit} className="w-1/3 text-sm">
            <TextInput
                name="recherche"
                placeholder="Recherche..."
                className="w-full"
                value={data.search}
                onChange={(e) => setData("search", e.target.value)}
            />
        </form>
    );
}
