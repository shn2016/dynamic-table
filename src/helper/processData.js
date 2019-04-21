import processTrades from './processTrades';
import processWithdraws from './processWithdraws';

export default (type, data) => ((type === 'trades') ? processTrades(data) : processWithdraws(data));
