import Link from "next/link";
import { cookies } from "next/headers";
import {
    ArrowRight,
    ShieldCheck,
    Sparkles,
    Globe,
    Star,
    Users,
    ChevronRight,
    ExternalLink,
    Send,
    AtSign,
} from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";
import {
    HERO_STATS,
    SERVICES,
    TECH_STACK,
    TEAM_MEMBERS,
    TESTIMONIALS,
    WHY_CHOOSE_US,
    BLOG_POSTS,
    PROCESS_STEPS,
    brand,
} from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function HomePage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">

            <section className="relative overflow-hidden bg-background border-4 border-t-0 border-white rounded-tr-none rounded-tl-none rounded-3xl pt-10">
                <div className="absolute inset-0 surface-grid opacity-20" />
                <div className="hero-noise" />
                <div className="hero-bottom-glow" />
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-primary/8 blur-[120px]" />

                <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center min-h-[88vh]">
                    <div className="relative flex flex-col items-center text-center reveal-up pb-12 pt-10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-55%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] -z-10 pointer-events-none">
                            <div className="particle-sphere w-full! h-full! mb-0">
                                <div className="particle-sphere-inner" />
                                <div className="particle-ring" />
                                <div className="particle-ring-2" />
                                <div className="particle-dots" />
                            </div>
                        </div>

                        <h1 className="relative z-10 font-display text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-8xl mt-12">
                            {brand.name}
                        </h1>
                        <p className="relative z-10 mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
                            {dict.hero.tagline}
                        </p>
                        <div className="relative z-10 mt-10">
                            <Link
                                href="/services"
                                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-primary/40 backdrop-blur-md"
                            >
                                {dict.hero.cta}
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1">
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Symmetric Info Cards */}
                    <div className="mt-16 lg:mt-0 lg:absolute lg:bottom-0 lg:left-0 z-20 reveal-up bg-white rounded-tr-2xl" style={{ animationDelay: '300ms' }}>
                        <div className="concave-corner-br opacity-100" />
                        <div className="concave-corner-card-tr opacity-100" />
                        <div className="tab-notched rounded-2xl p-8 min-w-[350px] border-4 border-white bg-background!">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2">
                                {dict.common.contactUs}
                            </p>
                            <p className="text-base font-black text-white mb-6">
                                {brand.email}
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-primary transition-all">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-primary transition-all">
                                    <Send className="h-4 w-4" />
                                </a>
                                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-primary transition-all">
                                    <AtSign className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 lg:mt-0 lg:absolute lg:bottom-0 lg:right-0 z-20 reveal-up bg-white rounded-tl-2xl" style={{ animationDelay: '400ms' }}>
                        <div className="concave-corner-bl opacity-100" />
                        <div className="concave-corner-card-tl opacity-100" />
                        <div className="tab-notched rounded-2xl p-8 min-w-[200px] border-4 border-white bg-background!">
                            <div className="flex flex-col items-start justify-between gap-6">
                                {HERO_STATS.slice(0, 3).map((stat) => (
                                    <div key={stat.label} className="text-left">
                                        <div className="text-2xl font-black text-white lg:text-3xl">
                                            <AnimatedNumber value={parseInt(stat.value) || 0} suffix={stat.value.includes('%') ? '%' : '+'} />
                                        </div>
                                        <p className="mt-1 text-[8px] font-black uppercase tracking-widest text-white/50 max-w-[80px] leading-tight">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          PARTNER STRIP
      ════════════════════════════════════════════ */}
            <section className="bg-[#F8FAFC] border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
                        {brand.partners.map((logo) => (
                            <span
                                key={logo}
                                className="text-sm font-bold uppercase tracking-widest text-slate-400 transition-all hover:text-slate-900 sm:text-base"
                            >
                                {logo}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          ABOUT SECTION (LIGHT)
      ════════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 lg:py-40 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                            {dict.nav.about}
                        </span>
                    </div>

                    <h2 className="mx-auto max-w-4xl text-center text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
                        {dict.footer.tagline}
                    </h2>

                    <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {SERVICES.slice(0, 4).map((feature, index) => (
                            <article
                                key={feature.title}
                                className="feature-card-light rounded-3xl p-8 reveal-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary mb-6">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-sm font-medium leading-relaxed text-slate-500">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          SERVICES GRID (LIGHT)
      ════════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                            <Sparkles className="h-3 w-3" />
                            {dict.nav.services}
                        </span>
                    </div>
                    <h2 className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Achieving Business Impact Should be Simpler
                    </h2>

                    <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {SERVICES.slice(0, 6).map((service, index) => (
                            <article
                                key={service.title}
                                className="feature-card-light group rounded-3xl p-8 reveal-up"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 border border-primary/10 text-primary transition-transform group-hover:scale-110 mb-6">
                                    <service.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-sm font-medium leading-relaxed text-slate-500 mb-6">
                                    {service.description}
                                </p>
                                <ul className="space-y-3">
                                    {service.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-center gap-3 text-sm font-medium text-slate-600 transition-colors">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          TECH STACK SECTION
      ════════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 lg:py-40 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                            Technology Ecosystem
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Powering AI with the <span className="text-primary italic">Best Tools</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {TECH_STACK.map((tech, index) => (
                            <div
                                key={tech.name}
                                className="feature-card-light flex flex-col items-center justify-center rounded-3xl p-6 text-center reveal-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:text-primary">
                                    <tech.icon className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-bold text-slate-900">{tech.name}</span>
                                <span className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    {tech.category}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 lg:py-40 bg-slate-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                            {dict.nav.howItWorks}
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            From Curiosity to <span className="text-primary italic">Production</span>
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-0 h-0.5 w-full bg-slate-200 -translate-y-1/2 hidden lg:block" />

                        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
                            {PROCESS_STEPS.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm reveal-up"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white text-xl font-black mb-6">
                                        {step.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          WHY CHOOSE US?
      ════════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 lg:py-40 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                        Why Choose Us?
                    </span>
                    <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Why Organizations Trust <span className="text-primary italic">KraftCoder</span>
                    </h2>

                    <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {WHY_CHOOSE_US.map((item, index) => (
                            <div
                                key={item.title}
                                className="feature-card-light rounded-3xl p-8 text-left reveal-up"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary mb-6">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 lg:py-40 bg-slate-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                            Testimonials
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Client <span className="text-primary italic">Success Stories</span>
                        </h2>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {TESTIMONIALS.map((t, index) => (
                            <div
                                key={t.author}
                                className="bg-white rounded-3xl p-10 border border-slate-100 reveal-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-lg font-medium leading-relaxed text-slate-700 italic border-l-4 border-primary/20 pl-6 mb-10">
                                    "{t.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-slate-200" />
                                    <div>
                                        <div className="font-bold text-slate-900">{t.author}</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.role}, {t.company}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          OUR TEAMS
      ════════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 lg:py-40 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                        ✦ {dict.nav.team} ✦
                    </span>
                    <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Meet the Masters of <span className="italic font-display">Intelligence</span>
                    </h2>

                    <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {TEAM_MEMBERS.map((member, index) => (
                            <div
                                key={member.name}
                                className="group feature-card-light rounded-3xl p-6 text-center reveal-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl bg-slate-100">
                                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
                                        <Users className="h-16 w-16 text-slate-300 transition-transform group-hover:scale-110" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1 mb-4">{member.role}</p>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">{member.bio}</p>
                                <div className="flex justify-center gap-4">
                                    {Object.entries(member.socials).map(([platform, link]) => (
                                        <a key={platform} href={link} className="text-slate-300 hover:text-primary transition-colors">
                                            <Globe className="h-5 w-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/team" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-primary transition-colors group">
                            See full team <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          LATEST BLOG
      ════════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 lg:py-40 bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-8 mb-20 sm:flex-row sm:items-end">
                        <div className="text-center sm:text-left">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                                Insights & Updates
                            </span>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                Latest <span className="text-primary italic">{dict.nav.blog}</span>
                            </h2>
                        </div>
                        <Link href="/blog" className="rounded-full border border-slate-200 px-8 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all">
                            {dict.common.viewAll}
                        </Link>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {BLOG_POSTS.slice(0, 3).map((post, index) => (
                            <article
                                key={post.title}
                                className="group relative flex flex-col items-start reveal-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="relative mb-8 w-full aspect-video overflow-hidden rounded-[32px] bg-white">
                                    <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                        <post.icon className="h-12 w-12 text-slate-300 transition-transform group-hover:scale-110" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                                    <span>{post.category}</span>
                                    <span className="h-1 w-1 rounded-full bg-slate-200" />
                                    <span className="text-slate-400">{post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">
                                    {post.description}
                                </p>
                                <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-primary transition-all">
                                    {dict.common.learnMore} <ArrowRight className="h-4 w-4" />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
