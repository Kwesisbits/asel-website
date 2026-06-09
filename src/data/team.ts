export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  linkedin: string;
  photo?: string;
  /** CSS object-position value for the circular crop, e.g. "top", "center", "50% 20%" */
  photoPosition?: string;
}

export const team: TeamMember[] = [
  {
    id: "emmanuella-brown",
    name: "Emmanuella Brown",
    title: "Founder & CEO",
    bio: "Emmanuella Brown is a renewable energy and sustainability professional passionate about advancing clean energy access, climate action, and women empowerment in Africa. She has worked to support energy projects with the World Bank and currently works with the ECOWAS Regional Electricity Regulatory Authority with experience in sustainable energy systems, and energy policy. As part of ASEL Africa she is committed to promoting renewable energy education, innovation, and sustainable development through training, consulting, and community impact initiatives.",
    linkedin: "https://www.linkedin.com/in/emmanuella-brown-1155ab1bb",
    photo: "/emmanuella-brown.jpg.png",
    photoPosition: "top",
  },
  {
    id: "prince-oduro",
    name: "Prince Oduro",
    title: "Technology & Innovation Operations Lead",
    bio: "Prince Oduro is the Technology & Innovation Operations Lead at ASEL, driving the organization's digital systems, innovation infrastructure, and research-focused technology initiatives. He leads the development of ASEL's learning and project management platforms, supports renewable energy R&D prototypes, and coordinates technology partnerships with universities and innovation hubs to strengthen practical learning and sustainable energy innovation across Africa.",
    linkedin: "https://www.linkedin.com/in/prince-oduro-34b401268",
    photo: "/prince-oduro.jpg.png",
    photoPosition: "top",
  },
  {
    id: "bernice-adom-boateng",
    name: "Bernice Adom Boateng",
    title: "Partnerships & Finance Lead",
    bio: "Bernice Adom Boateng is the Partnerships & Finance Lead at ASEL Africa, where she supports strategic partnerships, financial coordination, and organizational operations to advance sustainable energy and capacity-building initiatives across Africa. She also works as a Finance & Administrative Officer at Earthworm Foundation, bringing experience in finance, administration, and operational management to support impactful development and sustainability programs.",
    linkedin: "https://www.linkedin.com/in/linkbernice",
    photo: "/bernice-adom-boateng.jpg.png",
  },
  {
    id: "vanessa-korkor-mensah",
    name: "Vanessa Korkor Mensah",
    title: "Data, Impact & Communication Lead",
    bio: "Vanessa Korkor Mensah is the Data, Impact and Communication Lead at ASEL Africa where she oversees data systems, impact measurement, and strategic communication for programs and partners. She is also a Data Analyst at EVC African Ltd with expertise in monitoring and evaluation, reporting, and data-driven decision-making. She has also supported social media visibility and digital communications for Adele, strengthening online engagement and audience reach.",
    linkedin: "https://www.linkedin.com/in/vanessa-korkor-mensah",
    photo: "/vanessa-korkor-mensah.jpg.png",
  },
];
