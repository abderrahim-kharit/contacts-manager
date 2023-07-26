import { HiOutlineExclamation } from "react-icons/hi";
import CancelButton from "@/Components/CancelButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function DeleteContact({ contact, show, onClose }) {
    const { delete: destroy, wasSuccessful, processing } = useForm();

    useEffect(() => {
        wasSuccessful && onClose();
    }, [wasSuccessful]);

    const deleteContact = (e) => {
        e.preventDefault();
        destroy(
            route("contacts.destroy", {
                contact: contact.id,
            })
        );
    };
    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex p-4 gap-3">
                <span className="rounded-full bg-red-200 text-red-600 p-1 w-8 h-8 grid place-items-center">
                    <HiOutlineExclamation />
                </span>
                <div>
                    <h1 className="text-xl">Supprimer le contact</h1>
                    <p className="text-gray-600 py-4">
                        Etes-vous sûr de vouloir supprimer le contact ?
                        <br />
                        Cette opération est irreversible.
                    </p>
                </div>
            </div>

            <form
                onSubmit={deleteContact}
                className="bg-[#f4fafa] flex items-center justify-end gap-4 px-4 py-2"
            >
                <CancelButton onClick={onClose}>Annuler</CancelButton>
                <DangerButton type="submit" disabled={processing}>
                    Confirmer
                </DangerButton>
            </form>
        </Modal>
    );
}
