import { Suspense } from "react";
import type { Metadata } from "next";
import PaymentResultClient from "@/components/payment/PaymentResultClient";

// Transactional, per-order page — never meant to be indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function PaymentResultLoading() {
  return (
    <div className="bg-luxury-ivory min-h-[60vh] flex items-center justify-center px-6 py-16 md:py-24">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-sm border border-gold/15 p-8 md:p-10 text-center">
        <div className="w-12 h-12 mx-auto mb-6 rounded-full border-4 border-gold/20 border-t-gold animate-spin" />
        <h3 className="text-xl font-medium text-luxury-dark mb-2">Loading…</h3>
      </div>
    </div>
  );
}

// useSearchParams() in PaymentResultClient requires a Suspense boundary.
export default function PaymentResultPage() {
  return (
    <Suspense fallback={<PaymentResultLoading />}>
      <PaymentResultClient />
    </Suspense>
  );
}
