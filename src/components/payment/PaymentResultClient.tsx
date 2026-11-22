"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface ConfirmData {
  client_name?: string;
  currency?: string;
  paid_amount?: string;
  payment_status?: string;
  approval_code?: string;
  transaction_ref?: string;
  transaction_date?: string;
  response_description?: string;
}

interface ConfirmResponse {
  status: "success" | "failed" | "error";
  orderNo?: string;
  approved: boolean;
  message: string;
  data?: ConfirmData;
}

// The redirect back from the payment gateway carries the whole confirm
// result as base64 in ?data= (the backend already verified the transaction
// server-side before redirecting) — so this only ever needs to decode, never
// fetch. atob() gives a binary string; decode it as UTF-8 so non-ASCII
// guest names round-trip correctly.
function decodePayload(encoded: string): ConfirmResponse | null {
  try {
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as ConfirmResponse;
  } catch {
    return null;
  }
}

export default function PaymentResultClient() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get("data");

  const result = useMemo(() => (encoded ? decodePayload(encoded) : null), [encoded]);
  const state: "success" | "failed" | "error" = !result ? "error" : result.approved ? "success" : "failed";

  return (
    <div className="bg-luxury-ivory min-h-[60vh] flex items-center justify-center px-6 py-16 md:py-24">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-sm border border-gold/15 p-8 md:p-10 text-center">
        {state === "success" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gold">
              <svg className="w-8 h-8 text-luxury-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-luxury-dark mb-3">Payment Successful</h3>
            <p className="mb-6 text-luxury-muted">
              {result?.message || "Your payment has been received. Thank you!"}
            </p>
            {result?.data && (
              <dl className="text-sm text-left space-y-2 mb-6 border-t border-gold/15 pt-6">
                {result.data.transaction_ref && (
                  <div className="flex justify-between">
                    <dt className="text-luxury-muted">Reference</dt>
                    <dd className="text-luxury-dark">{result.data.transaction_ref}</dd>
                  </div>
                )}
                {result.data.paid_amount && (
                  <div className="flex justify-between">
                    <dt className="text-luxury-muted">Amount</dt>
                    <dd className="text-luxury-dark">{result.data.currency} {result.data.paid_amount}</dd>
                  </div>
                )}
                {result.data.transaction_date && (
                  <div className="flex justify-between">
                    <dt className="text-luxury-muted">Date</dt>
                    <dd className="text-luxury-dark">{result.data.transaction_date}</dd>
                  </div>
                )}
              </dl>
            )}
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-luxury-dark text-gold rounded-md hover:bg-gold hover:text-luxury-dark transition-colors font-medium"
            >
              Back to Home
            </Link>
          </>
        )}

        {state === "failed" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-red-100">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-luxury-dark mb-3">Payment Not Completed</h3>
            <p className="mb-6 text-luxury-muted">
              {result?.message || "Your payment was not completed or was cancelled."}
            </p>
            <Link
              href="/offers"
              className="inline-block px-8 py-3 bg-luxury-dark text-gold rounded-md hover:bg-gold hover:text-luxury-dark transition-colors font-medium"
            >
              Back to Offers
            </Link>
          </>
        )}

        {state === "error" && (
          <>
            <h3 className="text-xl font-medium text-luxury-dark mb-3">Something went wrong</h3>
            <p className="mb-6 text-luxury-muted">
              We couldn&apos;t confirm your payment status. Please contact us if you were charged.
            </p>
            <Link
              href="/contact-us"
              className="inline-block px-8 py-3 bg-luxury-dark text-gold rounded-md hover:bg-gold hover:text-luxury-dark transition-colors font-medium"
            >
              Contact Us
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
