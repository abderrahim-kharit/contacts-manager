import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function EditContact({ show, onClose, contact }) {
    const { data, setData, errors, processing, put, wasSuccessful } = useForm({
        contact_prenom: contact.prenom,
        contact_nom: contact.nom,
        contact_e_mail: contact.e_mail,
        organisation_nom: contact.organisation.nom,
        organisation_statut: contact.organisation.statut,
        organisation_ville: contact.organisation.ville,
        organisation_adresse: contact.organisation.adresse,
        organisation_code_postal: contact.organisation.code_postal,
    });

    useEffect(() => {
        wasSuccessful && onClose();
    }, [wasSuccessful]);

    const updateContact = (e) => {
        e.preventDefault();
        put(
            route("contacts.update", {
                contact: contact.id,
            })
        );
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={updateContact}>
                <div className="flex flex-col gap-y-4 p-4">
                    <h1 className="text-xl">Modifier un contact</h1>
                    <div className="flex gap-4">
                        <div className="grow">
                            <InputLabel value="Prénom" className="mb-2" />
                            <TextInput
                                className="w-full"
                                value={data.contact_prenom}
                                onChange={(e) =>
                                    setData("contact_prenom", e.target.value)
                                }
                                required
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
                                value={data.contact_nom}
                                onChange={(e) =>
                                    setData("contact_nom", e.target.value)
                                }
                                required
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
                            value={data.contact_e_mail}
                            onChange={(e) =>
                                setData("contact_e_mail", e.target.value)
                            }
                            required
                            type="email"
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
                            value={data.organisation_nom}
                            onChange={(e) =>
                                setData("organisation_nom", e.target.value)
                            }
                            required
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
                            value={data.organisation_adresse}
                            onChange={(e) =>
                                setData("organisation_adresse", e.target.value)
                            }
                            required
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
                                value={data.organisation_code_postal}
                                onChange={(e) =>
                                    setData(
                                        "organisation_code_postal",
                                        e.target.value
                                    )
                                }
                                required
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
                                value={data.organisation_ville}
                                onChange={(e) =>
                                    setData(
                                        "organisation_ville",
                                        e.target.value
                                    )
                                }
                                required
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
                            value={data.organisation_statut}
                            className="w-full rounded border-gray-300"
                            required
                            onChange={(e) =>
                                setData("organisation_statut", e.target.value)
                            }
                        >
                            <option value="CLIENT">Client</option>
                            <option value="LEAD">Lead</option>
                            <option value="PROSPECT">Prospect</option>
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
                        Modifier
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
