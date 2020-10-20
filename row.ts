import DataCell from './cell';
import { ElementHandle, Page } from 'puppeteer';
import type { Selector, page } from './types.d';
import DataGrid from './dataGrid';

const CLASS = {
    commandExpand: 'dx-command-expand',
    focusedRow: 'dx-row-focused',
    rowRemoved: 'dx-row-removed',
    selection: 'dx-selection',
    selectCheckBox: 'dx-select-checkbox',
    insertedRow: 'dx-row-inserted',
    editedRow: 'dx-edit-row',
    groupExpanded: 'group-opened',
  };
  
  export class DataRow {
    widgetName: string;

    // isRemoved: Promise<boolean>;

    // isFocusedRow: Promise<boolean>;

    // isSelected: Promise<boolean>;

    // isInserted: Promise<boolean>;

    // isEdited: Promise<boolean>;

    // isExpanded: Promise<boolean>;
    element: Selector;
    constructor(element: Selector, widgetName: string) {
        //super(element);
        this.element = element;
        this.widgetName = widgetName;
        //   this.isRemoved = this.element.hasClass(CLASS.rowRemoved);
        //   this.isFocusedRow = this.element.hasClass(CLASS.focusedRow);
        //   this.isSelected = this.element.hasClass(CLASS.selection);
        //   this.isInserted = this.element.hasClass(CLASS.insertedRow);
        //   this.isEdited = this.element.hasClass(CLASS.editedRow);
        //   this.isExpanded = this.element.find(`.${CLASS.commandExpand} .${Widget.addClassPrefix(this.widgetName, CLASS.groupExpanded)}`).exists;
    }

    getDataCell(index: number): DataCell {
        return new DataCell(this.element, index, this.widgetName);
    }

    // getCommandCell(index: number): CommandCell {
    //   return new CommandCell(this.element, index, this.widgetName);
    // }

    getSelectCheckBox(): Selector {
        return this.element.then(DataGrid.waitForChild(`.${CLASS.selectCheckBox}`));// page.waitForSelector(`.${CLASS.selectCheckBox}`);// this.element.find(`.${CLASS.selectCheckBox}`);
    }

    // getOffset(): Promise<any> {
    //   const { element } = this;

    //   return ClientFunction(
    //     () => ($(element()) as any).offset(),
    //     { dependencies: { element } },
    //   )();
    // }
}
