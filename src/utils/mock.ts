// import AxiosMockAdapter from 'axios-mock-adapter';
// import axios from './axios';

// const axiosMock = new AxiosMockAdapter(axios, { delayResponse: 0 });

// export default axiosMock;

import AxiosMockAdapter from 'axios-mock-adapter';
import { axiosMockup } from './axios';

const axiosMock = new AxiosMockAdapter(axiosMockup, { delayResponse: 0 });

export default axiosMock;
