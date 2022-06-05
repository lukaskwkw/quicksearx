import Server from './Server';
import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const appMock: Partial<Express> = {
  use: jest.fn(),
  get: jest.fn(),
};
describe('Server tests', () => {
  let server: Server;
  let htmlContent: string;
  
  beforeAll(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../test/randomSearchHtmlResult.html'), { encoding: 'utf8'})  
  });

  beforeEach(() => {
    server = new Server(appMock as any);
  })

  it('Should count the number of search results', () => {
    const length = server['countResults'](htmlContent);
    expect(length).toEqual(33);
  });

  it('Should correctly filter out badInstanceUrlsCached', () => {
    const badUrls = ['url1', 'url2', 'url3', 'url4'];
    const urls = ['url1', 'url5', 'url6', 'url7', 'url3'];
    server['cacheBadUrls'](badUrls);
    const goodUrls = server['filterOutCachedUrls'](urls);
    expect(goodUrls.length).toEqual(3);
    expect(goodUrls).toEqual(['url5', 'url6', 'url7']);
  });

  it('Should correctly filter out badInstanceUrlsCached when for some of them TTL expired', () => {
    const badUrls = ['url1', 'url2', 'url3', 'url4'];
    const urls = ['url1', 'url2', 'url5', 'url6', 'url7', 'url3'];
    server['cacheBadUrls'](badUrls);
    server['badInstanceUrlsCached'][0]._time = 1000;
    server['badInstanceUrlsCached'][1]._time = 1000;
    const goodUrls = server['filterOutCachedUrls'](urls);
    expect(goodUrls.length).toEqual(5);
    expect(goodUrls).toEqual(['url1', 'url2', 'url5', 'url6', 'url7']);
  })
});
