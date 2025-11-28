import { motion } from 'framer-motion';
import { SEO } from '@/components/common/SEO';
import { DotPattern } from '@/components/ui/dot-pattern';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <SEO 
        title="Privacy Policy | Customs Consulting"
        description="Privacy Policy for Customs Consulting services."
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <DotPattern
          className="opacity-10"
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
        />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-baloo font-bold text-[#F2CA50] mb-8 text-center">
            Privacy Policy
          </h1>
          
          <div className="space-y-8 text-gray-300 font-sans leading-relaxed bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
            <section>
              <h2 className="text-2xl font-baloo font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Welcome to UAB "Customs Consulting". We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website 
                and tell you about your privacy rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-baloo font-bold text-white mb-4">2. Information We Collect</h2>
              <p>
                Our website primarily serves as an informational platform. We do not use Google Analytics or similar 
                third-party tracking cookies to monitor your browsing behavior.
              </p>
              <p className="mt-4">
                The only personal data we collect is the information you voluntarily provide to us through our contact form. 
                This may include:
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Any other information you choose to provide in your message</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-baloo font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information you provide solely for the purpose of communicating with you. 
                This includes responding to your inquiries, providing quotes for our services, and addressing any questions 
                you may have about our customs consulting services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-baloo font-bold text-white mb-4">4. Cookies and Tracking</h2>
              <p>
                We believe in keeping your browsing experience private. We do not use tracking cookies or analytics software 
                (such as Google Analytics) to track your movements across our website. 
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-baloo font-bold text-white mb-4">5. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
                used, or accessed in an unauthorized way, altered, or disclosed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-baloo font-bold text-white mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4">
                <p><strong className="text-white">Email:</strong> info@customsconsulting.eu</p>
                <p><strong className="text-white">Phone:</strong> +370 650 88892</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

