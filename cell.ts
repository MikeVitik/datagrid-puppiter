import { ElementHandle, JSHandle, Page } from 'puppeteer';
import DataGrid from './dataGrid';
// import FocusableElement from '../../internal/focusable';
// import Widget from '../../internal/widget';
import type { page, Selector } from './types.d';

const CLASS = {
  hiddenColumn: 'hidden-column',
  editCell: 'dx-editor-cell',
  focused: 'dx-focused',
  editorInput: 'dx-texteditor-input',
  invalidCell: 'dx-datagrid-invalid',
  invalidOverlayMessage: 'dx-invalid-message',
  cellModified: 'dx-cell-modified',
  pendingIndicator: 'dx-pending-indicator',
  overlay: 'dx-overlay',
  revertButton: 'dx-revert-button',
};

export default class DataCell /*extends FocusableElement*/ {
  element: Selector;

  //   isEditCell: Promise<boolean>;

  isFocused: Promise<boolean>;

  //   isValidationPending: Promise<boolean>;

  //   isInvalid: Promise<boolean>;

  //   isModified: Promise<boolean>;

  //   hasInvalidMessage: Promise<boolean>;

  //   isHidden: Promise<boolean>;

  constructor(dataRow: Selector, index: number, widgetName: string) {

    this.element = dataRow.then(DataGrid.waitForChild(`td[aria-colindex='${index + 1}']`));
    //super(dataRow.find(`td[aria-colindex='${index + 1}']`));
    // this.isEditCell = this.element.hasClass(CLASS.editCell);
    this.isFocused = this.element
      .then((el) => page
        .evaluate((el: Element, className: string) => {
          console.log('cell', el);
          return $(el).hasClass(className);
        }, el, CLASS.focused));//.hasClass(CLASS.focused);
    // this.isValidationPending = this.element.find(`div.${CLASS.pendingIndicator}`).exists;
    // this.isInvalid = this.element.hasClass(CLASS.invalidCell);
    // this.isModified = this.element.hasClass(CLASS.cellModified);
    // this.hasInvalidMessage = this.element.find(`.${CLASS.invalidOverlayMessage}.${CLASS.overlay}`).exists;
    // this.isHidden = this.element.hasClass(Widget.addClassPrefix(widgetName, CLASS.hiddenColumn));
  }

  //   getEditor(): FocusableElement {
  //     return new FocusableElement(this.element.find(`.${CLASS.editorInput}`));
  //   }

  //   getRevertButton(): Selector {
  //     return this.element.find(`.${CLASS.revertButton}`);
  //   }
}
