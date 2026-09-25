import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  return { title: article?.title || "Thinking" };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = (await getArticles())
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <section className="bg-sand pt-36 pb-12 md:pt-44">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4">
              {article.category} · {formatDate(article.date)}
            </p>
            <h1 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-display">
              {article.title}
            </h1>
            <p className="mt-6 text-charcoal/55">By {article.author}</p>
          </Reveal>
        </div>
      </section>

      <div className="relative mx-auto mb-16 aspect-[21/9] max-w-[1400px] overflow-hidden px-6 md:px-10">
        <div className="relative h-full min-h-[280px] w-full">
          <Image
            src={article.coverImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <article className="mx-auto max-w-[720px] px-6 pb-24 md:px-10">
        {article.content.split("\n\n").map((para) => (
          <p key={para.slice(0, 24)} className="mb-6 text-lg leading-relaxed text-charcoal/75">
            {para}
          </p>
        ))}
      </article>

      <section className="bg-blush/30 py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="font-display text-3xl mb-10">Related Thinking</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((a) => (
              <Link key={a.slug} href={`/thinking/${a.slug}`} className="group">
                <p className="eyebrow mb-2">{a.category}</p>
                <h3 className="font-display text-2xl group-hover:text-nude transition">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
          <div className="mt-14">
            <ButtonLink href="/start-a-project">Start a Project</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
