
import connectDB from "../src/lib/mongodb";
import Article from "../src/lib/models/Article";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

async function testArticles() {
    try {
        console.log("Connecting to DB...");
        await connectDB();
        console.log("Connected.");

        const countTotal = await Article.countDocuments({});
        console.log(`TOTAL ARTICLES IN DB: ${countTotal}`);

        const articles = await Article.find({})
            .sort({ publishedAt: -1, createdAt: -1 })
            .limit(10)
            .lean();

        console.log(`Found ${articles.length} articles (unfiltered).`);

        articles.forEach((article, index) => {
            try {
                console.log(`Processing article ${index}: ${article.title}, slug: ${article.slug}, published: ${article.published}`);
                const dateStr = article.publishedAt || article.createdAt;
                console.log(`  Date source: ${dateStr} (Type: ${typeof dateStr})`);

                const dateObj = new Date(dateStr);
                console.log(`  Date obj: ${dateObj.toString()}`);

                if (isNaN(dateObj.getTime())) {
                    console.error(`  INVALID DATE for article ${article._id}`);
                }

                const formatted = format(dateObj, 'd MMMM yyyy', { locale: fr });
                console.log(`  Formatted: ${formatted}`);

            } catch (err) {
                console.error(`  ERROR processing article ${article._id}:`, err);
            }
        });

        console.log("Done.");
        process.exit(0);
    } catch (error) {
        console.error("Fatal error:", error);
        process.exit(1);
    }
}

testArticles();
