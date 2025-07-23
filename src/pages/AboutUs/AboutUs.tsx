import MissionStatement from "../../components/aboutUsPageAllComponent/MissionStatement";
import TeamSection from "../../components/aboutUsPageAllComponent/TeamSection";
import HistoryAndMilestones from "../../components/aboutUsPageAllComponent/HistoryAndMilestones";
import ContactInformation from "../../components/aboutUsPageAllComponent/ContactInformation";

const AboutUs = () => {
  return (
    <div>
      <MissionStatement></MissionStatement>
      <TeamSection></TeamSection>
      <HistoryAndMilestones></HistoryAndMilestones>
      <ContactInformation></ContactInformation>
    </div>
  );
};

export default AboutUs;
