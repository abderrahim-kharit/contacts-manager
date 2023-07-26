import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function DetailContact({ show, onClose, contact }) {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex flex-col gap-y-4 p-4">
                <h1 className="text-xl">Detail de contact</h1>
                <div className="flex gap-4">
                    <div className="grow">
                        <InputLabel value="Prénom" className="mb-2" />
                        <TextInput
                            className="w-full"
                            value={contact.prenom}
                            disabled
                        />
                    </div>
                    <div className="grow">
                        <InputLabel value="Nom" className="mb-2" />
                        <TextInput
                            className="w-full"
                            value={contact.nom}
                            disabled
                        />
                    </div>
                </div>
                <div>
                    <InputLabel value="E-mail" className="mb-2" />
                    <TextInput
                        className="w-full"
                        value={contact.e_mail}
                        disabled
                    />
                </div>
                <div>
                    <InputLabel value="Entreprise" className="mb-2" />
                    <TextInput
                        className="w-full"
                        value={contact.organisation.nom}
                        disabled
                    />
                </div>
                <div>
                    <InputLabel value="Adresse" className="mb-2" />
                    <textarea
                        className="w-full rounded border-gray-300"
                        rows="3"
                        value={contact.organisation.adresse}
                        disabled
                    ></textarea>
                </div>
                <div className="flex gap-4">
                    <div>
                        <InputLabel value="Code postal" className="mb-2" />
                        <TextInput
                            className="w-40"
                            type="number"
                            value={contact.organisation.code_postal}
                            disabled
                        />
                    </div>
                    <div className="grow">
                        <InputLabel value="Ville" className="mb-2" />
                        <TextInput
                            className="w-full"
                            value={contact.organisation.ville}
                            disabled
                        />
                    </div>
                </div>
                <div className="w-1/2">
                    <InputLabel value="Statut" className="mb-2" />
                    <select
                        value={contact.organisation.statut}
                        className="w-full rounded border-gray-300"
                        disabled
                    >
                        <option value="CLIENT">Client</option>
                        <option value="LEAD">Lead</option>
                        <option value="PROSPECT">Prospect</option>
                    </select>
                </div>
            </div>
            <div className="bg-[#f4fafa] flex items-center justify-end gap-4 px-4 py-2">
                <PrimaryButton className="py-2 px-4" onClick={onClose}>
                    Fermer
                </PrimaryButton>
            </div>
        </Modal>
    );
}
