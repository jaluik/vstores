import Vstore from './core/Vstore';
import webAdapter from './adapter/web';
import wxAdapter from './adapter/wx';
import aliAdapter from './adapter/ali';

const vstore = new Vstore({
  errorHandler: console.error,
});

export { vstore as default, webAdapter, wxAdapter, aliAdapter };
