import { useEffect, useRef, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { useSendTip } from "../pages/Posts/hooks/useSendTip.js";
import { useQueryClient } from "@tanstack/react-query";

const IyzicoConfirm = ({ amount, recipientUsername, postId, onClose, onDonationSuccess }) => {
    const { mutateAsync: sendTip } = useSendTip();
    const queryClient = useQueryClient();
    const [htmlContent, setHtmlContent] = useState(null);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const startedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        (async () => {
            try {
                const data = await sendTip({ amount, recipientUsername, postId });

                if (data?.htmlContent) {
                    setHtmlContent(atob(data.htmlContent));
                } else if (data && data.status === "SUCCESS") {
                    setResult(data);
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Donation failed. Please try again.");
            }
        })();
    }, [amount, recipientUsername, postId, sendTip]);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type !== "iyzico-donation-result") return;

            if (event.data.success) {
                setResult(event.data.result);

                // 1. Background cache sync
                queryClient.invalidateQueries({ queryKey: ["posts"] });
                queryClient.invalidateQueries({ queryKey: ["donationHistory"] });
                queryClient.invalidateQueries({ queryKey: ["actions"] });

                // 2. Instant UI update notification
                if (onDonationSuccess) {
                    onDonationSuccess(amount);
                }
            } else {
                setError(event.data.message || "Donation failed. Please try again.");
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [recipientUsername, queryClient, amount, onDonationSuccess]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-dialog-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onKeyDown={(e) => e.key === "Escape" && onClose()}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center z-10">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GiTwoCoins className="w-8 h-8 text-amber-600" />
                </div>

                <h3 id="donate-dialog-title" className="text-xl font-bold text-gray-800 mb-2">Support Creator</h3>

                {result ? (
                    <>
                        <p className="text-gray-600 mb-8">
                            Thank you for donating <span className="font-bold text-primary-dark">${result.amount ?? amount}</span> to{" "}
                            <span className="font-bold text-primary-dark">@{result.recipient || recipientUsername}</span>!
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-3 px-4 rounded-xl font-bold bg-primary-dark text-white hover:opacity-90 transition-opacity"
                        >
                            Close
                        </button>
                    </>
                ) : error ? (
                    <>
                        <p className="text-red-500 mb-8">{error}</p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-3 px-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            Close
                        </button>
                    </>
                ) : htmlContent ? (
                    <>
                        <p className="text-gray-600 mb-4 text-sm">
                            Confirm your <span className="font-bold text-primary-dark">${amount}</span> donation to{" "}
                            <span className="font-bold text-primary-dark">@{recipientUsername}</span> with Iyzico.
                        </p>
                        <iframe
                            title="Iyzico 3D Secure Confirmation"
                            srcDoc={htmlContent}
                            className="w-full h-96 rounded-xl border border-gray-100"
                            sandbox="allow-scripts allow-forms" // Secured context sandbox restriction
                        />
                    </>
                ) : (
                    <p className="text-gray-500 mb-8">Preparing your donation with Iyzico...</p>
                )}
            </div>
        </div>
    );
};

export default IyzicoConfirm;