// const fs = require('fs');
// const axios = require('axios');
// const { URL } = require('url');
// // require prisma
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// // Function to validate a URL
// async function is_valid_url(url) {
//   try {
//     const parsedUrl = new URL(`https://${url}`); // Add "http://" to the URL for proper parsing
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

// // Read and validate domains from the text file
// fs.readFile('domains.txt', 'utf8', async (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   const domains = data.split(',');
  
//   for (const domain of domains) {
//     if (await is_valid_url(domain)) {
//     //   console.log(`Valid Domain: ${domain}`);
//       // add to db
//         const newDomain = prisma.websites.create({
//             data: {
//             domain: domain,
//             safe: true
//             }
//         }).then(() => {console.log(`Added ${domain} to database.`)});
//     } else {
//       console.log(`Invalid Domain: ${domain}`);
//     }
//   }

//   console.log('Text file processed.');
// });




const fs = require('fs');
const axios = require('axios');
const { URL } = require('url');
// require prisma
const { PrismaClient } = require('@prisma/client');

// Function to validate a URL
async function is_valid_url(url) {
  try {
    const parsedUrl = new URL(`https://${url}`); // Add "https://" to the URL for proper parsing
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  const prisma = new PrismaClient();

  try {
    // Read and validate domains from the text file
    const data = fs.readFileSync('domains.txt', 'utf8');
    const domains = data.split(',');

    for (const domain of domains) {
      if (await is_valid_url(domain)) {
        // Add each domain to the database
        await prisma.websites.create({
          data: {
            domain: domain,
            safe: true,
          }
        });
      } else {
        console.log(`Invalid Domain: ${domain}`);
      }
    }

    console.log('Text file processed.');
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
