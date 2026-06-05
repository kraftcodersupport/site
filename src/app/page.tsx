import Link from "next/link";
import { cookies } from "next/headers";
import {
    ArrowRight,
    ShieldCheck,
    Sparkles,
    Globe,
    Star,
    ChevronRight,
    ExternalLink,
} from "lucide-react";
import HomeHero from "@/components/HomeHero";
import {
    HERO_STATS,
    SERVICES,
    TECH_STACK,
    WHY_CHOOSE_US,
    PROCESS_STEPS,
    brand,
} from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";
import {
    getSanityTestimonials,
    getSanityTeamMembers,
    getSanityBlogPosts,
} from "@/lib/sanity/client";

export default async function HomePage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    const testimonials = await getSanityTestimonials();
    const teamMembers = await getSanityTeamMembers();
    const blogPosts = await getSanityBlogPosts();

    return (
        <div className="relative -mt-16 bg-zinc-950">
            {/* ════════════════════════════════════════════
          HERO SECTION (DARK & HEAVILY ANIMATED)
      ════════════════════════════════════════════ */}
            <HomeHero
                brandName={brand.name}
                email={brand.email}
                tagline={dict.hero.tagline}
                ctaLabel={dict.hero.cta}
                contactLabel={dict.common.contactUs}
                stats={HERO_STATS}
            />

            {/* ════════════════════════════════════════════
          PARTNER STRIP (DARK)
      ════════════════════════════════════════════ */}
            <section id="partner-strip" className="bg-zinc-900 border-b border-zinc-800 scroll-mt-24">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6">
                        Trusted by innovative teams
                    </p>
                    <div className="overflow-hidden">
                        <div className="marquee-track">
                            {[...brand.partners, ...brand.partners].map((logo, i) => (
                                <span
                                    key={`${logo}-${i}`}
                                    className="text-sm font-bold uppercase tracking-widest text-zinc-400 transition-all hover:text-white shrink-0 sm:text-base"
                                >
                                    {logo}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          ABOUT SECTION (LIGHT BACKGROUND)
      ════════════════════════════════════════════ */}
            <section className="relative section-padding bg-white section-glow border-t border-zinc-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-6">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            {dict.nav.about}
                        </span>
                    </div>

                    <h2 className="mx-auto max-w-4xl text-center text-3xl font-black leading-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                        {dict.footer.tagline}
                    </h2>

                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {SERVICES.slice(0, 4).map((feature, index) => (
                            <article
                                key={feature.title}
                                className="card-light rounded-2xl p-8 reveal-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-6 shadow-sm">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-base font-bold text-zinc-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm font-medium leading-relaxed text-zinc-600">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          SERVICES GRID (DARK BACKGROUND)
      ════════════════════════════════════════════ */}
            <section className="relative section-padding overflow-hidden bg-zinc-950 border-t border-zinc-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-6">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            <Sparkles className="h-3 w-3 animate-sparkle" />
                            {dict.nav.services}
                        </span>
                    </div>
                    <h2 className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Achieving Business Impact Should be Simpler
                    </h2>

                    <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {SERVICES.slice(0, 6).map((service, index) => (
                            <article
                                key={service.title}
                                className="card-dark group rounded-2xl p-8 reveal-up"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary transition-transform group-hover:scale-110 mb-6 shadow-sm">
                                    <service.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-white mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-sm font-medium leading-relaxed text-zinc-400 mb-6">
                                    {service.description}
                                </p>
                                <ul className="space-y-3">
                                    {service.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
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
          TECH STACK SECTION (LIGHT BACKGROUND)
      ════════════════════════════════════════════ */}
            <section className="relative section-padding bg-zinc-50 border-t border-zinc-200 section-glow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            Technology Ecosystem
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                            Powering AI with the <span className="text-primary italic">Best Tools</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {TECH_STACK.map((tech, index) => (
                            <div
                                key={tech.name}
                                className="card-light group flex flex-col items-center justify-center rounded-2xl p-6 text-center reveal-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-500 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all shadow-sm">
                                    <tech.icon className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-bold text-zinc-900">{tech.name}</span>
                                <span className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                                    {tech.category}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          HOW IT WORKS (DARK BACKGROUND)
      ════════════════════════════════════════════ */}
            <section className="relative section-padding bg-zinc-950 overflow-hidden border-t border-zinc-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            {dict.nav.howItWorks}
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                            From Curiosity to <span className="text-primary italic">Production</span>
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-0 h-px w-full bg-zinc-800 -translate-y-1/2 hidden lg:block" />

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
                            {PROCESS_STEPS.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="card-dark rounded-2xl p-8 reveal-up"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white text-lg font-black mb-6 shadow-md shadow-primary/20">
                                        {step.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-sm font-medium text-zinc-400 leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          WHY CHOOSE US? (LIGHT BACKGROUND)
      ════════════════════════════════════════════ */}
            <section className="relative section-padding bg-white border-t border-zinc-200 section-glow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Why Choose Us?
                    </span>
                    <h2 className="mt-6 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                        Why Organizations Trust <span className="text-primary italic">KraftCoder</span>
                    </h2>

                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {WHY_CHOOSE_US.map((item, index) => (
                            <div
                                key={item.title}
                                className="card-light rounded-2xl p-8 text-left reveal-up"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-6 shadow-sm">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 mb-3">{item.title}</h3>
                                <p className="text-sm font-medium text-zinc-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          TESTIMONIALS (DARK BACKGROUND)
      ════════════════════════════════════════════ */}
            <section className="relative section-padding bg-zinc-950 overflow-hidden border-t border-zinc-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            Testimonials
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Client <span className="text-primary italic">Success Stories</span>
                        </h2>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {testimonials.map((t, index) => (
                            <div
                                key={t?.author}
                                className="card-dark rounded-2xl p-8 border-l-4 border-l-primary reveal-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="flex gap-1 mb-6">
                                    {t?.rating && [...Array(t?.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-emerald-400 text-emerald-400" />
                                    ))}
                                </div>
                                <p className="text-base font-semibold leading-relaxed text-zinc-300 italic mb-8">
                                    &ldquo;{t?.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-4">
                                    {t?.imageUrl ? (
                                        <img src={t.imageUrl} alt={t?.author} className="h-12 w-12 rounded-full object-cover border border-zinc-800" />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-linear-to-br from-primary/20 to-accent/20 border border-zinc-800 flex items-center justify-center text-white font-bold text-lg">
                                            {t?.author?.charAt(0)?.toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-sm font-bold text-white">{t.author}</div>
                                        <div className="text-xs font-bold text-zinc-500">{t.role}, {t.company}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          OUR TEAMS (LIGHT BACKGROUND & TYPOGRAPHIC CARDS)
      ════════════════════════════════════════════ */}
            <section className="relative section-padding bg-zinc-50 border-t border-zinc-200 section-glow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        ✦ {dict.nav.team} ✦
                    </span>
                    <h2 className="mt-6 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                        Meet the Masters of <span className="italic font-display text-primary">Intelligence</span>
                    </h2>

                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member, index) => {
                            const initials = (member.name as string)
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("");
                            return (
                                <div
                                    key={member.name}
                                    className="relative pt-12 reveal-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={`group flex flex-col items-center text-center rounded-2xl p-6 pt-14 transition-all duration-300 hover:shadow-md ${
                                        ['bg-indigo-50/80', 'bg-emerald-50/80', 'bg-amber-50/80', 'bg-rose-50/80'][index % 4]
                                    }`}>
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 aspect-square w-24 overflow-hidden rounded-full bg-white border-4 border-white shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center z-10">
                                            {member?.imageUrl ? (
                                                <img src={member.imageUrl} alt={member.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-2xl font-black tracking-wider text-zinc-400 font-display">
                                                    {initials}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-base font-bold text-zinc-900">{member.name}</h3>
                                        <p className="text-[13px] font-medium text-zinc-500 mt-1 mb-2">{member.role}</p>
                                        
                                        {member?.portfolioUrl && (
                                            <div className="mt-2">
                                                <a href={member.portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-primary transition-colors">
                                                    View Portfolio <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/team" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-primary transition-colors group">
                            See full team <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          LATEST BLOG (DARK BACKGROUND & TYPOGRAPHIC CARDS)
      ════════════════════════════════════════════ */}
            <section className="relative section-padding bg-zinc-950 border-t border-zinc-850">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center justify-between gap-8 mb-16 sm:flex-row sm:items-end">
                        <div className="text-center sm:text-left">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                Insights & Updates
                            </span>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                                Latest <span className="text-primary italic">{dict.nav.blog}</span>
                            </h2>
                        </div>
                        <Link href="/blog" className="rounded-full border border-zinc-800 bg-zinc-900 px-8 py-3 text-sm font-bold text-zinc-300 hover:border-primary/30 hover:text-white shadow-sm transition-all">
                            {dict.common.viewAll}
                        </Link>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts.slice(0, 3).map((post, index) => (
                            <article
                                key={post.title}
                                className="group relative flex flex-col items-start card-dark p-8 rounded-3xl border border-zinc-800 reveal-up min-h-[300px] justify-between"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div>
                                    <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-primary mb-4">
                                        <span>{post.category}</span>
                                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                                        <span className="text-zinc-500">{post.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white leading-tight mb-4 group-hover:text-primary transition-colors">
                                        <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}>
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="text-sm font-medium text-zinc-400 leading-relaxed line-clamp-3">
                                        {post.description}
                                    </p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-zinc-800/60 w-full flex items-center justify-between">
                                    <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`} className="inline-flex items-center gap-2 text-sm font-bold text-zinc-300 group-hover:text-primary transition-all">
                                        {dict.common.learnMore} <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
