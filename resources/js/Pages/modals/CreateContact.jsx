import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DoublonContact from "./Doublon";
import axios from "axios";

export default function CreateContact({ show, onClose }) {
    const { data, setData, errors, processing, post, wasSuccessful } = useForm({
        contact_prenom: "",
        contact_nom: "",
        contact_e_mail: "",
        organisation_nom: "",
        organisation_statut: "CLIENT",
        organisation_ville: "",
        organisation_adresse: "",
        organisation_code_postal: "",
    });

    const [doublonState, setDoublonState] = useState(false);
    const [doublonTable, setDoublonTable] = useState("");
    const swapDoublonState = () => setDoublonState((state) => !state);

    useEffect(() => {
        wasSuccessful && onClose();
    }, [wasSuccessful]);

    const checkDoublon = async (e) => {
        e.preventDefault();
        axios(route("contacts.doublon", { ...data })).then(({ data }) => {
            if (data.doublon) {
                setDoublonTable(data.table);
                setDoublonState(true);
            } else {
                createContact();
            }
        });
    };

    const createContact = () => post(route("contacts.store"));

    return (
        <Modal show={show} onClose={onClose}>
            {doublonState && (
                <DoublonContact
                    onClose={swapDoublonState}
                    show={doublonState}
                    table={doublonTable}
                    confirm={createContact}
                />
            )}

            <form onSubmit={checkDoublon}>
                <div className="flex flex-col gap-y-4 p-4">
                    <h1 className="text-xl">Création d'un contact</h1>
                    <div className="flex gap-4">
                        <div className="grow">
                            <InputLabel value="Prénom" className="mb-2" />
                            <TextInput
                                className="w-full"
                                required
                                value={data.contact_prenom}
                                onChange={(e) =>
                                    setData("contact_prenom", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.contact_prenom}
                                className="mt-2"
                            />
                        </div>
                        <div className="grow">
                            <InputLabel value="Nom" className="mb-2" />
                            <TextInput
                                className="w-full"
                                required
                                value={data.contact_nom}
                                onChange={(e) =>
                                    setData("contact_nom", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.contact_nom}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div>
                        <InputLabel value="E-mail" className="mb-2" />
                        <TextInput
                            className="w-full"
                            required
                            type="email"
                            value={data.contact_e_mail}
                            onChange={(e) =>
                                setData("contact_e_mail", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.contact_e_mail}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel value="Entreprise" className="mb-2" />
                        <TextInput
                            className="w-full"
                            required
                            value={data.organisation_nom}
                            onChange={(e) =>
                                setData("organisation_nom", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.organisation_nom}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel value="Adresse" className="mb-2" />
                        <textarea
                            className="w-full rounded border-gray-300"
                            rows="3"
                            required
                            value={data.organisation_adresse}
                            onChange={(e) =>
                                setData("organisation_adresse", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.organisation_adresse}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <InputLabel value="Code postal" className="mb-2" />
                            <TextInput
                                className="w-40"
                                type="number"
                                required
                                value={data.organisation_code_postal}
                                onChange={(e) =>
                                    setData(
                                        "organisation_code_postal",
                                        e.target.value
                                    )
                                }
                            />
                            <InputError
                                message={errors.organisation_code_postal}
                                className="mt-2"
                            />
                        </div>
                        <div className="grow">
                            <InputLabel value="Ville" className="mb-2" />
                            <TextInput
                                className="w-full"
                                required
                                value={data.organisation_ville}
                                onChange={(e) =>
                                    setData(
                                        "organisation_ville",
                                        e.target.value
                                    )
                                }
                            />
                            <InputError
                                message={errors.organisation_ville}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <InputLabel value="Statut" className="mb-2" />
                        <select
                            className="w-full rounded border-gray-300"
                            required
                            value={data.organisation_statut}
                            onChange={(e) =>
                                setData("organisation_statut", e.target.value)
                            }
                        >
                            <option value="CLIENT">Client</option>
                            <option value="LEAD">Lead</option>
                            <option value="PROSPECT">prospect</option>
                        </select>
                        <InputError
                            message={errors.organisation_statut}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div className="bg-[#f4fafa] flex items-center justify-end gap-4 px-4 py-2">
                    <button
                        className="border-2 py-2 px-4 rounded-md"
                        onClick={onClose}
                    >
                        Annuler
                    </button>
                    <PrimaryButton className="py-2 px-4" disabled={processing}>
                        Créer
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
