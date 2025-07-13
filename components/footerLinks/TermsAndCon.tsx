import { metaData } from "../../assets/assets";

function TermsAndCon() {
  const terms = [
    { term: 'Scope of Service', condition: 'We provide software development and related services as described in project proposals, Statements of Work (SOW), or contracts. The scope, timeline, and cost will be mutually agreed upon in writing before the start of any engagement.'},
    {term: 'Client Responsibility', condition: 'Provide timely access to required resources and personnel. Supply accurate and complete information needed for project execution. Review deliverables promptly and provide feedback.'},
    { term: 'Payment terms', condition: 'Payment terms will be outlined in individual agreements or SOWs. Invoices are payable within [e.g., 15/30] days of receipt. Late payments may incur interest of [e.g., 1.5%] per month or the maximum allowed by law.'},
    { term: 'Intellectual Property', condition: 'Unless otherwise agreed in writing, the client will own the final deliverables upon full payment. We retain the right to use pre-existing tools, libraries, and code frameworks in multiple projects. We may showcase general project descriptions in our portfolio unless confidentiality agreements prevent it.'},
    { term: 'Confidentialiy', condition: 'Both parties agree to keep all proprietary information and trade secrets confidential and use them only for the purpose of the project' },
    { term: 'Warranties and Disclaimers', condition: 'We warrant that our Services will be provided with reasonable skill and care. We do not guarantee that software will be error-free or compatible with all third-party systems unless explicitly stated. All deliverables are provided "as-is" unless otherwise specified.'},
    { term: 'Limitation of Liability', condition: 'To the fullest extent permitted by law, our liability for any claim arising out of the Services will be limited to the total fees paid by the client for the specific project giving rise to the claim.'},
    { term: 'Termination', condition : 'Either party may terminate the agreement with [e.g., 14 days] written notice. On termination. The client must pay for work completed up to the termination date. We will deliver any completed and paid-for work to the client.'},
    { term: 'Governing Law', condition:'These Terms shall be governed by and construed in accordance with the laws of Cameroon/Litoral, without regard to its conflict of law provisions.'},
    { term: 'Changes to Terms', condition: 'We may update these Terms from time to time. Clients will be notified of significant changes and continued use of Services constitutes acceptance of the new Terms.'},
    

  ]
 
  return (
    <div className="text-sm w-[95%] lg:w-2xl mx-auto border border-gray-500 mb-8 p-8 rounded-lg">
      <h1 className="heading3 mano text-center">TERMS AND CONDITION</h1>
      <p className="flex gap-4 my-8 ">
        <span className="text-gray-500">Last Updated</span>
        <span>05/05/2025</span>
      </p>
      <p className="my-4">
      Welcome to <span>{metaData.name}</span>  These Terms and Conditions govern the
      use of our services, including software development, consulting,
      maintenance, and any associated deliverables (collectively, the
      "Services"). By engaging with our Services, you agree to be bound by these
      Terms
      </p>
      <ul>
        { terms.map(term => (
          <li className="my-4">
            <h3 className="heading4 text-black/80 dark:text-white/70">{term.term}</h3>
            <p>{term.condition}</p>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default TermsAndCon;
