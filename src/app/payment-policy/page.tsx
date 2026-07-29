export default function PaymentPolicyPage() {
  return (
    <div className="pt-20 lg:pt-28 pb-12 lg:pb-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#040921] mb-6">Payment Policy</h1>
        <div className="text-gray-700 text-sm space-y-4">
          <p>At TrekRoot, we strive to make booking your dream adventure as simple and flexible as possible. Here&apos;s how our payment structure works:</p>
          <h3 className="font-bold text-gray-900 text-lg">1. Booking Confirmation</h3>
          <p>To confirm your booking, you need to pay an advance deposit. The deposit amount varies based on your chosen package and trek.</p>
          <h3 className="font-bold text-gray-900 text-lg">2. Payment Options</h3>
          <ul className="list-disc pl-5 space-y-1"><li><strong>Full Payment:</strong> Pay the entire amount upfront and enjoy peace of mind.</li><li><strong>Partial Payment (50%):</strong> Pay 50% now and the remaining 50% before the trek start date.</li><li><strong>Advance Deposit:</strong> Pay only the deposit amount to block your seat and pay the rest later.</li></ul>
          <h3 className="font-bold text-gray-900 text-lg">3. Accepted Payment Methods</h3>
          <p>We accept payments via UPI, Credit/Debit Cards, Net Banking, and direct bank transfers.</p>
          <h3 className="font-bold text-gray-900 text-lg">4. Cancellation & Refund Policy</h3>
          <p>Cancellations made 30+ days before the trip: Full refund minus processing fees. 15-30 days: 50% refund. Less than 15 days: No refund.</p>
          <h3 className="font-bold text-gray-900 text-lg">5. Secure Payments</h3>
          <p>All transactions are processed securely. We do not store your payment information.</p>
        </div>
      </div>
    </div>
  );
}
