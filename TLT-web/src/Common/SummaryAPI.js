// const backendDomain = "https://sea-lion-app-uytpg.ondigitalocean.app";
const backendDomain = 'https://sea-lion-app-uytpg.ondigitalocean.app';

const SummaryApi = {
  fastTrackForm: {
    url: `${backendDomain}/api/fastTrackForm`,
    method: 'post',
  },
  fastTrackFormpay: {
    url: `${backendDomain}/api/FastTrackpaystatus`,
    method: 'post',
  },
  empowermentForm: {
    url: `${backendDomain}/api/empowermentForm`,
    method: 'post',
  },
  empowermentFormPay: {
    url: `${backendDomain}/api/paymentstatus`,
    method: 'post',
  },
  jetForm: {
    url: `${backendDomain}/api/jetForm`,
    method: 'post',
  },
  personalinfo: {
    url: `${backendDomain}/api/personalinfo`,
    method: 'post',
  },
  contactForm: {
    url: `${backendDomain}/api/contactForm`,
    method: 'get',
  },
  mpcjForm: {
    url: `${backendDomain}/api/mpcjForm`,
    method: 'post',
  },
  createTpmFormDetails: {
    url: `${backendDomain}/api/createTpmFormDetails`,
    method: 'post',
  },
  prepaper: {
    url: `${backendDomain}/api/prepaper`,
    method: 'post',
  },
  pyPaper: {
    url: `${backendDomain}/api/pyPaper-info`,
    method: 'get',
  },
  saveGuardianDetailsPost: {
    url: `${backendDomain}/api/saveGuardianDetails`,
    method: 'post',
  },
  saveGuardianDetailsGet: {
    url: `${backendDomain}/api/saveGuardianDetails`,
    method: 'get',
  },
  contactDoc: {
    url: `${backendDomain}/api/contactDoc`,
    method: 'post',
  },
  saveContactDocumentDetailsGet: {
    url: `${backendDomain}/api/saveContactDocumentDetails`,
    method: 'get',
  },
  EducationalDetailsPost: {
    url: `${backendDomain}/api/EducationalDetails`,
    method: 'post',
  },
  EducationalDetailsGet: {
    url: `${backendDomain}/api/EducationalDetails`,
    method: 'get',
  },
  consentdetails: {
    url: `${backendDomain}/api/consentdetails`,
    method: 'post',
  },
  ConsentDetails: {
    url: `${backendDomain}/api/ConsentDetails`,
    method: 'get',
  },
  signUp: {
    url: `${backendDomain}/api/signUp`,
    method: 'post',
  },
  signIn: {
    url: `${backendDomain}/api/signIn`,
    method: 'post',
  },
  current_user: {
    url: `${backendDomain}/api/userDetails`,
    method: 'get',
  },
  logout: {
    url: `${backendDomain}/api/userLogout`,
    method: 'get',
  },
  registerUser: {
    url: `${backendDomain}/api/registerUser`,
    method: 'get',
  },
  AllmarqueeGet: {
    url: `${backendDomain}/api/marquee-data/66b751ebc085bfafb981a879`,
    method: 'get',
  },
  PyPaperPDF: {
    url: `${backendDomain}/api/getpydata`,
    method: 'get',
  },
  createPyPapersDetail: {
    url: `${backendDomain}/api/createPyPapersDetail`,
    method: 'post',
  },
  createUnpaidModel: {
    url: `${backendDomain}/api/createUnpaidModel`,
    method: 'post',
  },
  createSyllabusModel: {
    url: `${backendDomain}/api/createSyllabusModel`,
    method: 'post',
  },

  getUnpaid: {
    url: `${backendDomain}/api/getUnpaidUpload`,
    method: 'get',
  },
  UnpaidPDF: {
    url: `${backendDomain}/api/unpaidUpdate`,
    method: 'put',
  },
  UnpaidPDF: {
    url: `${backendDomain}/api/unpaidDelete`,
    method: 'delete',
  },
  createMPCJFormDetails: {
    url: `${backendDomain}/api/createMPCJFormDetails`,
    method: 'post',
  },
  getMPCJFormDetails: {
    url: `${backendDomain}/api/getMPCJFormDetails`,
    method: 'get',
  },
  updateMPCJFormDetails: {
    url: `${backendDomain}/api/updateMPCJFormDetails/:id`,
    method: 'put',
  },
  deleteMPCJFormDetails: {
    url: `${backendDomain}/api/deleteMPCJFormDetails/:id`,
    method: 'delete',
  },
  Syllabus: {
    url: `${backendDomain}/api/getSyllabusUpload`,
    method: 'get',
  },
  Syllabuspdf: {
    baseUrl: `${backendDomain}/api/SyllabusUploadFiles`, // Base URL for PDF files
    method: 'GET',
  },
  Notification: {
    url: `${backendDomain}/api/getnotifies`,
    method: 'get',
  },
  Marquee: {
    url: `${backendDomain}/api/marquee`,
    method: 'get',
  },
  getPyPaperPDFupload: {
    url: `${backendDomain}/api/getPyPaperPDFupload`,
    method: 'get',
  },
  JetForm: {
    url: `${backendDomain}/api/createJetForm`,
    method: 'post',
  },
  createMpcjProduct: {
    url: `${backendDomain}/api/createMpcjProduct`,
    method: 'post',
  },
  getAllMpcjProducts: {
    url: `${backendDomain}/api/getAllMpcjProducts`,
    method: 'get',
  },
  deleteMpcjProduct: {
    url: `${backendDomain}/api/deleteMpcjProduct/:id`,
    method: 'delete',
  },
  updateMpcjProduct: {
    url: `${backendDomain}/api/updateMpcjProduct/:id`,
    method: 'put',
  },
  createMPCJFormDetails: {
    url: `${backendDomain}/api/createMPCJFormDetails`,
    method: 'post',
  },
  createPyPapersDetail: {
    url: `${backendDomain}/api/createPyPapersDetail`,
    method: 'post',
  },
  createPyPapersDetail: {
    url: `${backendDomain}/api/createPyPapersDetail`,
    method: 'post',
  },
  quiz: {
    url: `${backendDomain}/api/quiz`,
    method: 'get',
  },
  quizUser: {
    url: `${backendDomain}/api/quizUser`,
    method: 'get',
  },
  CreatequizUser: {
    url: `${backendDomain}/api/quizUser`,
    method: 'post',
  },
};

export default SummaryApi;
