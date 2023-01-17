import Vstore from './core/Vstore';
export * as webAdaper from './adapter/web';
export * as wxAdapter from './adapter/wx';
export * as aliAdapter from './adapter/ali';

const vstore = new Vstore();

export default vstore;
