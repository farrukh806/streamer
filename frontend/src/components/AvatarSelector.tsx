import { useState, useRef } from "react";
import { AVATAR_OPTIONS } from "../lib/constant";
import ErrorMessage from "./ErrorMessage";
import Button from "./Button";

interface AvatarSelectorProps {
    value?: string;
    onChange: (url: string) => void;
    error?: { message?: string };
}

const AvatarSelector = ({ value, onChange, error }: AvatarSelectorProps) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [preview, setPreview] = useState(value || AVATAR_OPTIONS[0]);

    const handleSelect = (url: string) => {
        onChange(url);
        setPreview(url);
        modalRef.current?.close();
    };

    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Profile Picture</span>
            </label>

            <div className="flex items-center gap-4 mt-2">
                <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={value || preview} alt="Avatar Preview" />
                    </div>
                </div>
                <Button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => modalRef.current?.showModal()}
                >
                    Choose Avatar
                </Button>
            </div>

            <ErrorMessage error={error?.message} />

            <dialog ref={modalRef} className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-lg mb-4">Select an Avatar</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 max-h-96 overflow-y-auto p-2">
                        {AVATAR_OPTIONS.map((url, index) => (
                            <Button
                                key={index}
                                type="button"
                                className={`avatar hover:scale-110 transition-transform ${value === url ? "ring ring-primary rounded-full" : ""}`}
                                onClick={() => handleSelect(url)}
                            >
                                <div className="w-full rounded-full">
                                    <img src={url} alt={`Avatar ${index + 1}`} loading="lazy" />
                                </div>
                            </Button>
                        ))}
                    </div>
                    <div className="modal-action">
                        <Button type="button" className="btn" onClick={() => modalRef.current?.close()}>Close</Button>
                    </div>
                </div>
                <div className="modal-backdrop" onClick={() => modalRef.current?.close()}>
                    <Button type="button">close</Button>
                </div>
            </dialog>
        </div>
    );
};

export default AvatarSelector;
