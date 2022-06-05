import express, { Express, Request, Response } from 'express';
import path from 'path';
import { Instances, SpaceInstances } from './searxSpace';
import randomBetween from './utils/randomBetween';
import { cache, Cache } from './utils/cache';

export default class Server {
  private app: Express;
  private cache = cache();
  private url = '';
  private badInstanceUrlsCached: Cache<string>[] = [];

  constructor(app: Express) {
    this.app = app;
    this.app.use(express.static(`${path.resolve('./')}/build/web`));

    this.app.get('/api', (req: Request, res: Response): void => {
      res.send('You have reached the API!');
    });

    this.app.get('/random', async (req: Request, res: Response): Promise<void> => {
      const { instances } = await this.getInstancesListFromHub();

      const instanceUrls = this.filterOutInstances(instances);

      const report = await this.getInstancesReport({ instanceUrls, req });

      this.url = report.url;
      this.cacheBadUrls(report.instanceUrlsWithNoResults);

      res.send(this.getHtmlWithAbsoluteUrls(report.html));
    });
  }

  private cacheBadUrls(urls: string[]): void {
    this.badInstanceUrlsCached.push(
      ...urls.map((url) => {
        const instance = cache();
        instance.data = url;
        return instance;
      })
    );
  }

  private async getInstancesReport({ instanceUrls, req }: { instanceUrls: string[]; req: Request }) {
    let iteration = 1;
    let html = '';
    let url = '';
    const newBadUrls: string[] = [];
    const withoutNewBadUrls = (urls: string[]) => urls.filter((url) => !newBadUrls.includes(url));

    const urls = this.filterOutCachedUrls(instanceUrls);
    while (iteration <= 3) {
      url = urls[randomBetween(0, withoutNewBadUrls(urls).length)];
      console.log({ iteration, url });

      html = await this.getInstanceHtml({ url, req });
      const resultsLength = this.countResults(html);
      console.log({ resultsLength });

      if (resultsLength > 2) {
        break;
      }
      newBadUrls.push(url);

      iteration++;
    }
    return { html, url, instanceUrlsWithNoResults: newBadUrls };
  }

  private filterOutCachedUrls(urls: string[]): string[] {
    return urls.filter((url) => !this.badInstanceUrlsCached.find((urlCached) => urlCached.data === url));
  }

  private countResults(html: string): number {
    return html.match(/class="result /g)?.length || 0;
  }

  private getHtmlWithAbsoluteUrls(html: string): string {
    return html
      .replace(new RegExp('href="/', 'g'), `href="${this.url}`)
      .replace(new RegExp('src="/', 'g'), `src="${this.url}`)
      .replace(new RegExp('"/search', 'g'), `"${this.url}search`);
  }

  private async getInstanceHtml({ url, req }: { url: string; req: Request }): Promise<string> {
    const searchTerms = req.query['q'];
    const combined = new URL(`/search?q=${searchTerms}`, url);
    console.log({ searchUrl: combined?.href });
    return await fetch(combined?.href).then((data) => {
      return data.text();
    });
  }

  private filterOutInstances(instances: Instances): string[] {
    const allInstanceNames = Object.keys(instances);

    return allInstanceNames.filter(
      (instance) =>
        ['V', 'C'].includes(instances[instance]?.html?.grade) && instances[instance]?.network_type === 'normal'
    );
  }

  private async getInstancesListFromHub() {
    if (this.cache.data === 'REFRESH') {
      this.cache.data = await fetch('https://searx.space/data/instances.json').then((data) => data.json());
    }
    return this.cache.data as SpaceInstances;
  }

  public start(port: number): void {
    this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
  }
}
