import { useState } from "react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6  shadow-lg border border-gray-400 rounded-lg">
      <header className="mb-8 border-b pb-4">
        <div className="flex items-center justify-center mb-4">
          <h1 className="heading3 mano text-center">Privacy Policy</h1>
        </div>
        <p className="text-gray-600">Last Updated: May 8, 2025</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <nav className="md:w-1/3  p-4 rounded-lg sticky top-0 h-fit">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Contents</h2>
          <ul className="space-y-2">
            {[
              { id: "introduction", label: "Introduction" },
              { id: "information-collected", label: "Information We Collect" },
              {
                id: "use-of-information",
                label: "How We Use Your Information",
              },
              { id: "data-sharing", label: "Information Sharing" },
              { id: "data-security", label: "Data Security" },
              { id: "user-rights", label: "Your Rights" },
              { id: "cookies", label: "Cookies & Tracking" },
              { id: "children", label: "Children's Privacy" },
              { id: "international", label: "International Data Transfers" },
              { id: "changes", label: "Changes to This Policy" },
              { id: "contact", label: "Contact Us" },
            ].map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left w-full py-1 px-2 rounded ${
                    activeSection === section.id
                      ? "bg-gray-200 dark:bg-gray-800/50  font-medium"
                      : "text-gray-700 dark:text-neutral-500 hover:bg-gray-300 hover:dark:bg-gray-700"
                  } cursor-pointer`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="md:w-2/3 space-y-8">
          <section id="introduction" className="scroll-mt-4">
            <h2 className="text-2xl font-bold  mb-3">
              Introduction
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-400">
              Welcome to Banginic. We respect your privacy and are committed to
              protecting your personal data. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our services, applications, or visit our website.
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              Banginic is a software development company based in Cameroon,
              operating under Cameroonian law and complying with applicable
              international data protection regulations.
            </p>
          </section>

          <section id="information-collected" className="scroll-mt-4">
            <h2 className="text-2xl font-bold  mb-3">
              Information We Collect
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold ">
                  Personal Information
                </h3>
                <p className="text-gray-700 dark:text-gray-400">
                  We may collect personal information that you voluntarily
                  provide when using our services, including but not limited to
                  your name, email address, phone number, company information,
                  and payment details.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold ">
                  Usage Information
                </h3>
                <p className="text-gray-700 dark:text-gray-400">
                  We automatically collect certain information about how you
                  interact with our services, including IP address, device
                  information, browser type, pages visited, and time spent on
                  our platforms.
                </p>
              </div>
            </div>
          </section>

          <section id="use-of-information" className="scroll-mt-4">
            <h2 className="text-2xl font-bold mb-3">
              How We Use Your Information
            </h2>
            <p className="mb-3 text-gray-700 dark:text-gray-400">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-400">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and sending related information</li>
              <li>
                Responding to your requests and providing customer support
              </li>
              <li>
                Sending administrative messages, updates, and security alerts
              </li>
              <li>
                Marketing and promoting our services (with your consent where
                required)
              </li>
              <li>Analyzing usage patterns to enhance user experience</li>
              <li>Protecting our rights, property, or safety</li>
            </ul>
          </section>

          <section id="data-sharing" className="scroll-mt-4">
            <h2 className="text-2xl font-bold  mb-3">
              Information Sharing
            </h2>
            <p className="mb-3 text-gray-700 dark:text-gray-400">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-400">
              <li>Service providers who perform services on our behalf</li>
              <li>
                Business partners with whom we jointly offer products or
                services
              </li>
              <li>
                Legal authorities when required by law or to protect our rights
              </li>
              <li>
                In connection with a business transaction such as a merger or
                acquisition
              </li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-400">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section id="data-security" className="scroll-mt-4">
            <h2 className="text-2xl font-bold  mb-3">
              Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-400">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section id="user-rights" className="scroll-mt-4">
            <h2 className="text-2xl font-bold  mb-3">
              Your Rights
            </h2>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              Depending on your location, you may have the following rights
              regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-400">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              To exercise these rights, please contact us using the information
              provided in the "Contact Us" section.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-4">
            <h2 className="text-2xl font-bold mb-3">
              Cookies & Tracking
            </h2>
            <p className="mb-3 text-gray-700 dark:text-gray-400">
              We use cookies and similar tracking technologies to enhance your
              experience on our website, analyze usage patterns, and for
              marketing purposes. You can manage your cookie preferences through
              your browser settings.
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              Our cookies may collect information about your browsing behavior,
              preferences, and device information.
            </p>
          </section>

          <section id="children" className="scroll-mt-4">
            <h2 className="text-2xl font-bold  mb-3">
              Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-400">
              Our services are not intended for children under the age of 16. We
              do not knowingly collect personal information from children. If
              you believe we have collected information from a child, please
              contact us immediately.
            </p>
          </section>

          <section id="international" className="scroll-mt-4">
            <h2 className="text-2xl font-bold  mb-3">
              International Data Transfers
            </h2>
            <p className="text-gray-700 dark:text-gray-400">
              As a company based in Cameroon, we may process, transfer, and
              store your information in countries outside your residence
              jurisdiction, including Cameroon and other countries where our
              service providers are located. We ensure appropriate safeguards
              are in place to protect your information when transferred
              internationally.
            </p>
          </section>

          <section id="changes" className="scroll-mt-4">
            <h2 className="text-2xl font-bold  mb-3">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-400">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the new Privacy Policy on this page and updating the "Last
              Updated" date. We encourage you to review this Privacy Policy
              periodically.
            </p>
          </section>

          <section id="contact" className="scroll-mt-4">
            <h2 className="text-2xl font-bold  mb-3">
              Contact Us
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-400">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-medium text-gray-800 dark:text-gray-400">Banginic</p>
              <p className="text-gray-700 dark:text-gray-400">Email: privacy@banginic.com</p>
              <p className="text-gray-700 dark:text-gray-400">Phone: +237 XXX XXX XXX</p>
              <p className="text-gray-700 dark:text-gray-400">
                Address: [Your Company Address], Cameroon
              </p>
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-12 pt-6 border-t text-center text-gray-600">
        <p>© {new Date().getFullYear()} Banginic. All rights reserved.</p>
      </footer>
    </div>
  );
}
