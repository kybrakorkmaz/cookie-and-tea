import { useState } from "react";
import { useIyzicoCard } from "../hooks/useIyzicoCard.js";

const IyzicoCardForm = () => {
    const { isCardConnected, isLoading, saveCard, isSavingCard, saveCardError } = useIyzicoCard();
    const [form, setForm] = useState({
        cardHolderName: "",
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        cvc: "",
    });

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveCard(form);
            setForm({ cardHolderName: "", cardNumber: "", expireMonth: "", expireYear: "", cvc: "" });
        } catch {
            // surfaced via saveCardError below
        }
    };

    if (isLoading) {
        return <p className="text-gray-400 text-sm">Checking your Iyzico card...</p>;
    }

    if (isCardConnected) {
        return (
            <p className="text-sm text-green-600 font-bold">
                Your card is saved with Iyzico. You can donate with one click.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                type="text"
                placeholder="Card Holder Name"
                value={form.cardHolderName}
                onChange={handleChange("cardHolderName")}
                required
                className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-dark/40"
            />
            <input
                type="text"
                placeholder="Card Number"
                maxLength="16"
                value={form.cardNumber}
                onChange={handleChange("cardNumber")}
                required
                className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-dark/40"
            />
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="MM"
                    maxLength="2"
                    value={form.expireMonth}
                    onChange={handleChange("expireMonth")}
                    required
                    className="w-1/3 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-dark/40 text-center"
                />
                <input
                    type="text"
                    placeholder="YYYY"
                    maxLength="4"
                    value={form.expireYear}
                    onChange={handleChange("expireYear")}
                    required
                    className="w-1/3 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-dark/40 text-center"
                />
                <input
                    type="text"
                    placeholder="CVC"
                    maxLength="3"
                    value={form.cvc}
                    onChange={handleChange("cvc")}
                    required
                    className="w-1/3 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-dark/40 text-center"
                />
            </div>
            {saveCardError && (
                <p className="text-sm text-red-500">
                    {saveCardError.response?.data?.message || saveCardError.message}
                </p>
            )}
            <button
                type="submit"
                disabled={isSavingCard}
                className="px-8 py-3 rounded-full font-bold transition-all active:scale-95 bg-primary-dark text-white hover:opacity-90 disabled:opacity-50"
            >
                {isSavingCard ? "Saving with Iyzico..." : "Save Card with Iyzico"}
            </button>
        </form>
    );
};

export default IyzicoCardForm;