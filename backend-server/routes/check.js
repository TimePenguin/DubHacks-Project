const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var stringSimilarity = require("string-similarity");

function extractDomain(url) {
    var withoutProtocol = url.replace(/^(https?|ftp):\/\//, '');

    // Get the domain and the first level of the TLD
    var domain = withoutProtocol.match(/(?:www\.)?([^/]+)/);

    if (domain) {
        return domain[1];
    } else {
        return null; // Handle cases where the URL format is unexpected
    }
}


module.exports = async function (fastify, opts) {
    fastify.post("/checkWebsite", async function (req, res) {
        // get javascript data (json)
        const nurl = req.body.url;
        console.log(nurl)
        console.log(/(https?:\/\/)(work\.ink|workink\.(click|xyz|net|me|co|biz))/i.test(nurl))
        // check if website is an ad-link if it is send it to BYPASS.CITY
        if (/.*\/s\?[A-Za-z0-9]{3}/.test(nurl) || /https?:\/\/adfoc\.us/i.test(nurl) || /https?:\/\/(www.)?(adshnk\.com|adshrink.it|adshnk.com|shrink-service\.it)/i.test(nurl) || /https?:\/\/(boost\.ink|bst\.gg|bst\.wtf|booo\.st)/i.test(nurl) || /https?:\/\/boost\.fusedgt\.com/i.test(nurl) || /^(https?:\/\/)?filedm\.com\/.*$/i.test(nurl) || /^(https?:\/\/)?leasurepartment\.xyz\/.*$/i.test(nurl) || /https?:\/\/letsboost\.net/i.test(nurl) || /https?:\/\/(linkvertise\.(com|download)|(link-(center|target|hub|to)|direct-link|file-link)\.net)/i.test(nurl) || /https?:\/\/mboost\.me/i.test(nurl) || /https?:\/\/rekonise\.com/i.test(nurl) || /https?:\/\/(shorte\.st|sh\.st|gestyy\.com|destyy\.com)/i.test(nurl) || /https?:\/\/social-unlock\.com/i.test(nurl) || /https?:\/\/sub2get\.com/i.test(nurl) || /https?:\/\/sub2unlock\.com/i.test(nurl) || /https?:\/\/sub2unlock\.net/i.test(nurl) || /(https?:\/\/)(work\.ink|workink\.(click|xyz|net|me|co|biz))/i.test(nurl)) {
            return {
                safe: false,
                redirect: `https://bypass.city/bypass?bypass=${encodeURIComponent(nurl)}&redirect=true`,
            };
        }

        const url = extractDomain(nurl)

        if (url.includes("doubleclick.net")) return { safe: true }

        //check if website is a known website
        console.log(url)
        const website = await prisma.websites.findUnique({
            where: {
                domain: url,
            },
        });
        console.log(website)
        if (website && website.safe) {
            // website is known
            return {
                safe: true,
            };
        }
        else if(website && website.safe == false) {
            return {
                safe: false,
                redirect: `https://magnificent-taffy-4e7fb1.netlify.app/scam.html?website=${nurl}`
            }
        }
        else {
            // take first letter of url and search all websites with that letter in the db
            const websites = await prisma.websites.findMany({
                where: {
                    domain: {
                        startsWith: url[0],
                    },
                },
            });
            // calculate similarity of url and all websites with the same first letter
            const bestMatch = stringSimilarity.findBestMatch(url, websites.map((w) => w.domain)).bestMatch;
                const similarity = bestMatch.rating;
                console.log(bestMatch)
                console.log(similarity > 0.5)
            if(similarity > 0.5) {
                // website is an impersination and send back the real website
                return {
                    safe: false,
                    redirect: `https://magnificent-taffy-4e7fb1.netlify.app/similarity.html?website=${bestMatch.target}&og=${nurl}`,
                };
            }
            // website is unknown
            return {
                safe: false,
                redirect: `https://magnificent-taffy-4e7fb1.netlify.app/unknown.html?website=${nurl}`,
            };
        }
    });
}