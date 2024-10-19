import phoneImg from "../../assets/gif/phone-call.png";
import emailImg from "../../assets/gif/mail.png";
import locationImg from "../../assets/gif/location.png";

const contactDetails = [
  {
    heading: "Contact :",
    icon: phoneImg,
    info: "9238176156",
    link: "tel:+919238176156", // Telephone link
  },
  {
    heading: "Location :",
    icon: locationImg,
    info:
      "2nd floor, Jyoti Talkies Zone-I, Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462023",
    link: "https://maps.app.goo.gl/fAcQ4mFsxkzvXXe28", 
  },
  {
    heading: "Email :",
    icon: emailImg,
    info: "support@thelawtales.com",
    link: "mailto:support@thelawtales.com", // Email link
  },
];

export default contactDetails;
