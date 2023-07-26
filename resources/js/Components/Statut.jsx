export default function Statut({ statut }) {
    const cn = getClassName(statut);
    return (
        <span className={cn + " rounded-xl text-xs p-1 px-2 capitalize"}>
            {statut.toLowerCase()}
        </span>
    );
}

function getClassName(statut) {
    switch (statut) {
        case "CLIENT":
            return "bg-green-200 text-green-700";
        case "LEAD":
            return "bg-blue-200 text-blue-800";
        case "PROSPECT":
            return "bg-red-100 text-red-700";

        default:
            return "";
    }
}
