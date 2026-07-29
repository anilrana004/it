export default function TermsPage() {
  return (
    <div className="pt-20 lg:pt-28 pb-12 lg:pb-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1a1a2e] mb-6">Terms & Conditions</h1>
        <div className="text-gray-700 text-sm space-y-4">
          <p>By booking a trip with TrekRoot, you agree to the following terms and conditions.</p>
          <h3 className="font-bold text-gray-900 text-lg">Booking Confirmation</h3>
          <p>Your booking is confirmed only after payment is received. A confirmation will be sent via email and WhatsApp.</p>
          <h3 className="font-bold text-gray-900 text-lg">Travel Insurance</h3>
          <p>Travel insurance is mandatory for all treks. We recommend purchasing comprehensive travel insurance that covers high-altitude trekking, medical evacuation, and trip cancellation.</p>
          <h3 className="font-bold text-gray-900 text-lg">Health & Fitness</h3>
          <p>Participants must be in good health and disclose any pre-existing medical conditions. We reserve the right to deny participation if a participant is deemed unfit for the trek.</p>
          <h3 className="font-bold text-gray-900 text-lg">Liability</h3>
          <p>TrekRoot acts as an organizer and is not liable for any injuries, losses, or damages incurred during the trip. Participants join at their own risk.</p>
          <h3 className="font-bold text-gray-900 text-lg">Modifications</h3>
          <p>We reserve the right to modify itineraries due to weather conditions, natural disasters, or other unforeseen circumstances without prior notice.</p>
        </div>
      </div>
    </div>
  );
}
