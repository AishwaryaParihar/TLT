const backendDomain = 'https://sea-lion-app-uytpg.ondigitalocean.app';
// const backendDomain = "https://tlt-project-6ivu.onrender.com";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/createStudent`,
    method: 'post',
  },
  logIn: {
    url: `${backendDomain}/api/login`,
    method: 'post',
  },
  GetleaderBoard: {
    url: `${backendDomain}/api/getstudentsexcel`,
    method: 'get',
  },
};

export default SummaryApi;
