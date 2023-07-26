import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import { Head } from "@inertiajs/react";
import CreateContact from "./modals/CreateContact";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import FilterBar from "@/Components/FilterBar";

export default function Contacts({ contacts, query }) {
    const [createModalState, setCreateModalState] = useState(false);
    const swapCreateModal = () => setCreateModalState((state) => !state);

    return (
        <div>
            <Head title="Contacts" />

            {createModalState && (
                <CreateContact
                    show={createModalState}
                    onClose={swapCreateModal}
                />
            )}

            <main className="container mx-auto">
                <div>
                    <h1 className="text-3xl py-4">Liste des contacts</h1>
                    <div className="flex items-center justify-between">
                        <FilterBar query={query} />
                        <PrimaryButton
                            onClick={swapCreateModal}
                            className="p-3"
                        >
                            <FaPlus size={12} />
                            <span>Ajouter</span>
                        </PrimaryButton>
                    </div>
                </div>
                <Table contacts={contacts.data} />
                <Pagination pagination={contacts} />
            </main>
        </div>
    );
}
