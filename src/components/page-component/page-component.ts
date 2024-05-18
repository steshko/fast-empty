import { FASTElement, customElement } from '@microsoft/fast-element';
import template from './page-component.template';
import styles from './page-component.styles';

const name = 'page-component';

@customElement({name, template, styles})
export class PageComponent extends FASTElement {

}