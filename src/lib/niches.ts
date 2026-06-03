import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Building2,
  CalendarDays,
  Cloud,
  Database,
  Download,
  Factory,
  FileText,
  Globe,
  HeartPulse,
  LayoutDashboard,
  Landmark,
  MessageSquareText,
  Newspaper,
  PlayCircle,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  Truck,
  Workflow,
  Boxes,
  Server,
  Users,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface SolutionDefinition {
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  outcomes: string[];
  deliverables: string[];
  bestFor: string;
  metric: string;
  icon: LucideIcon;
  featured?: boolean;
}

export interface ServiceDefinition {
  title: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
}

export interface IndustryDefinition {
  title: string;
  description: string;
  challenge: string;
  outcome: string;
  icon: LucideIcon;
}

export interface CaseStudyDefinition {
  client: string;
  title: string;
  sector: string;
  result: string;
  summary: string;
  challenge: string;
  approach: string;
  impact: string;
  metric: string;
  icon: LucideIcon;
}

export interface BlogPostDefinition {
  title: string;
  description: string;
  category: string;
  readTime: string;
  published: string;
  icon: LucideIcon;
}

export interface ResourceDefinition {
  title: string;
  description: string;
  format: string;
  icon: LucideIcon;
}

export const brand = {
  name: "Kraft Coder",
  tagline: "Helping Organizations Turn AI Into Measurable Business Outcomes.",
  email: "hello@kraftcoder.com",
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export const HERO_STATS: HeroStat[] = [
  { value: "8-12 wks", label: "typical pilot-to-production runway" },
  { value: "3x", label: "faster use-case prioritization" },
  { value: "40%", label: "target efficiency uplift in core workflows" },
  { value: "24/7", label: "governed monitoring and support" },
];

export const TRUST_TOKENS = [
  "Board-ready strategy",
  "Enterprise delivery",
  "Security-first architecture",
  "Regulated operations",
  "Startups to Fortune 500",
  "Cross-functional alignment",
];

export const SERVICES: ServiceDefinition[] = [
  {
    title: "AI Consulting",
    description:
      "Executive workshops, opportunity maps, and ROI models that turn broad curiosity into a disciplined AI portfolio.",
    icon: Sparkles,
    bullets: ["Opportunity scoring", "Business case design", "Roadmap prioritization"],
  },
  {
    title: "AI Strategy",
    description:
      "A practical adoption plan that aligns leadership, product, operations, and risk teams around one execution model.",
    icon: LayoutDashboard,
    bullets: ["Operating model", "Governance setup", "Executive cadence"],
  },
  {
    title: "AI Agent Development",
    description:
      "Autonomous and semi-autonomous agents that complete workflows, coordinate systems, and surface decisions.",
    icon: Bot,
    bullets: ["Tool orchestration", "Human-in-the-loop controls", "Audit trails"],
  },
  {
    title: "AI Automation",
    description:
      "Workflow automation across support, operations, sales, finance, and internal knowledge processes.",
    icon: Workflow,
    bullets: ["Process mapping", "Trigger design", "Exception handling"],
  },
  {
    title: "Enterprise AI Solutions",
    description:
      "Secure, reliable AI programs designed for departments that need scale, governance, and measurable outcomes.",
    icon: Building2,
    bullets: ["Security reviews", "Change management", "Scale planning"],
  },
  {
    title: "RAG Systems",
    description:
      "Knowledge systems that ground AI responses in your documents, policies, and product knowledge.",
    icon: Database,
    bullets: ["Retrieval design", "Content ingestion", "Evaluation harnesses"],
  },
  {
    title: "Chatbot Development",
    description:
      "Customer and employee assistants with clear guardrails, conversation design, and business logic.",
    icon: MessageSquareText,
    bullets: ["Conversation flows", "Routing rules", "Escalation logic"],
  },
  {
    title: "Custom Software Development",
    description:
      "Full-stack engineering for AI products, internal tools, and customer-facing systems.",
    icon: FileText,
    bullets: ["Product engineering", "API design", "Delivery sprints"],
  },
  {
    title: "SaaS Development",
    description:
      "New AI-enabled products or feature layers designed for monetization, retention, and speed to market.",
    icon: Rocket,
    bullets: ["MVP scoping", "Roadmap execution", "Revenue loops"],
  },
  {
    title: "Cloud & DevOps",
    description:
      "Deployment pipelines, observability, and infrastructure choices that keep AI systems stable and efficient.",
    icon: Cloud,
    bullets: ["CI/CD", "Monitoring", "Cost controls"],
  },
];

export const NICHES: SolutionDefinition[] = [
  {
    slug: "ai-consulting-strategy",
    title: "AI Consulting & Strategy",
    shortDescription:
      "Identify the right bets, build the business case, and align leadership around a practical AI roadmap.",
    overview:
      "We start by mapping where AI can move the needle, then translate that opportunity map into a staged roadmap with clear owners, budget ranges, and success metrics.",
    outcomes: [
      "Prioritized use-case portfolio",
      "Board-ready ROI model",
      "12-month execution roadmap",
    ],
    deliverables: [
      "Executive discovery workshop",
      "Opportunity sizing report",
      "Delivery and governance plan",
      "Investment memo",
    ],
    bestFor:
      "Leadership teams that want strategic clarity before they commit budget and headcount.",
    metric: "3x faster prioritization",
    icon: Sparkles,
    featured: true,
  },
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    shortDescription:
      "Design agents that can reason over tasks, coordinate tools, and complete high-value workflows.",
    overview:
      "We build agentic systems with tight guardrails, human approvals, and measurable task completion so they are useful inside real operations, not just demos.",
    outcomes: [
      "Workflow completion automation",
      "Human approval checkpoints",
      "Reusable tool integrations",
    ],
    deliverables: [
      "Agent architecture",
      "Tool and prompt design",
      "Safety and fallback logic",
      "Evaluation suite",
    ],
    bestFor:
      "Teams ready to automate research, ops, support, or internal decision support with control.",
    metric: "40% faster task execution",
    icon: Bot,
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    shortDescription:
      "Remove repetitive manual work across support, operations, sales, and finance.",
    overview:
      "We identify the steps that waste time, then connect systems and AI logic so information moves cleanly from trigger to outcome.",
    outcomes: [
      "Reduced manual handoffs",
      "Shorter cycle times",
      "Consistent process quality",
    ],
    deliverables: [
      "Process map",
      "Automation blueprint",
      "Exception handling rules",
      "Monitoring dashboard",
    ],
    bestFor: "Operations leaders who want practical efficiency gains quickly.",
    metric: "25% lower process cost",
    icon: Workflow,
  },
  {
    slug: "enterprise-ai-solutions",
    title: "Enterprise AI Solutions",
    shortDescription:
      "Deliver secure, governed AI programs that can scale across departments and regions.",
    overview:
      "We work through security, compliance, procurement, and change management so enterprise teams can move from pilot to dependable rollout.",
    outcomes: [
      "Enterprise-ready controls",
      "Security and governance approval",
      "Cross-team rollout plan",
    ],
    deliverables: [
      "Architecture review",
      "Risk register",
      "Stakeholder alignment pack",
      "Rollout playbook",
    ],
    bestFor:
      "Organizations that need AI to fit existing controls, not bypass them.",
    metric: "Pilot to rollout in 8-12 weeks",
    icon: Building2,
  },
  {
    slug: "rag-systems",
    title: "RAG Systems",
    shortDescription:
      "Ground AI answers in your own knowledge base, documents, and policies.",
    overview:
      "We design retrieval systems that improve answer quality, reduce hallucination risk, and keep response generation traceable.",
    outcomes: [
      "Document-grounded responses",
      "Better answer precision",
      "Traceable knowledge citations",
    ],
    deliverables: [
      "Content ingestion pipeline",
      "Retrieval and ranking design",
      "Evaluation harness",
      "Source traceability layer",
    ],
    bestFor: "Teams with large internal knowledge bases or customer support content.",
    metric: "50% better answer quality",
    icon: Database,
  },
  {
    slug: "chatbot-development",
    title: "Chatbot Development",
    shortDescription:
      "Create customer and internal assistants that feel sharp, useful, and on-brand.",
    overview:
      "We design the conversation, routing, tone, and operational safeguards so the assistant can handle real interactions without becoming a liability.",
    outcomes: [
      "Faster customer response",
      "Lower support load",
      "Consistent brand voice",
    ],
    deliverables: [
      "Conversation flows",
      "Knowledge mapping",
      "Escalation and routing logic",
      "Launch monitoring",
    ],
    bestFor: "Support, success, and operations teams that need scalable assistance.",
    metric: "24/7 guided support",
    icon: MessageSquareText,
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    shortDescription:
      "Build AI-enabled products and feature layers that can generate revenue and retention.",
    overview:
      "We help founders and product teams turn AI opportunities into productized software with a clean architecture and a launchable roadmap.",
    outcomes: [
      "Launch-ready MVPs",
      "Clear monetization path",
      "Retention-focused design",
    ],
    deliverables: [
      "MVP scope",
      "Product architecture",
      "Sprint delivery plan",
      "Growth instrumentation",
    ],
    bestFor: "Startups and product leaders shipping new AI experiences.",
    metric: "Weeks to first release, not quarters",
    icon: Rocket,
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortDescription:
      "Ship AI systems with reliable infrastructure, observability, and cost control.",
    overview:
      "We design deployment pipelines, monitoring, and scaling strategies that keep AI workloads performant and predictable.",
    outcomes: [
      "Stable deployments",
      "Lower operating risk",
      "Cost visibility",
    ],
    deliverables: [
      "Infrastructure plan",
      "CI/CD pipeline",
      "Observability stack",
      "Runbooks",
    ],
    bestFor:
      "Teams that need dependable operations and a clearer view of cloud spend.",
    metric: "Cleaner releases and lower drift",
    icon: Server,
  },
];

export const INDUSTRIES: IndustryDefinition[] = [
  {
    title: "Startups",
    description:
      "Move from idea to product faster, with a clear plan for shipping AI features that customers will actually pay for.",
    challenge: "Limited time and pressure to prove product-market fit.",
    outcome: "Rapid validation with disciplined delivery.",
    icon: Rocket,
  },
  {
    title: "SaaS",
    description:
      "Add AI capabilities that improve retention, reduce churn, and create new upsell paths without ballooning complexity.",
    challenge: "Balancing speed with product reliability.",
    outcome: "AI features that fit your roadmap and revenue model.",
    icon: Boxes,
  },
  {
    title: "Financial Services",
    description:
      "Keep risk, compliance, and auditability at the center while using AI to improve service and internal operations.",
    challenge: "High regulation and strict control requirements.",
    outcome: "Controlled adoption with measurable productivity gains.",
    icon: Landmark,
  },
  {
    title: "Healthcare",
    description:
      "Support clinical, admin, and patient experience workflows with systems designed around privacy and trust.",
    challenge: "Sensitive data and operational complexity.",
    outcome: "Safer automation with clear governance.",
    icon: HeartPulse,
  },
  {
    title: "Manufacturing",
    description:
      "Use AI for planning, maintenance, documentation, and knowledge access across distributed teams.",
    challenge: "Disconnected systems and manual handoffs.",
    outcome: "More resilient operations and better visibility.",
    icon: Factory,
  },
  {
    title: "Logistics",
    description:
      "Optimize dispatch, support, forecasting, and exception handling with AI-assisted workflows.",
    challenge: "Complex coordination across moving parts.",
    outcome: "Faster responses and fewer operational delays.",
    icon: Truck,
  },
];

export const CASE_STUDIES: CaseStudyDefinition[] = [
  {
    client: "Series B SaaS Platform",
    title: "AI-assisted onboarding reduced customer setup time by 52%",
    sector: "SaaS",
    result: "Faster activation and better retention",
    summary:
      "We designed a guided onboarding assistant that answered configuration questions, surfaced relevant docs, and reduced support tickets during first-use setup.",
    challenge:
      "New users were dropping off during a complex product setup flow that required multiple internal handoffs.",
    approach:
      "We combined RAG, task-specific prompts, and a clean handoff strategy to support users inside the product experience.",
    impact:
      "Customer success reported a sharp decline in repetitive setup tickets and a healthier time-to-value curve.",
    metric: "52% lower setup time",
    icon: MessageSquareText,
  },
  {
    client: "Regional Healthcare Group",
    title: "Internal knowledge assistant cut policy lookup from minutes to seconds",
    sector: "Healthcare",
    result: "Faster answers for frontline teams",
    summary:
      "We built a secure internal assistant that grounded responses in policy documents, clinical references, and HR guidance.",
    challenge:
      "Staff were wasting time searching across multiple systems for routine answers.",
    approach:
      "We created a governed retrieval layer with source citations and role-aware access controls.",
    impact:
      "Teams got consistent answers faster, and leadership gained confidence in the audit trail.",
    metric: "71% faster policy lookup",
    icon: Database,
  },
  {
    client: "Global Distribution Brand",
    title: "Automation program removed 18 hours of weekly manual coordination",
    sector: "Logistics",
    result: "Lean operations and clearer handoffs",
    summary:
      "We automated exception routing, status summaries, and internal escalation workflows across operations and customer service.",
    challenge:
      "Teams were manually stitching together updates from email, spreadsheets, and ERP tools.",
    approach:
      "We mapped the work, inserted automation at the highest-friction steps, and built reporting around the exceptions.",
    impact:
      "Ops leaders got a cleaner view of exceptions and far less repetitive coordination overhead.",
    metric: "18 hours saved weekly",
    icon: Workflow,
  },
  {
    client: "PE-backed Manufacturing Firm",
    title: "Decision-support agent improved analyst throughput by 34%",
    sector: "Manufacturing",
    result: "More time for high-value analysis",
    summary:
      "We delivered an internal agent that assembled reports, summarized operational signals, and routed follow-up questions to the right owner.",
    challenge:
      "Analysts were spending too much time gathering data before they could even start thinking.",
    approach:
      "We created a tool-using agent with strict approvals and traceable outputs so the team could trust the result.",
    impact:
      "Leadership got faster insight cycles without sacrificing control or clarity.",
    metric: "34% higher analyst throughput",
    icon: BarChart3,
  },
];

export const BLOG_POSTS: BlogPostDefinition[] = [
  {
    title: "How to choose your first AI use case",
    description:
      "A practical framework for picking a project that can prove value without creating chaos.",
    category: "Strategy",
    readTime: "6 min read",
    published: "2026-05-14",
    icon: Newspaper,
  },
  {
    title: "What enterprise teams need before they launch an AI agent",
    description:
      "The controls, approvals, and evaluation layers worth designing before the first rollout.",
    category: "Delivery",
    readTime: "8 min read",
    published: "2026-04-22",
    icon: Settings,
  },
  {
    title: "Why RAG projects fail and how to keep them useful",
    description:
      "The patterns that cause low-quality retrieval and the practices that improve trust in production.",
    category: "Engineering",
    readTime: "7 min read",
    published: "2026-04-03",
    icon: Database,
  },
  {
    title: "A cleaner operating model for AI governance",
    description:
      "How to build lightweight governance that helps teams ship instead of slowing everything down.",
    category: "Leadership",
    readTime: "5 min read",
    published: "2026-03-19",
    icon: ShieldCheck,
  },
];

export const RESOURCES: ResourceDefinition[] = [
  {
    title: "AI Readiness Checklist",
    description:
      "A concise checklist for leadership teams preparing their first AI initiative.",
    format: "PDF",
    icon: Download,
  },
  {
    title: "Governance Workshop Agenda",
    description:
      "A facilitation pack for aligning product, risk, and executive stakeholders.",
    format: "Workshop",
    icon: CalendarDays,
  },
  {
    title: "Agent Evaluation Template",
    description:
      "Scorecard for checking quality, safety, and operational fit before launch.",
    format: "Template",
    icon: FileText,
  },
  {
    title: "AI Opportunity Map",
    description:
      "A lightweight worksheet for finding the highest-value automation and assistant opportunities.",
    format: "Guide",
    icon: LayoutDashboard,
  },
  {
    title: "Strategy Session Deck",
    description:
      "A short deck for explaining roadmap options, risks, and expected outcomes.",
    format: "Deck",
    icon: PlayCircle,
  },
];

export const PROCESS_STEPS = [
  {
    step: "1",
    title: "Discover",
    description:
      "We align on outcomes, constraints, stakeholders, and the decision-making context before we propose anything.",
  },
  {
    step: "2",
    title: "Design",
    description:
      "We shape the operating model, architecture, and delivery plan around one clear business outcome.",
  },
  {
    step: "3",
    title: "Build",
    description:
      "We deliver the pilot or production system with guardrails, instrumentation, and clear handoffs.",
  },
  {
    step: "4",
    title: "Scale",
    description:
      "We help the team roll the solution out with governance, adoption support, and performance tracking.",
  },
];

export const FAQS = [
  {
    question: "How fast can a project start?",
    answer:
      "Most engagements begin with a focused discovery workshop, then move into a proposal and delivery plan within days, not weeks.",
  },
  {
    question: "Do you work with startups and enterprise teams?",
    answer:
      "Yes. We support founders who need speed and enterprise teams that need governance, security, and change management.",
  },
  {
    question: "Can you help with both strategy and implementation?",
    answer:
      "Absolutely. We often help clients define the roadmap and then build the systems, agents, or automations that follow.",
  },
];

export function getNicheBySlug(slug: string): SolutionDefinition | undefined {
  return NICHES.find((niche) => niche.slug === slug);
}
