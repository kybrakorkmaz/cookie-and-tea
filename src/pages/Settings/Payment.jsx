import { useState } from "react";
import { FaCreditCard, FaUniversity, FaIdCard, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useIyzicoConnection } from "./hooks/useIyzicoConnection.js";
import { useDonationHistory } from "./hooks/useDonationHistory.js";
import IyzicoCardForm from "./structure/IyzicoCardForm.jsx";

const Payment = () => {
    const {
        isConnected,
        isLoading: isLoadingIyzico,
        handleConnectIyzico,
        isConnecting,
    } = useIyzicoConnection();

    const { donations, isLoading: isLoadingHistory } = useDonationHistory();

    // Local form state for onboarding details
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        identityNumber: "", // TCKN
        iban: "",           // Must start with TR
        gsmNumber: "",      // Format: +905xxxxxxxxxx
        address: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitOnboarding = async (e) => {
        e.preventDefault();

        // Basic frontend validation
        if (!formData.iban.startsWith("TR") || formData.iban.replace(/\s/g, "").length !== 26) {
            alert("Please enter a valid 26-character TR IBAN.");
            return;
        }
        if (formData.identityNumber.length !== 11) {
            alert("TC identification number must be exactly 11 digits.");
            return;
        }

        try {
            await handleConnectIyzico(formData);
            setShowForm(false);
        } catch (error) {
            // Error is already handled by mutation onError logic
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            {/* Iyzico Sub-Merchant Connection Section */}
            <div className={`p-6 rounded-2xl border-2 transition-all ${isConnected ? "border-green-100 bg-green-50/30" : "border-dashed border-gray-200 bg-gray-50/30"}`}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 w-full">
                            <div className={`p-3 rounded-xl ${isConnected ? "bg-green-100 text-green-600" : "bg-white text-primary-dark shadow-sm"}`}>
                                <FaCreditCard size={40} />
                            </div>
                            <div>
                                <h4 className="font-header font-bold text-lg text-gray-800">
                                    {isLoadingIyzico ? "Checking Iyzico..." : isConnected ? "Iyzico Connected" : "Accept Donations via Iyzico"}
                                </h4>
                                <p className="text-sm text-gray-500 font-paragraph">
                                    {isConnected
                                        ? "Your account is ready to receive donations directly."
                                        : "Provide your settlement details to start accepting financial support safely."}
                                </p>
                            </div>
                        </div>
                        {!isConnected && !showForm && (
                            <button
                                onClick={() => setShowForm(true)}
                                disabled={isLoadingIyzico || isConnecting}
                                className="px-8 py-3 rounded-full font-bold transition-all active:scale-95 whitespace-nowrap bg-primary-dark text-white hover:opacity-90 shadow-md disabled:opacity-50"
                            >
                                Setup Payouts
                            </button>
                        )}
                    </div>

                    {/* Onboarding Input Fields */}
                    {!isConnected && showForm && (
                        <form onSubmit={handleSubmitOnboarding} className="mt-4 border-t border-gray-100 pt-4 flex flex-col gap-4 font-paragraph">
                            <h5 className="font-bold text-gray-700 text-sm mb-2">Legal Sub-Merchant Registration Details</h5>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <FaIdCard className="absolute left-4 top-3.5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="identityNumber"
                                        placeholder="TC Identity Number (TCKN)"
                                        maxLength="11"
                                        required
                                        value={formData.identityNumber}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-dark"
                                    />
                                </div>

                                <div className="relative">
                                    <FaPhone className="absolute left-4 top-3.5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="gsmNumber"
                                        placeholder="Phone Number (+905XXXXXXXXX)"
                                        required
                                        value={formData.gsmNumber}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-dark"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <FaUniversity className="absolute left-4 top-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    name="iban"
                                    placeholder="IBAN (Starts with TR...)"
                                    maxLength="34"
                                    required
                                    value={formData.iban}
                                    onChange={handleInputChange}
                                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-dark"
                                />
                            </div>

                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
                                <textarea
                                    name="address"
                                    placeholder="Full Billing Address"
                                    rows="2"
                                    required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-dark resize-none"
                                />
                            </div>

                            <div className="flex gap-3 justify-end mt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-5 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isConnecting}
                                    className="px-6 py-2 rounded-full font-bold text-sm bg-primary-dark text-white hover:opacity-90 disabled:opacity-50"
                                >
                                    {isConnecting ? "Connecting..." : "Submit to Iyzico"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Iyzico Card Tokenization Section */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/30">
                <h4 className="font-header font-bold text-lg text-gray-800 mb-1">Your Donation Card</h4>
                <p className="text-sm text-gray-500 font-paragraph mb-4">
                    Enter your card details once with Iyzico. From then on, every donation ($5, $7 or $12) is a single click.
                </p>
                <IyzicoCardForm />
            </div>

            {/* Donation History Section */}
            <div className="flex flex-col gap-4">
                <h4 className="font-header font-bold text-xl text-gray-800 px-2">Recent Payouts</h4>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {isLoadingHistory ? (
                        <div className="py-12 text-center text-gray-400">
                            <p>Loading transactions...</p>
                        </div>
                    ) : donations.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-paragraph">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600">Date</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600">From</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600">Amount</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600">Status</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                {donations.map((donation) => (
                                    <tr key={donation.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-600">{donation.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {donation.fromUsername ? `@${donation.fromUsername}` : donation.from}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-primary-dark">${donation.amount}</td>
                                        <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    donation.status === "failed" ? "bg-red-100 text-red-800" :
                                                        donation.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                                            "bg-green-100 text-green-800"
                                                }`}>
                                                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                                </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-12 text-center text-gray-400">
                            <p>No transactions yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Payment;