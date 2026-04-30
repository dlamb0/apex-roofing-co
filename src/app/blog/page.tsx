import Image from "next/image";
import Link from "next/link";
import { Section, Container, SectionHeading, Badge } from "@/components/ui/Section";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roofing Blog & Resources",
  description: "Expert roofing tips, maintenance guides, and storm damage advice from the Apex Roofing team.",
};

// Static demo posts since Sanity isn't configured yet
const demoPosts = [
  {
    _id: "1",
    title: "How to Identify Hail Damage on Your Roof (Before It Gets Worse)",
    slug: { current: "how-to-identify-hail-damage" },
    excerpt: "After a hail storm, the damage to your roof isn't always obvious from the ground. Here's exactly what to look for — and when to call a professional.",
    publishedAt: "2024-09-15",
    estimatedReadingTime: 7,
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80" }, alt: "Storm damage on roof" },
    categories: [{ title: "Storm Damage" }],
  },
  {
    _id: "2",
    title: "The Complete Guide to Roof Replacement: What to Expect",
    slug: { current: "roof-replacement-guide" },
    excerpt: "Replacing your roof is one of the biggest home improvement investments you'll make. This guide walks you through every step so there are no surprises.",
    publishedAt: "2024-08-22",
    estimatedReadingTime: 10,
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" }, alt: "Roof replacement in progress" },
    categories: [{ title: "Residential" }],
  },
  {
    _id: "3",
    title: "5 Signs Your Commercial Roof Needs Immediate Attention",
    slug: { current: "commercial-roof-warning-signs" },
    excerpt: "Commercial roofs fail quietly. By the time water is dripping through your ceiling, you've already lost thousands. Know the early warning signs.",
    publishedAt: "2024-07-18",
    estimatedReadingTime: 6,
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" }, alt: "Commercial building roof" },
    categories: [{ title: "Commercial" }],
  },
  {
    _id: "4",
    title: "Ice Dams: Why They Form and How to Prevent Them This Winter",
    slug: { current: "ice-dams-prevention-guide" },
    excerpt: "Ice dams are Minnesota's most damaging winter roof problem. Here's the science behind why they form and the only reliable long-term solution.",
    publishedAt: "2024-10-05",
    estimatedReadingTime: 8,
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800&q=80" }, alt: "Ice on roof in winter" },
    categories: [{ title: "Maintenance" }],
  },
  {
    _id: "5",
    title: "Asphalt vs. Metal Roofing: Which Is Right for Your Home?",
    slug: { current: "asphalt-vs-metal-roofing" },
    excerpt: "Both materials have genuine advantages. The right choice depends on your budget, climate exposure, and how long you plan to stay in your home.",
    publishedAt: "2024-06-10",
    estimatedReadingTime: 9,
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80" }, alt: "Modern home with metal roof" },
    categories: [{ title: "Materials" }],
  },
  {
    _id: "6",
    title: "How to File a Roof Insurance Claim (And Maximize Your Settlement)",
    slug: { current: "roof-insurance-claim-guide" },
    excerpt: "Most homeowners leave money on the table when filing storm damage claims. Here's exactly how to document damage and work with your adjuster effectively.",
    publishedAt: "2024-05-28",
    estimatedReadingTime: 11,
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" }, alt: "Insurance paperwork" },
    categories: [{ title: "Insurance" }],
  },
];

export default function BlogPage() {
  const [featured, ...rest] = demoPosts;

  return (
    <>
      <div className="bg-brand-charcoal py-20">
        <Container>
          <p className="text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">Roofing Resources</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Expert Roofing Insights</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Maintenance guides, material comparisons, storm season prep, and everything else you need to protect your most important investment.
          </p>
        </Container>
      </div>

      <Section background="cream" padding="lg">
        <Container>
          {/* Featured post */}
          <Link href={`/blog/${featured.slug.current}`} className="group block mb-12">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto overflow-hidden">
                <Image
                  src={featured.mainImage.asset.url}
                  alt={featured.mainImage.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="orange">Featured</Badge>
                  {featured.categories.map((c) => (
                    <Badge key={c.title} variant="gray">{c.title}</Badge>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-brand-charcoal mb-3 group-hover:text-brand-orange transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {featured.estimatedReadingTime} min read
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex gap-2 mb-2">
                    {post.categories.map((c) => (
                      <Badge key={c.title} variant="orange">{c.title}</Badge>
                    ))}
                  </div>
                  <h3 className="font-bold text-brand-charcoal mb-2 group-hover:text-brand-orange transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.estimatedReadingTime} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
