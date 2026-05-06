import Input from "../../components/Input.jsx";
import {useState} from "react";
import {FaStripe} from "react-icons/fa";
import {donations} from "../../constants/index.js";

const Payment = ()=>{
    const [isConnected, setIsConnected] = useState(false);

    // Mock current user id
    const currentUserId = 1;
    const userDonations = donations.filter(d => d.donated_to_user_id === currentUserId);

    return(
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            {/* Stripe Connection Section */}
            <div className={`p-6 rounded-2xl border-2 transition-all ${isConnected ? 'border-green-100 bg-green-50/30' : 'border-dashed border-gray-200 bg-gray-50/30'}`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${isConnected ? 'bg-green-100 text-green-600' : 'bg-white text-indigo-600 shadow-sm'}`}>
                            <FaStripe size={40} />
                        </div>
                        <div>
                            <h4 className="font-header font-bold text-lg text-gray-800">
                                {isConnected ? "Stripe Connected" : "Connect Stripe"}
                            </h4>
                            <p className="text-sm text-gray-500 font-paragraph">
                                {isConnected
                                    ? "Your account is ready to receive donations directly to your bank."
                                    : "Connect your Stripe account to start accepting support from your audience."}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsConnected(!isConnected)}
                        className={`px-8 py-3 rounded-full font-bold transition-all active:scale-95 whitespace-nowrap ${
                            isConnected
                                ? "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                : "bg-[#635bff] text-white hover:bg-[#5a52e0] shadow-md"
                        }`}
                    >
                        {isConnected ? "Disconnect" : "Connect with Stripe"}
                    </button>
                </div>
            </div>

            {/* Billing/Donation History Section */}
            <div className="flex flex-col gap-4">
                <h4 className="font-header font-bold text-xl text-gray-800 px-2">Recent Payouts</h4>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {userDonations.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-paragraph">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-600">Date</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-600">Amount</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {userDonations.map((donation) => (
                                        <tr key={donation.donation_id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-600">{donation.donated_date}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-primary-dark">${donation.donated_amount}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Paid
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
    )
}

export default Payment;