import enterpriseHero from '../assets/enterprise-hero.png'
import iconHr from '../assets/enterprise-icon-hr.svg'
import iconLegal from '../assets/enterprise-icon-legal.svg'
import iconFinance from '../assets/enterprise-icon-finance.svg'
import iconOps from '../assets/enterprise-icon-ops.svg'
import iconMgmt from '../assets/enterprise-icon-mgmt.svg'

import governmentHero from '../assets/industry-hero-government.png'
import healthcareHero from '../assets/industry-hero-healthcare.png'
import educationHero from '../assets/industry-hero-education.png'
import legalHero from '../assets/industry-hero-legal.png'
import financeHero from '../assets/industry-hero-finance.png'
import energyHero from '../assets/industry-hero-energy.png'
import manufacturingHero from '../assets/industry-hero-manufacturing.png'

import govFrontline from '../assets/industry-icons/gov-1.svg'
import govPlanning from '../assets/industry-icons/gov-2.svg'
import govManagement from '../assets/industry-icons/gov-3.svg'
import govRecords from '../assets/industry-icons/gov-4.svg'
import govProcurement from '../assets/industry-icons/gov-5.svg'

import hcNurse from '../assets/industry-icons/hc-1.svg'
import hcBilling from '../assets/industry-icons/hc-2.svg'
import hcQuality from '../assets/industry-icons/hc-3.svg'
import hcRecords from '../assets/industry-icons/hc-4.svg'
import hcManagement from '../assets/industry-icons/hc-5.svg'

import edRegistrar from '../assets/industry-icons/ed-1.svg'
import edFaculty from '../assets/industry-icons/ed-2.svg'
import edQuality from '../assets/industry-icons/ed-3.svg'
import edStudent from '../assets/industry-icons/ed-4.svg'
import edManagement from '../assets/industry-icons/ed-5.svg'

import lgContracts from '../assets/industry-icons/lg-1.svg'
import lgResearch from '../assets/industry-icons/lg-2.svg'
import lgMatter from '../assets/industry-icons/lg-3.svg'
import lgManagement from '../assets/industry-icons/lg-4.svg'
import lgTemplates from '../assets/industry-icons/lg-5.svg'

import fiBranch from '../assets/industry-icons/fi-1.svg'
import fiCompliance from '../assets/industry-icons/fi-2.svg'
import fiOps from '../assets/industry-icons/fi-3.svg'
import fiCredit from '../assets/industry-icons/fi-4.svg'
import fiProduct from '../assets/industry-icons/fi-5.svg'

import enService from '../assets/industry-icons/en-1.svg'
import enFinance from '../assets/industry-icons/en-2.svg'
import enRegulatory from '../assets/industry-icons/en-3.svg'
import enManagement from '../assets/industry-icons/en-4.svg'
import enOps from '../assets/industry-icons/en-5.svg'

import mfProduction from '../assets/industry-icons/mf-1.svg'
import mfQuality from '../assets/industry-icons/mf-2.svg'
import mfSafety from '../assets/industry-icons/mf-3.svg'
import mfMaintenance from '../assets/industry-icons/mf-4.svg'
import mfSupplier from '../assets/industry-icons/mf-5.svg'

const ACCENTS = ['cyan', 'orange', 'green', 'red', 'magenta']

function teams(items) {
  return items.map((item, index) => ({ ...item, accent: ACCENTS[index] }))
}

export const INDUSTRY_CARDS = [
  { title: 'Government', href: '/government' },
  { title: 'Healthcare', href: '/healthcare' },
  { title: 'Education', href: '/education' },
  { title: 'Legal', href: '/legal' },
  { title: 'Finance', href: '/financial-services' },
]

export const industries = {
  enterprise: {
    eyebrow: 'Enterprise',
    title: 'Turn Company Knowledge Into Work',
    description:
      'Large organizations manage information across departments, systems, and teams. Turning that information into reports, summaries, proposals, and briefings can take significant time.',
    note: 'Eveia.AI helps enterprise teams use approved company knowledge to prepare work faster',
    hero: enterpriseHero,
    heroAlt: 'Two enterprise colleagues standing with their arms crossed',
    howTitle: 'How Enterprise Teams Use Eveia.AI',
    howBody:
      'Eveia.AI supports teams across the organization, from HR and legal to finance, operations, and management. Give each team access to the approved knowledge they need to complete their work faster.',
    teams: teams([
      { title: 'HR', body: 'Prepare policy summaries, employee briefs, and internal documents.', icon: iconHr },
      { title: 'Legal', body: 'Work with contracts, agreements, and approved legal materials.', icon: iconLegal },
      { title: 'Finance', body: 'Prepare reports and summaries using financial and operational information.', icon: iconFinance },
      { title: 'Operations', body: 'Consolidate updates, procedures, and project information.', icon: iconOps },
      { title: 'Management', body: 'Turn organizational knowledge into reports, briefings, and decision support.', icon: iconMgmt },
    ]),
    builtBefore: 'Built for ',
    builtHighlight: 'Enterprise',
    builtAfter: ' Requirements',
    builtLead: 'Eveia.AI is designed for organizations that need control over sensitive information.',
    requirements: [
      'Role-based access',
      'Source-supported outputs',
      'Private deployment options',
      'Cloud or on-premise deployment',
      'Data kept separate from other organizations',
      'Human review before information is used for decisions',
    ],
    builtClose: 'Eveia.AI assists your teams. People remain responsible for reviewing outputs and making decisions.',
    ctaTitle: 'Start With a Practical Use Case',
    ctaBody:
      'Start with one team, process, or type of work. We can show you how Eveia.AI can use your approved organizational knowledge to produce work your team already needs.',
  },
  government: {
    eyebrow: 'Government',
    title: 'Turn Government Documents Into Useful Work',
    description:
      'Government agencies manage large volumes of circulars, memoranda, policies, reports, procurement documents, and records.',
    note: 'Eveia.AI helps teams use approved agency information to prepare reports, summaries, briefings, and source-supported answers.',
    hero: governmentHero,
    heroAlt: 'Government team using Eveia.AI',
    howTitle: 'How Government Teams Use Eveia.AI',
    howBody:
      'Eveia.AI supports teams across government agencies, from frontline services to management. Give each team access to the approved information they need to prepare work faster and with greater confidence.',
    teams: teams([
      { title: 'Frontline Services', body: 'Get answers based on current approved policies and issuances', icon: govFrontline },
      { title: 'Legal & Records', body: 'Review relevant rules, documents, and previous issuances.', icon: govRecords },
      { title: 'Procurement', body: 'Work with procurement documents, requirements, and records.', icon: govProcurement },
      { title: 'Planning & Programs', body: 'Prepare reports and summaries from information across divisions.', icon: govPlanning },
      { title: 'Management', body: 'Turn agency knowledge into briefings and decision-support materials.', icon: govManagement },
    ]),
    builtBefore: 'Built for ',
    builtHighlight: 'Public Sector',
    builtAfter: ' Requirements',
    builtLead: 'Eveia.AI supports government agencies with:',
    requirements: [
      'Source-supported answers for easier verification',
      'Role-based access for sensitive information',
      'Private deployment, including on-premise options',
      'Approved agency documents and data as the knowledge base',
      'Human review before information is used for official decisions',
    ],
    builtClose:
      "Eveia.AI assists government teams with their work. It does not replace the responsible officer or make official decisions on the agency's behalf.",
    ctaTitle: 'Start With One Use Case',
    ctaBody:
      "Choose one service, division, or document-heavy process and see how Eveia.AI can work with your agency's own information.",
  },
  healthcare: {
    eyebrow: 'Healthcare',
    title: 'Private Enterprise AI for Healthcare Teams',
    description:
      'Healthcare organizations manage protocols, policies, formularies, claims requirements, accreditation records, and other sensitive information.',
    note: 'Eveia.AI helps teams use approved organizational knowledge to prepare reports, summaries, and source-supported answers while keeping access controlled.',
    hero: healthcareHero,
    heroAlt: 'Healthcare professionals',
    howTitle: 'How Healthcare Teams Use Eveia.AI',
    howBody:
      'Eveia.AI helps healthcare teams work with the information they rely on every day. Use approved organizational knowledge to prepare documents, summaries, and reports while maintaining controlled access to sensitive information.',
    teams: teams([
      { title: 'Nursing & Operations', body: 'Access current protocols and procedures.', icon: hcNurse },
      { title: 'Quality & Accreditation', body: 'Review relevant rules, documents, and previous issuances.', icon: hcQuality },
      { title: 'Medical Records', body: 'Work with documentation and records requirements.', icon: hcRecords },
      { title: 'Billing & Claims', body: 'Review claims and reimbursement requirements.', icon: hcBilling },
      { title: 'Management', body: 'Turn policies, reports, and operational information into useful briefs.', icon: hcManagement },
    ]),
    builtBefore: 'Built for ',
    builtHighlight: 'Healthcare',
    builtAfter: ' Data',
    builtLead: 'Eveia.AI supports healthcare organizations with:',
    requirements: [
      'Source-supported answers for easier verification',
      'Role-based access for sensitive information',
      'Private deployment, including on-premise options',
      'Approved documents and data as the knowledge base',
      'Human review before information is used',
    ],
    builtClose:
      'Eveia.AI does not diagnose, recommend treatment, or replace clinical judgment. It works with your approved organizational information and shows the source behind its outputs.',
    ctaTitle: 'Start With Your Healthcare Documents',
    ctaBody:
      'Begin with protocols, policies, formularies, claims requirements, or accreditation documents. See how Eveia.AI can support your team using information you already have.',
  },
  education: {
    eyebrow: 'Education',
    title: 'Private Enterprise AI for Schools and Universities',
    description:
      'Schools and universities manage handbooks, curricula, faculty policies, accreditation documents, and other institutional knowledge.',
    note: 'Eveia.AI helps education teams use approved information to prepare reports, summaries, briefings, and source-supported answers.',
    hero: educationHero,
    heroAlt: 'Education team',
    howTitle: 'How Education Teams Use Eveia.AI',
    howBody:
      'Education teams work with information across departments, programs, and administrative functions. Eveia.AI helps authorized users work with approved institutional knowledge in one private and controlled environment.',
    teams: teams([
      { title: 'Registrar & Admissions', body: 'Work with enrollment, admission, and academic policies.', icon: edRegistrar },
      { title: 'Faculty & Program Teams', body: 'Review curricula, faculty manuals, and program requirements.', icon: edFaculty },
      { title: 'Quality & Accreditation', body: 'Prepare summaries and organize accreditation materials.', icon: edQuality },
      { title: 'Student Affairs', body: 'Work with policies, procedures, and institutional guidelines.', icon: edStudent },
      { title: 'Management', body: 'Turn institutional knowledge into reports and decision-support materials.', icon: edManagement },
    ]),
    builtBefore: 'Built for ',
    builtHighlight: 'Education',
    builtAfter: '',
    builtLead: 'Eveia.AI supports schools and universities with:',
    requirements: [
      'Source-supported answers for easier verification',
      'Role-based access for sensitive information',
      'Private deployment, including on-premise options',
      'Approved institutional documents as the knowledge base',
      'Human review before information is used',
    ],
    builtClose:
      'Student records and other personal information can be handled separately with appropriate access controls and privacy requirements.',
    ctaTitle: 'Start With Your Institutional Knowledge',
    ctaBody:
      'Begin with handbooks, curricula, faculty manuals, accreditation documents, or other approved materials. See how Eveia.AI can support your institution using information you already have.',
  },
  legal: {
    eyebrow: 'Legal',
    title: 'Private Enterprise AI for Legal Work',
    description:
      'Legal teams work with contracts, opinions, pleadings, templates, matter files, and other confidential documents.',
    note: 'Eveia.AI helps teams use approved legal knowledge to prepare work faster, with source-supported outputs and controlled access.',
    hero: legalHero,
    heroAlt: 'Legal professionals',
    howTitle: 'How Legal Teams Use Eveia.AI',
    howBody:
      'Legal teams work across matters, documents, and internal resources that require careful handling. Eveia.AI helps authorized users work with approved legal knowledge to prepare work faster while keeping confidential information controlled.',
    teams: teams([
      { title: 'Contracts', body: 'Review previous agreements, clauses, and approved fallback positions.', icon: lgContracts },
      { title: 'Legal Research', body: 'Find relevant internal opinions, advice, and previous work.', icon: lgResearch },
      { title: 'Matter Management', body: 'Work with information from connected matter files.', icon: lgMatter },
      { title: 'Templates & Precedents', body: 'Access current templates and previous legal work.', icon: lgTemplates },
      { title: 'Management', body: 'Prepare summaries and briefings from approved legal documents.', icon: lgManagement },
    ]),
    builtBefore: 'Built for Confidential ',
    builtHighlight: 'Legal',
    builtAfter: ' Work',
    builtLead: 'Eveia.AI supports legal teams with:',
    requirements: [
      'Role-based access for confidential information',
      'Source-supported outputs for easier verification',
      'Private deployment, including on-premise options',
      'Approved documents as the knowledge base',
      'Human review before information is relied upon',
    ],
    builtClose:
      'Eveia.AI does not provide legal advice or replace professional judgment. Lawyers remain responsible for reviewing and verifying information before relying on it.',
    ctaTitle: 'Start With Your Legal Knowledge',
    ctaBody:
      'Begin with your precedent library, templates, contracts, or other approved documents. See how Eveia.AI can help your legal team work with its own knowledge.',
  },
  finance: {
    eyebrow: 'Financial Services',
    title: 'Private Enterprise AI for Financial Teams',
    description:
      'Banks, insurers, and financial institutions manage product terms, fees, policies, regulatory documents, and operational procedures.',
    note: 'Eveia.AI helps teams use approved institutional knowledge to prepare work and provide source-supported answers faster.',
    hero: financeHero,
    heroAlt: 'Financial services team',
    howTitle: 'How Financial Teams Use Eveia.AI',
    howBody:
      'Financial institutions manage information across teams, products, and processes. Eveia.AI brings approved institutional knowledge into a private, controlled environment to support everyday financial work.',
    teams: teams([
      { title: 'Branch & Customer Service', body: 'Access current product information and procedures.', icon: fiBranch },
      { title: 'Compliance', body: 'Review policies, circulars, and internal requirements.', icon: fiCompliance },
      { title: 'Credit & Underwriting', body: 'Work with credit policies and approval guidelines.', icon: fiCredit },
      { title: 'Operations', body: 'Prepare reports and work with process documentation.', icon: fiOps },
      { title: 'Product Teams', body: 'Review product terms, fees, and related documentation.', icon: fiProduct },
    ]),
    builtBefore: 'Built for ',
    builtHighlight: 'Financial Services',
    builtAfter: '',
    builtLead: 'Eveia.AI supports financial institutions with:',
    requirements: [
      'Role-based access for sensitive information',
      'Source-supported outputs for easier verification',
      'Private deployment, including on-premise options',
      'Approved policies and documents as the knowledge base',
      'Controlled access to customer information',
      'Human review before information is used',
    ],
    builtClose:
      'Eveia.AI does not interpret regulations or make compliance decisions. It works with your approved documents and shows the sources so responsible teams can review and verify the information.',
    ctaTitle: 'Start With One Product Line',
    ctaBody:
      'Begin with one product, its terms, fees, policies, and documentation requirements. See how Eveia.AI can help your team work with approved information faster.',
  },
  energy: {
    eyebrow: 'Energy & Utilities',
    title: 'Private Enterprise AI for Energy Teams',
    description:
      'Energy companies and utilities manage rate schedules, service standards, regulatory filings, maintenance records, safety procedures, and other operational documents.',
    note: 'Eveia.AI helps teams use approved organizational knowledge to prepare work and access source-supported answers faster.',
    hero: energyHero,
    heroAlt: 'Energy and utilities team',
    howTitle: 'How Energy & Utility Teams Use Eveia.AI',
    howBody:
      'Eveia.AI helps energy and utility teams work with the information they rely on every day. Use approved procedures, records, reports, and regulatory documents to support everyday work with controlled access.',
    teams: teams([
      { title: 'Customer Service & Billing', body: 'Work with approved rates, service standards, and procedures.', icon: enService },
      { title: 'Regulatory Affairs', body: 'Prepare reports and work with filings, orders, and submissions.', icon: enRegulatory },
      { title: 'Operations & Engineering', body: 'Access safety procedures, maintenance records, and service requirements.', icon: enOps },
      { title: 'Finance', body: 'Review approved rates and related financial information.', icon: enFinance },
      { title: 'Management', body: 'Prepare reports and briefings using organizational knowledge.', icon: enManagement },
    ]),
    builtBefore: 'Built for ',
    builtHighlight: 'Energy & Utilities',
    builtAfter: '',
    builtLead: 'Eveia.AI supports energy organizations with:',
    requirements: [
      'Source-supported outputs for easier verification',
      'Role-based access for sensitive information',
      'Private deployment, including on-premise options',
      'Approved documents and data as the knowledge base',
      'Human review before information is used',
    ],
    builtClose:
      'Eveia.AI does not interpret regulations or make regulatory decisions. It retrieves information from your approved documents and shows the source so responsible teams can review and verify it.',
    ctaTitle: 'Start With Rates and Service Standards',
    ctaBody:
      'Begin with approved rate schedules, service standards, or other frequently used documents. See how Eveia.AI can help your team work with organizational knowledge faster.',
  },
  manufacturing: {
    eyebrow: 'Manufacturing',
    title: 'Private Enterprise AI for Manufacturing Teams',
    description:
      'Manufacturing teams work with specifications, SOPs, work instructions, quality records, safety procedures, and maintenance documents.',
    note: 'Eveia.AI helps teams use approved manufacturing knowledge to prepare work and access source-supported answers faster.',
    hero: manufacturingHero,
    heroAlt: 'Manufacturing team',
    howTitle: 'How Manufacturing Teams Use Eveia.AI',
    howBody:
      'Manufacturing teams rely on information across production, quality, safety, maintenance, and supplier operations. Eveia.AI helps authorized teams use approved manufacturing knowledge to prepare work faster while keeping information controlled.',
    teams: teams([
      { title: 'Production', body: 'Access current specifications, SOPs, and work instructions.', icon: mfProduction },
      { title: 'Quality', body: 'Review defect history, corrective actions, and audit records.', icon: mfQuality },
      { title: 'Safety', body: 'Work with safety procedures and material handling requirements.', icon: mfSafety },
      { title: 'Maintenance', body: 'Access equipment manuals, maintenance records, and procedures.', icon: mfMaintenance },
      { title: 'Supplier Quality', body: 'Review supplier qualifications and inspection requirements.', icon: mfSupplier },
    ]),
    builtBefore: 'Built for ',
    builtHighlight: 'Manufacturing',
    builtAfter: '',
    builtLead: 'Eveia.AI supports manufacturing organizations with:',
    requirements: [
      'Source-supported outputs for easier verification',
      'Revision visibility to help teams identify the document behind an answer',
      'Role-based access for controlled information',
      'Private deployment, including on-premise options',
      'Approved documents and data as the knowledge base',
      'Human review before information is used',
    ],
    builtClose:
      'Eveia.AI does not replace your document control system, assess compliance, or monitor machine data. It works with the documents you connect and shows the relevant source so teams can review and verify the information.',
    ctaTitle: 'Start With One Production Line',
    ctaBody:
      'Begin with one line, its specifications, work instructions, and quality records. See how Eveia.AI can help your team work with approved information faster.',
  },
}
