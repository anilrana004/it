import WhyChooseIndianTreksSection from '@/components/WhyChooseIndianTreksSection';
import WhyChooseVideo from '@/components/WhyChooseVideo';

export default function WhyTravelWithUs() {
  return (
    <WhyChooseIndianTreksSection
      titleId="it-whyus-title"
      afterContent={
        <div className="it-why__video-slot">
          <WhyChooseVideo className="it-whyvid--plain" />
        </div>
      }
    />
  );
}
