import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { SeoHead } from '@/shared/seo'
import './TermsAndServices.css'

export default function TermsAndServices() {
  const navigate = useNavigate()

  return (
    <>
      <SeoHead page="terms" noIndex />
      <div className="tos-page">

      {/* ── Back button ── */}
      <button className="tos-back" onClick={() => navigate(-1)} aria-label="Go back">
        <FiArrowLeft size={16} />
        Back
      </button>

      {/* ── Document ── */}
      <main className="tos-main">
        <header className="tos-header">
          <p className="tos-org">Provincial Planning Secretariat – Southern Province</p>
          <h1 className="tos-title">Terms and Services</h1>
          <p className="tos-effective">Effective Date: 21 May 2026</p>
        </header>

        <p className="tos-intro">
          Welcome to the official website of the Provincial Planning Secretariat – Southern Province.
          By accessing and using this website, you agree to comply with and be bound by the following
          Terms and Services. If you do not agree with these terms, please do not use this website.
        </p>

        <hr className="tos-divider" />

        <Section n="1" title="Official Purpose of the Website">
          <p>
            This website is developed and maintained for official government and administrative purposes
            of the Provincial Planning Secretariat – Southern Province. The website provides information
            related to:
          </p>
          <ul>
            <li>Provincial development plans</li>
            <li>Government announcements</li>
            <li>Administrative information</li>
            <li>Public notices and reports</li>
            <li>Official departmental services</li>
            <li>Contact and communication details</li>
          </ul>
          <p>
            The information published on this website is intended for lawful public use and official
            reference purposes only.
          </p>
        </Section>

        <Section n="2" title="Acceptance of Terms">
          <p>By accessing this website, users agree to:</p>
          <ul>
            <li>Use the website only for lawful purposes</li>
            <li>Respect all applicable laws and regulations of Sri Lanka</li>
            <li>Avoid activities that may damage, disrupt, or misuse the website or its services</li>
          </ul>
          <p>
            The Secretariat reserves the right to modify or update these terms at any time without
            prior notice.
          </p>
        </Section>

        <Section n="3" title="Accuracy of Information">
          <p>
            The Secretariat attempts to ensure that all information published on the website is accurate
            and up to date. However:
          </p>
          <ul>
            <li>Information may occasionally contain errors or outdated content</li>
            <li>The Secretariat does not guarantee complete accuracy at all times</li>
            <li>Divisions are responsible for providing correct and real-time information</li>
          </ul>
          <p>
            Users are advised to contact the relevant division for official confirmation when necessary.
          </p>
        </Section>

        <Section n="4" title="Intellectual Property Rights">
          <p>All website content including:</p>
          <ul>
            <li>Text</li>
            <li>Logos</li>
            <li>Graphics</li>
            <li>Documents</li>
            <li>Photographs</li>
            <li>Videos</li>
            <li>Design elements</li>
          </ul>
          <p>
            are the property of the Provincial Planning Secretariat – Southern Province unless otherwise
            stated. Unauthorized copying, reproduction, modification, or distribution of website materials
            without written permission is prohibited.
          </p>
        </Section>

        <Section n="5" title="User Responsibilities">
          <p>Users shall not:</p>
          <ul>
            <li>Attempt unauthorized access to the website or server</li>
            <li>Upload malicious software, viruses, or harmful content</li>
            <li>Misuse official contact forms or communication systems</li>
            <li>Use the website for fraudulent or unlawful activities</li>
          </ul>
          <p>Any misuse may result in legal action under applicable laws.</p>
        </Section>

        <Section n="6" title="Privacy and Data Protection">
          <p>
            The Secretariat respects user privacy. Limited information such as:
          </p>
          <ul>
            <li>IP addresses</li>
            <li>Browser information</li>
            <li>Website usage statistics</li>
          </ul>
          <p>
            may be collected for security, analytics, and system improvement purposes. Personal
            information submitted through forms or official communications will be handled according
            to applicable government policies and confidentiality requirements.
          </p>
        </Section>

        <Section n="7" title="External Links">
          <p>
            This website may contain links to external government or third-party websites for
            informational purposes. The Provincial Planning Secretariat is not responsible for:
          </p>
          <ul>
            <li>Content accuracy on external websites</li>
            <li>Privacy policies of third-party services</li>
            <li>Availability or reliability of external resources</li>
          </ul>
          <p>Users access external websites at their own risk.</p>
        </Section>

        <Section n="8" title="Website Availability">
          <p>
            The Secretariat aims to maintain continuous website availability. However, temporary
            interruptions may occur due to:
          </p>
          <ul>
            <li>Maintenance activities</li>
            <li>Technical issues</li>
            <li>System upgrades</li>
            <li>Security updates</li>
          </ul>
          <p>
            The Secretariat shall not be held responsible for any losses caused by website downtime.
          </p>
        </Section>

        <Section n="9" title="Security">
          <p>Users must not attempt to:</p>
          <ul>
            <li>Breach website security</li>
            <li>Access restricted areas without authorization</li>
            <li>Interfere with website operations or servers</li>
          </ul>
          <p>Security violations may be investigated and reported to relevant authorities.</p>
        </Section>

        <Section n="10" title="Limitation of Liability">
          <p>
            The Provincial Planning Secretariat – Southern Province shall not be liable for:
          </p>
          <ul>
            <li>Direct or indirect damages</li>
            <li>Data loss</li>
            <li>Service interruptions</li>
            <li>Errors or omissions in website content</li>
          </ul>
          <p>arising from the use or inability to use the website.</p>
        </Section>

        <Section n="11" title="Governing Law">
          <p>
            These Terms and Services shall be governed in accordance with the laws and regulations
            of the Democratic Socialist Republic of Sri Lanka.
          </p>
        </Section>

        <Section n="12" title="Contact Information">
          <p>
            For official inquiries regarding the website or its content, please contact:
          </p>
          <address className="tos-address">
            <strong>Provincial Planning Secretariat – Southern Province</strong><br />
            Southern Provincial Council<br />
            Sri Lanka
          </address>
          <p>
            Official communications should be made only through authorized government channels.
          </p>
        </Section>

        <Section n="13" title="Changes to Terms and Services">
          <p>
            The Secretariat reserves the right to revise, modify, or update these Terms and Services
            at any time. Updated versions will be published on the official website with the effective
            date.
          </p>
        </Section>

        <hr className="tos-divider" />

        <footer className="tos-footer">
          © 2026 Provincial Planning Secretariat – Southern Province. All Rights Reserved.
        </footer>
      </main>

    </div>
    </>
  )
}

function Section({ n, title, children }) {
  return (
    <section className="tos-section">
      <h2 className="tos-section-title">
        <span className="tos-section-n">{n}.</span> {title}
      </h2>
      <div className="tos-section-body">{children}</div>
    </section>
  )
}
