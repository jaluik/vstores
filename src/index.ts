import Vstore from './core/Vstore';
import webAdaper from './adapter/web';
import wxAdapter from './adapter/wx';
import aliAdapter from './adapter/ali';

const vstore = new Vstore();

export { vstore as default, webAdaper, wxAdapter, aliAdapter };
