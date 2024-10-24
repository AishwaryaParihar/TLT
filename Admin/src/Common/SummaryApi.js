const backendDomain = 'https://sea-lion-app-uytpg.ondigitalocean.app';
// const backendDomain = 'https://sea-lion-app-uytpg.ondigitalocean.app';
// const backendDomain = 'http://localhost:8080';

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signUp`,
    method: 'post',
  },
  signIn: {
    url: `${backendDomain}/api/signIn`,
    method: 'post',
  },
  AllUser: {
    url: `${backendDomain}/api/registerUser`,
    method: 'get',
  },
  ALlpyPapers: {
    url: `${backendDomain}/api/all-papers`,
    method: 'get',
  },
  AllmpcjData: {
    url: `${backendDomain}/api/mpcj-data`,
    method: 'get',
  },
  AlltpmData: {
    url: `${backendDomain}/api/tmp-data`,
    method: 'get',
  },
  Allmarquee: {
    url: `${backendDomain}/api/marquee`,
    method: 'post',
  },
  Getmarquee: {
    url: `${backendDomain}/api/marquee`,
    method: 'get',
  },
  updateMarquee: {
    url: `${backendDomain}/api/marquee/:id`,
    method: 'put',
  },
  DeleteMarquee: {
    url: `${backendDomain}/api/marquee/:id`,
    method: 'delete',
  },
  PyPaperPDF: {
    url: `${backendDomain}/api/PyPaperPDF`,
    method: 'post',
  },
  GetPyPaperPDF: {
    url: `${backendDomain}/api/getpydata`,
    method: 'get',
  },
  PyPaperPDFupload: {
    url: `${backendDomain}/api/pypaperdataupdate/:id`,
    method: 'put',
  },
  PyPaperPDFDelete: {
    url: `${backendDomain}/api/pypaperdataDelete/:id`,
    method: 'delete',
  },
  UnpaidPDF: {
    url: `${backendDomain}/api/upload-files`,
    method: 'post',
  },
  UnpaidPDF: {
    url: `${backendDomain}/api/get-files`,
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

  notifies: {
    url: `${backendDomain}/api/notifies`,
    method: 'post',
  },
  Getnotifiess: {
    url: `${backendDomain}/api/getnotifies`,
    method: 'get',
  },
  notifiesUpdate: {
    url: `${backendDomain}/api/Notificationupdate/:id`,
    method: 'put',
  },
  notifiesDelete: {
    url: `${backendDomain}/api/Notificationdelete/:id`,
    method: 'delete',
  },
  EmpowermentAdmin: {
    url: `${backendDomain}/api/getempowermentForm`,
    method: 'get',
  },
  EmpowermentAdminUpdate: {
    url: `${backendDomain}/api/Eupdate/:id`,
    method: 'put',
  },
  EmpowermentAdminDelete: {
    url: `${backendDomain}/api/Edelete/:id`,
    method: 'delete',
  },
  empowermentFormPay: {
    url: `${backendDomain}/api/paymentstatus`,
    method: 'post',
  },
  FastTractFormAdmin: {
    url: `${backendDomain}/api/getFastTrackForm`,
    method: 'get',
  },
  FastTractFormStudent: {
    url: `${backendDomain}/api/getFastTrackForm/:id`,
    method: 'get',
  },
  fastTrackFormpay: {
    url: `${backendDomain}/api/FastTrackpaystatus`,
    method: 'post',
  },
  FastTractFormAdminUpdate: {
    url: `${backendDomain}/api/updateFastTrackForm/:id`,
    method: 'put',
  },
  FastTractFormAdminDelete: {
    url: `${backendDomain}/api/deleteFastTrackForm/:id`,
    method: 'delete',
  },
  Syllabus: {
    url: `${backendDomain}/api/getSyllabusUpload`,
    method: 'get',
  },
  SyllabusUpdate: {
    url: `${backendDomain}/api/updateSyllabusById/:id`,
    method: 'put',
  },
  SyllabusDelete: {
    url: `${backendDomain}/api/deleteSyllabusById/:id`,
    method: 'delete',
  },
  Syllabuspdf: {
    url: `${backendDomain}`,
    method: 'GET',
    baseUrl: 'http://localhost:5054', // Define your base URL here
  },
  SyllabusdataUploads: {
    url: `${backendDomain}/api/SyllabusUpload`,
    method: 'POST',
  },
  GetPyPaperPDFupload: {
    url: `${backendDomain}/api/getPyPaperPDFupload`,
    method: 'get',
  },
  PyPaperPDFUploads: {
    url: `${backendDomain}/api/createPyPaperPDFupload`,
    method: 'POST',
  },
  PyPaperPDFUpdate: {
    url: `${backendDomain}/api/updatePyPaperPDFupload/:id`,
    method: 'put',
  },
  PyPaperPDFDelete: {
    url: `${backendDomain}/api/deletePyPaperPDFupload/:id`,
    method: 'delete',
  },
  QuizPut: {
    url: `${backendDomain}/api/quiz`,
    method: 'put',
  },
  QuizGet: {
    url: `${backendDomain}/api/quiz`,
    method: 'get',
  },
  QuizDetailsGet: {
    url: `${backendDomain}/api/quizUser`,
    method: 'get',
  },
  TpmData: {
    url: `${backendDomain}/api/getTpmFormDetails`,
    method: 'get',
  },
  TpmDataUpdate: {
    url: `${backendDomain}/api/updateTpmFormDetails/:id`,
    method: 'put',
  },
  TpmDataDelete: {
    url: `${backendDomain}/api/deleteTpmFormDetails/:id`,
    method: 'delete',
  },
  JetFormGet: {
    url: `${backendDomain}/api/getJetForms`,
    method: 'get',
  },
  createMpcjProduct: {
    url: `${backendDomain}/api/createMpcjProduct`,
    method: 'post',
  },
  JetFormDelete: {
    url: `${backendDomain}/api/deleteJetForm/:id`,
    method: 'delete',
  },
  JetFormUpdate: {
    url: `${backendDomain}/api/updateJetForm/:id`,
    method: 'put',
  },
  GetAllPyPapers: {
    url: `${backendDomain}/api/getAllPyPapers`,
    method: 'get',
  },
  DeletePyPapersDetail: {
    url: `${backendDomain}/api/deletePyPapersDetail/:id`,
    method: 'delete',
  },
  UpdatePyPapersDetail: {
    url: `${backendDomain}/api/updatePyPapersDetail/:id`,
    method: 'put',
  },
  //unpaid model

  GetAllUnpaidModel: {
    url: `${backendDomain}/api/getAllUnpaidModel`,
    method: 'get',
  },
  DeleteUnpaidModel: {
    url: `${backendDomain}/api/deleteUnpaidModel/:id`,
    method: 'delete',
  },
  UpdateUnpaidModel: {
    url: `${backendDomain}/api/updateUnpaidModel/:id`,
    method: 'put',
  },

  //syllabus model

  GetAllSyllabusModel: {
    url: `${backendDomain}/api/getAllSyllabusModel`,
    method: 'get',
  },
  DeleteSyllabusModel: {
    url: `${backendDomain}/api/deleteSyllabusModel/:id`,
    method: 'delete',
  },
  UpdateSyllabusModel: {
    url: `${backendDomain}/api/updateSyllabusModel/:id`,
    method: 'put',
  },
  ////

  createPyPapersDetail: {
    url: `${backendDomain}/api/createPyPapersDetail`,
    method: 'post',
  },
  // mpcj
  GetMPCJFormDetails: {
    url: '${backendDomain}/api/getMPCJFormDetails',
    method: 'get',
  },

  // Get dashboard count

  GetTotalEmpowermentForms: {
    url: `${backendDomain}/api/getTotalEmpowermentForms`,
    method: 'get',
  },
  GetTotalFastTrackForms: {
    url: `${backendDomain}/api/getTotalFastTrackForms`,
    method: 'get',
  },
  GetTotalJetForms: {
    url: `${backendDomain}/api/getTotalJetForms`,
    method: 'get',
  },
  GetTotalMPCJform: {
    url: `${backendDomain}/api/getTotalMPCJform`,
    method: 'get',
  },
  GetTotalPyPapersCount: {
    url: `${backendDomain}/api/getTotalPyPapersCount`,
    method: 'get',
  },
  GetTotalTpmCount: {
    url: `${backendDomain}/api/getTotalTpmCount`,
    method: 'get',
  },
  createTpmFormDetails: {
    url: `${backendDomain}/api/createTpmFormDetails`,
    method: 'post',
  },
  getAllMpcjProducts: {
    url: `${backendDomain}/api/getAllMpcjProducts`,
    method: 'get',
  },
  editMpcjProduct: {
    url: `${backendDomain}/api/editMpcjProduct`, // Base URL
    method: 'put',
  },
  deleteMpcjProduct: {
    url: `${backendDomain}/api/deleteMpcjProduct`, // Base URL
    method: 'delete',
  },
  createMpcjProduct: {
    url: `${backendDomain}/api/createMpcjProduct`,
    method: 'post',
  },

  createEnquiryDetails: {
    url: `${backendDomain}/api/createEnquiryDetails`,
    method: 'post',
  },
  getEnquiryDetails: {
    url: `${backendDomain}/api/getEnquiryDetails`,
    method: 'get',
  },
  updateEnquiryDetails: {
    url: `${backendDomain}/api/updateEnquiryDetails/:id`,
    method: 'put',
  },
  deleteEnquiryDetails: {
    url: `${backendDomain}/api/deleteEnquiryDetails/:id`,
    method: 'delete',
  },
  getTotalEnquiryCount: {
    url: `${backendDomain}/api/getTotalEnquiryCount`,
    method: 'get',
  },

  // mpcj
  GetMPCJFormDetails: {
    url: `${backendDomain}/api/getMPCJFormDetails`,
    method: 'get',
  },
  DeleteMPCJFormDetails: {
    url: `${backendDomain}/api/deleteMPCJFormDetails/:id`,
    method: 'delete',
  },
  UpdateMPCJFormDetails: {
    url: `${backendDomain}/api/updateMPCJFormDetails/:id`,
    method: 'put',
  },

  // upaid
  GetUnpaidUpload: {
    url: `${backendDomain}/api/getUnpaidUpload`,
    method: 'get',
  },
  UnpaidUpload: {
    url: `${backendDomain}/api/UnpaidUpload`,
    method: 'post',
  },
  UpdateUnpaidById: {
    url: `${backendDomain}/api/updateUnpaidById/:id`,
    method: 'put',
  },
  DeleteUnpaidById: {
    url: `${backendDomain}/api/deleteUnpaidById/:id`,
    method: 'delete',
  },
  //
  GetleaderBoard: {
    url: `${backendDomain}/api/getstudentsexcel`,
    method: 'get',
  },
  postleaderBoard: {
    url: `${backendDomain}/api/studentsexcel`,
    method: 'post',
  },

  // student list
  getStudents: {
    url: `${backendDomain}/api/getStudents`,
    method: 'post',
  },
  // getStudents: {
  //   url: `${backendDomain}/api/getStudents`,
  //   method: 'post',
  // },
  updateStudent: {
    url: `${backendDomain}/api/updateStudent/:id`,
    method: 'put',
  },
  deleteStudentdata: {
    url: `${backendDomain}/api/deleteStudent/:id`,
    method: 'delete',
  },

  getStudentList: {
    url: `${backendDomain}/api/getStudents`,
    method: 'get',
  },

  //Subadmin controllers
  signUp: {
    url: `${backendDomain}/api/signUp`,
    method: 'post',
  },
  signIn: {
    url: `${backendDomain}/api/signIn`,
    method: 'post',
  },
};
export default SummaryApi;
