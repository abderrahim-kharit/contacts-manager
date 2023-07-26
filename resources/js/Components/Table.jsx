import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";

import Statut from "./Statut";
import DetailContact from "@/Pages/modals/DetailContact";
import EditContact from "@/Pages/modals/EditContact";
import DeleteContact from "@/Pages/modals/DeleteContact";
import { useEffect, useState } from "react";

import { RxCaretSort } from "react-icons/rx";

export default function ContactsTable({ contacts }) {
    const [selectedContact, setSelectedContact] = useState(null);
    const [detailModalState, setDetailModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);

    const [contactsList, setContactList] = useState(contacts);

    const swapDetailModal = () => setDetailModalState((state) => !state);
    const swapEditModal = () => setEditModalState((state) => !state);
    const swapDeleteModal = () => setDeleteModalState((state) => !state);

    const [colonneTri, setColonneTri] = useState(null);
    const [ordreTri, setOrdreTri] = useState("asc");

    const ordreData = (colonne) => {
        if (colonne === colonneTri) {
            setOrdreTri(ordreTri === "asc" ? "desc" : "asc");
        } else {
            setColonneTri(colonne);
            setOrdreTri("asc");
        }

        const listeTrie = [...contactsList].sort((a, b) => {
            const aVal = getPropertyByString(a, colonne);
            const bVal = getPropertyByString(b, colonne);

            if (ordreTri === "asc") {
                return typeof aVal === "string"
                    ? aVal.localeCompare(bVal)
                    : aVal - bVal;
            } else {
                return typeof aVal === "string"
                    ? bVal.localeCompare(aVal)
                    : bVal - aVal;
            }
        });

        setContactList(listeTrie);
    };

    const getPropertyByString = (obj, propString) => {
        const propArray = propString.split(".");
        return propArray.reduce((prev, curr) => prev && prev[curr], obj);
    };

    useEffect(() => {
        setContactList(contacts);
    }, [contacts]);

    if (contacts.length) {
        return (
            <div>
                {detailModalState && (
                    <DetailContact
                        onClose={swapDetailModal}
                        show={detailModalState}
                        contact={selectedContact}
                    />
                )}

                {editModalState && (
                    <EditContact
                        onClose={swapEditModal}
                        show={editModalState}
                        contact={selectedContact}
                    />
                )}
                {deleteModalState && (
                    <DeleteContact
                        onClose={swapDeleteModal}
                        show={deleteModalState}
                        contact={selectedContact}
                    />
                )}
                <table className="w-full rounded-md my-4 text-xs border-2">
                    <thead className="uppercase bg-[#f4fafa] text-gray-500">
                        <tr>
                            <th
                                className="p-3 text-start"
                                onClick={() => ordreData("nom")}
                            >
                                <div className="flex items-center gap-4 cursor-pointer">
                                    <span>nom du contact</span>
                                    <RxCaretSort size={16} />
                                </div>
                            </th>
                            <th
                                className="p-3 text-start"
                                onClick={() => ordreData("organisation.nom")}
                            >
                                <div className="flex items-center gap-4 cursor-pointer">
                                    <span>société</span>
                                    <RxCaretSort size={16} />
                                </div>
                            </th>
                            <th
                                className="p-3 text-start"
                                onClick={() => ordreData("organisation.statut")}
                            >
                                <div className="flex items-center gap-4 cursor-pointer">
                                    <span>statut</span>
                                    <RxCaretSort size={16} />
                                </div>
                            </th>
                            <th className="p-3 text-start"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-sm">
                        {contactsList.map((contact) => {
                            return (
                                <tr className="border-b-2" key={contact.id}>
                                    <td className="p-3">
                                        {contact.nom} {contact.prenom}
                                    </td>
                                    <td className="p-3">
                                        {contact.organisation.nom}
                                    </td>
                                    <td className="p-3">
                                        {
                                            <Statut
                                                statut={
                                                    contact.organisation.statut
                                                }
                                            />
                                        }
                                    </td>
                                    <td className="flex items-center gap-3 p-3">
                                        <FaEye
                                            className="text-gray-600 cursor-pointer"
                                            size={16}
                                            onClick={() => {
                                                swapDetailModal();
                                                setSelectedContact(contact);
                                            }}
                                        />
                                        <FaPencilAlt
                                            className="text-gray-600 cursor-pointer"
                                            size={16}
                                            onClick={() => {
                                                swapEditModal();
                                                setSelectedContact(contact);
                                            }}
                                        />
                                        <FaTrash
                                            className="text-red-500 cursor-pointer"
                                            size={16}
                                            onClick={() => {
                                                swapDeleteModal();
                                                setSelectedContact(contact);
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
    return <h2 className="my-4">Aucun contact existe.</h2>;
}
