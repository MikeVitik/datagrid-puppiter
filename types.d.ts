import { ElementHandle, Page } from 'puppeteer';
export type Selector = Promise<ElementHandle<Element>>;
export declare var page: Page;
