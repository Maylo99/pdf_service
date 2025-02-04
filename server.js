import Fastify from 'fastify';
import puppeteer from 'puppeteer';

const fastify = Fastify({ logger: true });

fastify.post('/generate-pdf', async (request, reply) => {
  try {
    const { html } = request.body;
    if (!html) {
      return reply.status(400).send({ error: 'HTML content is required' });
    }
        const browser = await puppeteer.launch({
          // we dont need this when we run noder server in docker container
          //    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
     

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();


    reply
      .header('Content-Type', 'application/pdf')
      .header('Content-Disposition', 'attachment; filename="document.pdf"')
      .send(pdfBuffer);
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: 'PDF generation failed' });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info('Fastify server running on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
