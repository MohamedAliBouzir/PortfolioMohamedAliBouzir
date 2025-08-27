import { IServicesInterface } from "@/interfaces/services-interface";
import consultingIcon from "@/assets/images/jpg/consulting.png";
import webDevelopmentIcon from "@/assets/images/jpg/webAppImage.png";
import mobileDevelopmentIcon from "@/assets/images/jpg/mobileAppImage.png";
import dataAnalyticsIcon from "@/assets/images/jpg/DataImage.png";
import customFrontImage from "@/assets/images/jpg/customFrontImage.png";
import devOpsIcon from "@/assets/images/jpg/deployment.png";
export const servicesData: IServicesInterface[] = [
  {
    index: 1,
    Icon: customFrontImage,
    Title: "Custom Front-End Development",
    Description:
      "Building responsive and interactive user interfaces using modern frameworks and libraries.",
  },
  {
    index: 2,
    Icon: webDevelopmentIcon,
    Title: "Full-Stack Web Applications",
    Description:
      "Developing robust web applications with both front-end and back-end technologies.",
  },
  {
    index: 3,
    Icon: mobileDevelopmentIcon,
    Title: "Mobile App Development",
    Description:
      "Creating cross-platform mobile applications for iOS and Android devices.",
  },
  {
    index: 4,
    Icon: dataAnalyticsIcon,
    Title: "Data & Analytics Services",
    Description:
      "Providing data analysis and visualization services to help businesses make informed decisions.",
  },
  {
    index: 5,
    Icon: consultingIcon,
    Title: "Custom Solutions & Consulting",
    Description:
      "Offering tailored solutions and expert consulting to meet specific business needs.",
  },
  {
    index: 6,
    Icon: devOpsIcon,
    Title: "DevOps & Deployment",
    Description:
      "Implementing DevOps practices for continuous integration and deployment of applications.",
  },
];
