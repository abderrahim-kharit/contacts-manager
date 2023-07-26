import { HiOutlineExclamation } from "react-icons/hi";
import CancelButton from "@/Components/CancelButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";

export default function DoublonContact({ show, onClose, table, confirm }) {
    const submit = (e) => {
        e.preventDefault();
        confirm();
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex p-4 gap-3">
                <span className="rounded-full bg-red-200 text-red-600 p-1 w-8 h-8 grid place-items-center">
                    <HiOutlineExclamation />
                </span>
                <div>
                    <h1 className="text-xl">Doublon</h1>
                    <p className="text-gray-600 py-4">
                        {table === "contact"
                            ? "Un contact existe déjà avec le même prénom et le même nom."
                            : "Une entreprise existe déjà avec le même nom."}
                        <br />
                        Etes-vous sûr de vouloir ajouter ce contact ?
                    </p>
                </div>
            </div>

            <form
                onSubmit={submit}
                className="bg-[#f4fafa] flex items-center justify-end gap-4 px-4 py-2"
            >
                <CancelButton onClick={onClose}>Annuler</CancelButton>
                <DangerButton type="submit">Confirmer</DangerButton>
            </form>
        </Modal>
    );
}
