import { Page } from 'puppeteer';
import DataGrid from './dataGrid';
import type { page } from './types.d';

describe('DataGrid', () => {
  beforeAll(async () => {
    jest.setTimeout(300000);
    //await jestPuppeteer.debug();
    await page.goto('file:///D:/devextreme/DevExtreme/testing/testcafe/tests/container.html');
  });
  beforeEach(async () => {
    await page.evaluate(() => {
      const generateData = function(rowCount, columnCount) {
        const items = [];

        for (let i = 0; i < rowCount; i += 1) {
          const item = {};
          for (let j = 0; j < columnCount; j += 1) {
            item[`field${j}`] = `${i}-${j}`;
          }
          items.push(item);
        }
        return items;
      };
      const data = generateData(2, 17);
      function createWidget(
        widgetName: string,
        options: any,
        disableAnimation = false,
        selector = '#container',
      ) {
        //debugger;
        const widgetOptions = typeof options === 'function' ? options() : options;
        (window as any).widget = $(`${selector}`)[widgetName](widgetOptions)[widgetName]('instance');
      }

      createWidget('dxDataGrid', {
        columnWidth: 70,
        dataSource: data,
        scrolling: {
          columnRenderingMode: 'virtual',
        },
        width: 500,
        selection: {
          mode: 'multiple',
          showCheckBoxesMode: 'always',
        },
        customizeColumns: function(columns) {
          //debugger;
          columns[0].fixed = true;
          columns[1].fixed = true;
          columns[15].fixedPosition = 'right';
          columns[15].fixed = true;
          columns[16].fixedPosition = 'right';
          columns[16].fixed = true;
        },
      });
    });
  });
  afterEach(async() => {
    await page.evaluate(() => {
      const widgetSelector = '.dx-widget';
      const $elements = $(widgetSelector)
        .filter((_, element) => $(element).parents(widgetSelector).length === 0);
      $elements.each((_, element) => {
        const $widgetElement = $(element);
        const widgetNames = $widgetElement.data().dxComponents;
        widgetNames?.forEach((name: string) => {
          ($widgetElement as any)[name]('dispose');
        });
        $widgetElement.empty();
      });
    });
  });
  it.skip('grid keyboard', async () => {
    const dataGrid = new DataGrid('#container');
    const checkBox = await dataGrid.getFixedDataRow(0).getSelectCheckBox();
    await page.evaluate((el) => console.log(el), checkBox);
    await checkBox.click();

    // Tab
    for (let rowIndex = 0; rowIndex < 2; rowIndex += 1) {
      for (let columnIndex = 0; columnIndex <= 17; columnIndex += 1) {
        if (columnIndex === 0) {
          const rowCheckBox = await dataGrid.getFixedDataRow(rowIndex).getSelectCheckBox();
          const isFocused = await page.evaluate((el) => document.activeElement === el, rowCheckBox);
          expect(isFocused).toBe(true);
          await (page as Page).keyboard.press('Tab');
        } else {
          let cell;
          await page.waitFor(60);
          if (columnIndex <= 2 || columnIndex >= 16) {
            cell = dataGrid.getFixedDataCell(rowIndex, columnIndex);
          } else {
            cell = dataGrid.getDataCell(rowIndex, columnIndex);
          }
          await expect(cell.isFocused).resolves.toEqual(true);
          if (rowIndex === 1 && columnIndex === 17) {
            break;
          }
          await (page as Page).keyboard.press('Tab');
        }
      }
    }
  });
  it('simple 1', async() => {
    const dataGrid = new DataGrid('#container');
    const checkBox = await dataGrid.getFixedDataRow(0).getSelectCheckBox();
    await page.evaluate((el) => console.log(el), checkBox);
    await checkBox.click();

    const row = await dataGrid.getDataRow(0);
    await expect(hasClass(row.element, 'dx-selection')).resolves.toBe(true);
  });
  it('simple 2', async() => {
    const dataGrid = new DataGrid('#container');
    const checkBox = await dataGrid.getFixedDataRow(0).getSelectCheckBox();
    await page.evaluate((el) => console.log(el), checkBox);
    await checkBox.click();

    const row = await dataGrid.getDataRow(0);
    await expect(hasClass(row.element, 'dx-selection')).resolves.toBe(true);
  });
  it('simple 3', async() => {
    const dataGrid = new DataGrid('#container');
    const checkBox = await dataGrid.getFixedDataRow(0).getSelectCheckBox();
    await page.evaluate((el) => console.log(el), checkBox);
    await checkBox.click();

    const row = await dataGrid.getDataRow(0);
    await expect(hasClass(row.element, 'dx-selection')).resolves.toBe(true);
  });
  it('simple 4', async() => {
    const dataGrid = new DataGrid('#container');
    const checkBox = await dataGrid.getFixedDataRow(0).getSelectCheckBox();
    await page.evaluate((el) => console.log(el), checkBox);
    await checkBox.click();

    const row = await dataGrid.getDataRow(0);
    await expect(hasClass(row.element, 'dx-selection')).resolves.toBe(true);
  });
  async function hasClass(element, className) {
    const el = await element;
    return  page.evaluate((el: Element, className: string) => {
      return $(el).hasClass(className);
    }, el, className);
  }
});